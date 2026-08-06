---
title: Introducing the UC Delta API
description: The UC Delta API is a versioned, intent-based, atomic REST surface for the Delta ecosystem, shipped in open source Unity Catalog 0.5 — run it locally today with Spark and DuckDB.
thumbnail: ./thumbnail.png
author:
  - robert-pack
publishedAt: 2026-07-03
---

**TL;DR**

- The UC Delta API is a **versioned, intent-based, atomic** REST surface for the Delta
  ecosystem, shipped in open source [Unity Catalog](https://github.com/unitycatalog/unitycatalog) 0.5.
- It's **discoverable**: the first call, `GET /delta/v1/config`, negotiates the protocol
  version and platform supported and required table features.
- Simple to integrate. The wire format is **native Delta** — Delta's own schema,
  protocol, and column metadata travel over the wire.
- You can **run all of it locally today** against OSS UC 0.5 — with Spark and DuckDB support
  out of the box. More to follow.

## Introducing the UC Delta API

While treating the files in storage as the canonical source of a Delta table's state
has served us well for many years, the data landscape is evolving and tradeoffs made
in the early days may no longer hold today. It comes as no surprise to anyone if I
tell you that the role of catalogs has increased materially over the
past few years. Scalable governance, multi-statement or multi-table transactions,
cross-format and cross-engine support - are all features the community craves
but that are hard to realize using only the file system.

A while ago - much like other table formats - Delta embraced catalogs as a first-class
citizen via the [managedTable](https://github.com/delta-io/delta/blob/v4.3.1/PROTOCOL.md#catalog-managed-tables)
feature as groundwork for many features to come. Today we'll talk about the API side of this via the
UC Delta API released in version 0.5 of the open source [Unity Catalog](https://github.com/unitycatalog/unitycatalog).

So let's dive right in.

## Getting started

First and foremost, we need a local OSS UC 0.5 server, so let's start one.
Via a `server.properties` file we configure managed tables and
negotiate the managed storage location.

```properties title="server.properties"
server.env=dev
# Disable authorization for local testing (any token, including none, is accepted).
server.authorization=disable
# Enable managed tables so the Delta API can allocate + commit them locally.
server.managed-table.enabled=true
storage-root.tables=file:///tmp/uc-data
```

:::warning
Using local storage for managed locations (`file:///tmp/uc-data/...`)
requires Docker and the host to resolve paths to the same location.
:::

```bash
mkdir -p /tmp/uc-data
docker run -d --name uc \
  -p 8080:8080 \
  -v /tmp/uc-data:/tmp/uc-data \
  -v "$PWD/server.properties:/home/unitycatalog/etc/conf/server.properties:ro" \
  unitycatalog/unitycatalog:v0.5.0
```

With that running on `:8080`, we can get right into the fun part.

## How to read and write data via the UC Delta API?

The full end-to-end flow for creating, writing to, and reading
a managed table via `pyspark` is largely just following what we
have been doing all along, with a few minor tweaks.

:::::journey
::::step[Configure Spark with Delta & Unity Catalog]
Configure a `SparkSession` with the UC + Delta packages and point the catalog at
the local server. This is the only setup step; the rest is plain SQL.

```python title="read_write_delta_spark.py"
import os

from pyspark.sql import SparkSession

uc_url = os.environ.get("UC_URL", "http://localhost:8080").rstrip("/")
catalog = os.environ.get("UC_CATALOG", "unity")

UC_SPARK = "io.unitycatalog:unitycatalog-spark_4.1_2.13:0.5.0"
DELTA_SPARK = "io.delta:delta-spark_4.1_2.13:4.3.0"
# Just in case we are behind a proxy.
repositories = os.environ.get("MAVEN_REPO", "")

spark = (
    SparkSession.builder.appName("uc-delta-api-local")
    .config("spark.jars.packages", f"{UC_SPARK},{DELTA_SPARK}")
    .config("spark.jars.repositories", repositories)
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config(
        "spark.sql.catalog.spark_catalog",
        "org.apache.spark.sql.delta.catalog.DeltaCatalog",
    )
    .config(f"spark.sql.catalog.{catalog}", "io.unitycatalog.spark.UCSingleCatalog")
    .config(f"spark.sql.catalog.{catalog}.uri", uc_url)
    # Local OSS UC runs with authorization disabled, so any token works; a hosted
    # UC would negotiate OAuth (see the storage post for that builder).
    .config(f"spark.sql.catalog.{catalog}.token", os.environ.get("UC_TOKEN", ""))
    .config("spark.sql.defaultCatalog", catalog)
    .getOrCreate()
)
spark.sparkContext.setLogLevel("WARN")
```

::::
::::step[Create the managed table and write rows]

```python title="read_write_delta_spark.py"
# UC managed tables require the `catalogManaged` table feature
spark.sql(
    f"CREATE TABLE IF NOT EXISTS {catalog}.default.events (id BIGINT, name STRING) "
    f"USING DELTA TBLPROPERTIES ('delta.feature.catalogManaged' = 'supported')"
)
spark.sql(f"INSERT INTO {catalog}.default.events VALUES (1, 'alpha'), (2, 'beta')")
```

:::info
Managed tables **require** `delta.feature.catalogManaged = 'supported'`
:::

::::
::::step[Query your data]

```python title="read_write_delta_spark.py"
spark.sql(f"SELECT * FROM {catalog}.default.events ORDER BY id").show()

spark.stop()
```

```
+---+-----+
| id| name|
+---+-----+
|  1|alpha|
|  2| beta|
+---+-----+
```

::::
:::::

## UC Delta API in detail

As we see, this is not much more involved than writing data to any other
location, but under the hood quite a few things happen to make this
robust, secure, and future-proof.

### Engine <> catalog handshake

If there is one thing we learned from open table formats, it is that
we should always design for a clear evolution path. As such, before
an engine starts to send requests to the catalog, they negotiate
mutual compatibility via something like:

```bash
curl -sS --fail-with-body \
  "$UC_URL/api/2.1/unity-catalog/delta/v1/config?catalog=unity&protocol-versions=1.0"
```

The server answers with the endpoint list and the protocol version it negotiated
between the client and server supported versions, note how we specified the
`protocol-version` in the request.

```json
{
	"endpoints": [
		"POST /v1/catalogs/{catalog}/schemas/{schema}/staging-tables",
		"POST /v1/catalogs/{catalog}/schemas/{schema}/tables",
		"GET  /v1/catalogs/{catalog}/schemas/{schema}/tables/{table}",
		"POST /v1/catalogs/{catalog}/schemas/{schema}/tables/{table}",
		"GET  /v1/catalogs/{catalog}/schemas/{schema}/tables/{table}/credentials",
		"..."
	],
	"protocol-version": "1.0"
}
```

UC Delta API being an open specification, there is of course some meaning attached
to the protocol version. The official [protocol specification][ManagedTablesSpec]
defines how these endpoints are to be used to read and write data.

### The managed table protocol

The interactive diagram below explains the full end to end flow of creating
a table and writing data into a table via the UC Delta API. Expand it and
click through the sequence to get the full picture.

::likec4{view=ucDeltaApi_managedTableFlow}

Rather than reiterating the full sequence piece by piece, we'll focus on
two moments in that sequence which highlight some Delta specifics in the specification.

### Delta table features in the UC Delta API

Creating a new table entails staging that table first (step 2). The response
to that request allows the catalog to communicate expectations and suggestions
in terms of [table features](https://github.com/delta-io/delta/blob/v4.3.1/PROTOCOL.md#table-features).

```json
{
	"required-protocol": {
		"min-reader-version": 3,
		"min-writer-version": 7,
		"reader-features": ["catalogManaged", "v2Checkpoint", "deletionVectors"],
		"writer-features": [
			"catalogManaged",
			"v2Checkpoint",
			"deletionVectors",
			"inCommitTimestamp"
		]
	},
	"suggested-protocol": {
		"reader-features": ["columnMapping"],
		"writer-features": ["columnMapping", "domainMetadata", "rowTracking"]
	}
}
```

In this protocol, the catalog has some freedom to decide which features it requires
or suggests. Specific choices may depend on the platform operator. If for instance
your platform has some stateful table compaction / optimization running it may
decide to promote `domainMetadata` to a required feature to store that state
alongside the table data.

Not shown above, but the engine also receives a vended credential to write
this data, so access to storage stays scoped and short-lived rather than
handing out standing credentials.

## Committing to a table

Any commit to a table goes through a single endpoint: `POST …/tables/{table}`. The body
is an intent list (`updates`) guarded by preconditions (`requirements`). The server
checks the guard and applies the intents atomically. Here is a real commit body,
captured from Delta-Spark's traffic during an `INSERT`:

```json
{
	"requirements": [
		{
			"type": "assert-table-uuid",
			"uuid": "1f47e3b8-7fb8-413c-9d9d-20f2ab75b908"
		}
	],
	"updates": [
		{
			"action": "add-commit",
			"commit": {
				"version": 1,
				"file-name": "00000000000000000001.63e70f6f-....json",
				"file-size": 1773
			}
		}
	]
}
```

The client writes the Delta commit file first, then this RPC ratifies it — Delta's
client-writes-then-catalog-ratifies flow, guarded and validated on the server.

## Use DuckDB to read a managed table

We all love Apache Spark, but just in case you find yourself
wanting to use a different engine sometimes, here is how to
read that same data using DuckDB.

:::::journey
::::step[Install the Delta + Unity Catalog extensions]

```python title="read_delta_duckdb.py"
import os

import duckdb

uc_url = os.environ.get("UC_URL", "http://localhost:8080").rstrip("/")
catalog = os.environ.get("UC_CATALOG", "unity")

con = duckdb.connect()

con.execute("INSTALL delta")
con.execute("LOAD delta")
# Switch to a regular install once the updated extension is released.
con.execute("FORCE INSTALL unity_catalog FROM core_nightly")
con.execute("LOAD unity_catalog")
```

::::
::::step[Point DuckDB at the UC catalog]

```python title="read_delta_duckdb.py"
con.execute(
    """
    CREATE SECRET (
        TYPE unity_catalog,
        TOKEN 'not-used',
        ENDPOINT $endpoint
    )
    """,
    {"endpoint": uc_url},
)

# ATTACH the UC catalog; DEFAULT_SCHEMA lets us read `events` unqualified below.
con.execute(
    f"ATTACH '{catalog}' AS {catalog} (TYPE unity_catalog, DEFAULT_SCHEMA 'default')"
)
```

::::
::::step[Read the data]

```python title="read_delta_duckdb.py"
con.sql("SELECT * FROM events ORDER BY id").fetchall()
```

with the expected result

```
[(1, 'alpha'), (2, 'beta')]
```

::::
:::::

## Wrap-up

The UC Delta API is a versioned, discoverable, Delta-native catalog surface: it
carries Delta's schema, protocol, and intent-based commits on the wire without
flattening any of them.

If you want to see it yourself: stand up OSS UC 0.5, run `GET /delta/v1/config`, and
walk the create → commit → load lifecycle. Point your own Delta engine at it.

If you are building a client, read the [openapi spec][delta-yaml] and the
[managed-tables protocol][ManagedTablesSpec].

[ManagedTablesSpec]: https://github.com/unitycatalog/unitycatalog/blob/v0.5.0/spec/protocols/ManagedTablesSpec.md
[delta-yaml]: https://github.com/unitycatalog/unitycatalog/blob/v0.5.0/api/delta.yaml
