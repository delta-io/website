---
title: Delta 4.2.0 Released
description: The Delta Kernel continues to drive the future of Delta Lake. With the 4.2 release, we've further eliminated engine inconsistencies and feature fragmentation by embedding the kernel where it matters most - right in the heart of our engine connectors. The kernel ensures strict transactional consistency and peak performance regardless of which engine reads or writes your data. Along that line, this release includes a brand new experimental Apache Flink connector built on the Delta Kernel aimed at providing expanded support for catalog-managed tables. This new connector supports reading and writing catalog-managed tables via Flink SQL...
thumbnail: ./thumbnail.png
author:
  - scott-haines
  - zheng-hu
  - alex-jiang
publishedAt: 2026-04-27
---

The Delta Lake 4 journey has marked a shift from the file system to the catalog. Each release has deepened support for
[catalog-managed tables](https://delta.io/blog/2026-02-02-delta-catalog-managed-tables/) and extended that design
philosophy across the Delta ecosystem. Delta Lake 4.2 advances on two fronts: Kernel expands outward with a new Flink
connector, streaming improvements, and broader data type support. Catalog-managed tables also mature with atomic
operations, schema evolution from SQL, and synchronous UniForm.

## Expanding the Delta Ecosystem with Delta Kernel

Delta Kernel has been the native and general Delta API for all engines to integrate with Delta Table, so that all
engines will have the same and consistent behavior and semantics while interacting with Delta tables.

### New kernel-based Apache Flink Connector

In 4.2, Delta-Kernel powers a brand-new Apache Flink connector with catalog-managed table support from day one. This
connector replaces the legacy Flink connector that was deprecated back in 4.0 alongside Delta Standalone.

The new connector supports transactionally consistent writes coordinated through the catalog, with exactly-once
semantics backed by a Flink Sink Writer and Committer. The connector is experimental today, and we'll be marching
toward stability in subsequent releases.

Let's see what the new connector looks like in practice. Here, FlinkSQL is creating a new unity catalog-managed table
with clickstream data and writing to it:

```sql
-- Create the clickstream landing table as a Unity Catalog managed table
CREATE TEMPORARY TABLE clickstream_raw (
  event_date STRING,
  event_type STRING,
  user_id STRING
) WITH (
  'connector' = 'delta',
  'table_name' = 'clickstream_raw',
  'unitycatalog.name' = 'prod',
  'unitycatalog.endpoint' = '<endpoint>',
  'unitycatalog.token' = '<token>',
  'partitions' = 'event_date',
  'uid' = 'clickstream-ingest'
);

-- Stream events into the table via Flink SQL
INSERT INTO clickstream_raw VALUES
  ('2026-04-20', 'click',    'user_1'),
  ('2026-04-20', 'purchase', 'user_2'),
  ('2026-04-22', 'click',    'user_4');
```

### Schema Evolution

Schema evolution also gets smoother. <span style="color:#d63384">INSERT INTO</span> now supports
a new <span style="color:#d63384">WITH SCHEMA EVOLUTION</span> SQL clause that enables automatic schema evolution
directly in the statement, adding new columns to the table schema as part of the commit. And a new table
property (<span style="color:#d63384">delta.stats.skipping.forceOptimizeStatsCollection</span>) forces per-file stats
collection during query planning, so data skipping works on newly-evolved columns immediately — no
<span style="color:#d63384">OPTIMIZE</span> required.

For example, let's say a clickstream has been missing <span style="color:#d63384">device_type</span> — the kind of
surface (mobile, web, tablet) an event was recorded from. The upstream producer has already started emitting the new
field into `prod.consumer.clickstream_raw`, and we want to fold it into the main table without a preliminary schema
change.

Previously, the only SQL option was to set a session-wide Spark config

```sql
-- Legacy: enables schema evolution for every write in the session
SET spark.databricks.delta.schema.autoMerge.enabled = true;

INSERT INTO prod.consumer.clickstream BY NAME
SELECT event_date, event_type, user_id, device_type
FROM prod.consumer.clickstream_raw
WHERE event_date = '2026-04-23';
```

but that actually introduces some unintended side effects, since session-wide configuration can lead to unintended schema
changes across multiple operations. This makes it harder to reason about which operations evolve the schema. In 4.2,
you can enable _schema evolution_ within just the statement that needs it:

```sql
-- New: schema evolution scoped to this single statement
INSERT INTO prod.consumer.clickstream WITH SCHEMA EVOLUTION
SELECT event_date, event_type, user_id, device_type
FROM prod.consumer.clickstream_raw
WHERE event_date = '2026-04-23';
```

<br/>
The end result is the addition of <span style="color:#d63384">device_type</span> to the table schema, as part of the commit, with 
the added comfort of knowing that the rest of the session configurations remain in their original forms. Existing rows 
will carry NULL for the new column, and every downstream reader continues to work without intervention. For SQL-first 
teams, this removes one of the last reasons to drop into a DataFrame notebook just to get a pipeline unstuck.

### Data Type Support

In Delta Kernel, we add support for <span style="color:#d63384">geospatial, collation, and variant types</span>:

- **Geospatial** support lands in Kernel for the first time: native reading and writing of geometry and geography columns, along with bounding-box data skipping to accelerate spatial queries at the protocol level.
- **Collation** — locale-aware and case-insensitive string comparison at the column level — gains protocol-level support in Kernel, bringing Kernel-powered connectors in line with Spark's existing capabilities.
- **Variant** lets you store semi-structured data as a single column and query into it at read time. Variant shredding — which decomposes frequently accessed fields into separate columns for faster reads while preserving the full Variant payload — graduates from preview. The Spark connector also gains full schema conversion for Variant columns.

To put this in context, here's how a clickstream pipeline can push event-specific properties into a single Variant
payload:

```sql
CREATE TABLE prod.consumer.clickstream_v2 (
  event_date DATE,
  event_type STRING,
  user_id STRING,
  device_type STRING,
  properties VARIANT
)
USING DELTA
PARTITIONED BY (event_date);

INSERT INTO prod.consumer.clickstream_v2 BY NAME
SELECT event_date, event_type, user_id, device_type,
       parse_json(raw_properties) AS properties
FROM prod.consumer.clickstream_raw WHERE event_date = '2026-04-24';
```

## Strengthening Catalog Managed Tables

Designing Delta Lake around the catalog creates a shared foundation between the two leading open table formats in the
Lakehouse ecosystem: Apache Iceberg and Delta Lake. A centralized catalog can vend credentials, enforce governance, and
connect multiple compute engines — bringing the two formats closer together with every release. 4.2 continues that
work, and catalog-managed tables continue to mature.

### Atomic RTAS and Dynamic Partition Overwrite

One of the most significant reliability upgrades in 4.2 is fully atomic execution of REPLACE TABLE AS SELECT (RTAS) and
Dynamic Partition Overwrite (DPO) on catalog-managed tables. Previously, these operations lacked strict atomicity in
certain managed environments, leaving the door open for partial failures to corrupt table state. In 4.2, both execute
as single atomic commits — if an operation fails midway, the table state remains completely untouched. Readers never
see a half-applied state.

### Synchronous UniForm

Catalog-managed tables also unlock a long-awaited improvement in Delta UniForm. Iceberg metadata generation moves from
asynchronous post-commit hooks to synchronous generation at commit time. The result is cleaner — Iceberg reads land
immediately, not after an async hook eventually fires.

Additionally, **support for the legacy Hive Metastore (HMS) in UniForm is deprecated**. HMS has no concept of
catalog-managed tables, and synchronous metadata generation requires a catalog that can broker commits.

## Conclusion

Delta 4.2 advances on two fronts. Kernel powers more of the ecosystem with a new Flink connector, broader streaming
support, and Variant, Collation, and geospatial capabilities. At the same time, catalog-managed tables get stronger —
atomic RTAS and DPO, synchronous UniForm, and schema evolution from SQL. Together, they move Delta Lake closer to a
future where the catalog centralizes and Kernel connects.

For the complete list of changes, fixes, and contributor acknowledgments, see the
[Delta 4.2.0 release notes on GitHub](https://github.com/delta-io/delta/releases/tag/v4.2.0).
