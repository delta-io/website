---
title: Strengthening Catalog-Managed Delta Tables with the Unity Catalog Delta APIs
description: Delta 4.3 builds on catalog-managed tables with Unity Catalog Delta API integration, streaming advances, and UniForm support—letting Spark, DuckDB, and Flink share the same tables.
thumbnail: ./delta_4.3-released.png
author:
  - alex-jiang
publishedAt: 2026-06-17
---

With [catalog-managed tables](https://delta.io/blog/2026-02-02-delta-catalog-managed-tables/) established as Delta's new foundation, 4.3 turns to what's built on top of it. Delta 4.3 integrates with the Unity Catalog Delta APIs, a new catalog integration layer that routes table operations through intent-based catalog APIs so the catalog can validate and apply every commit. Advancements in UniForm integration and streaming make catalog-managed tables the natural target for more workloads. The result is a more robust ecosystem, one where engines like Spark, DuckDB, and Flink can all operate on the same set of tables through the same catalog.

## Unity Catalog Delta APIs

Every operation on a catalog-managed table now flows through the Unity Catalog Delta APIs: table [loads](https://github.com/delta-io/delta/pull/6796), [CREATE and CTAS](https://github.com/delta-io/delta/pull/6826), [REPLACE, CREATE OR REPLACE, and RTAS](https://github.com/delta-io/delta/pull/6859), and [metadata-changing writes](https://github.com/delta-io/delta/pull/6840) such as DML schema evolution. Delta 4.2 makes commits catalog-coordinated while Delta 4.3 brings the rest of the operation surface under unified APIs.

As a result, the catalog can provide stronger guarantees. Server-side commit validation rejects malformed or conflicting commits before they corrupt table state, and server-advertised table features let an engine know what features a new table should support, as defined by the catalog. Moreover, intent-based metadata updates let engines declare property and domain metadata changes that the catalog validates and applies. Together, these checks give every engine that connects to the catalog the same well-defined behavior, including Spark and every Kernel-based connector that adopts the UC Delta APIs.

Here's what this looks like in practice. Launch Spark 4.1 with Delta 4.3 and the Unity Catalog Spark connector 0.5, and point a catalog at your UC endpoint:

```bash
$SPARK_HOME/bin/spark-sql
--packages io.delta:delta-spark_4.1_2.13:4.3.0,io.unitycatalog:unitycatalog-spark_4.1_2.13:0.5.0
--conf spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension
--conf spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog
--conf spark.sql.catalog.<catalog_name>=io.unitycatalog.spark.UCSingleCatalog
--conf spark.sql.catalog.<catalog_name>.uri=<uc_URL> #Note: no /api suffix needed
--conf spark.sql.catalog.<catalog_name>.token=<uc_token>
--conf spark.sql.defaultCatalog=<catalog_name>
```

From there, every operation routes through the catalog. We'll land a `clickstream` table here:

```sql
CREATE TABLE prod.consumer.clickstream (
  event_date  DATE,
  event_type  STRING,
  user_id     STRING
) USING DELTA CLUSTER BY (event_date);

INSERT INTO prod.consumer.clickstream VALUES
  ('2026-06-01', 'click',    'user_1'),
  ('2026-06-01', 'purchase', 'user_2');

ALTER TABLE prod.consumer.clickstream ADD COLUMNS (device_type STRING);
```

## Delta UniForm Improvements

UniForm keeps Apache Iceberg metadata in sync with Delta commits so Iceberg readers can query Delta tables without copying data. 4.3 advances UniForm on two fronts:

First, conversion is now atomic and incremental: [large commits convert to Iceberg metadata atomically within the Delta transaction](https://github.com/delta-io/delta/pull/6717), and [incremental conversion](https://github.com/delta-io/delta/pull/6834) regenerates only the changed log range instead of the full snapshot on every commit.

Second, [IcebergCompatV3 (experimental)](https://github.com/delta-io/delta/pull/6783) enables Delta tables that use deletion vectors (DVs) to also have UniForm enabled. With `delta.enableIcebergCompatV3=true`, DVs and UniForm coexist on the same table, and the new mode adds geometry/geography compatibility with the latest Iceberg writer protocol.

To expose a table to Iceberg readers without copying data, we can create it with IcebergCompatV3, so UniForm and Deletion Vectors are enabled together from the start:

```sql
-- Create a clickstream table with UniForm and Deletion Vectors together
CREATE TABLE prod.consumer.clickstream_v3 (
  event_date DATE,
  event_type STRING,
  user_id    STRING
)
USING DELTA
TBLPROPERTIES (
  'delta.enableIcebergCompatV3'          = 'true',
  'delta.universalFormat.enabledFormats' = 'iceberg',
  'delta.feature.catalogManaged'         = 'supported',
  'delta.enableDeletionVectors'          = 'true'
);
```

UniForm is now built against Iceberg-spark 1.11.0 and [supports both Spark 4.0 and Spark 4.1](https://github.com/delta-io/delta/pull/6858).

## Streaming and Change Data Feed (CDF)

Delta 4.3 brings Structured Streaming and Change Data Feed to catalog-managed Delta tables from Apache Spark. Spark streaming sources now support all standard read options, and catalog-driven batch CDC lets an external engine both stream from and replay changes on catalog-managed Delta tables.

As new events stream into `clickstream`, downstream consumers can replay what changed. [Batch CDC](https://github.com/delta-io/delta/pull/6794) lands as `SELECT … CHANGES FROM VERSION/TIMESTAMP`, with [deletion-vector awareness](https://github.com/delta-io/delta/pull/6886), gated behind `spark.databricks.delta.changelogV2.enabled`:

```sql
SET spark.databricks.delta.changelogV2.enabled = true;

-- Replay changes from a specific version
SELECT * FROM prod.consumer.clickstream CHANGES FROM VERSION 0;

-- Or from a point in time
SELECT * FROM prod.consumer.clickstream CHANGES FROM TIMESTAMP '2026-06-01 00:00:00';
```

Change Data Feed also extends to Delta Sharing. Once `clickstream` is shared with a partner, streaming queries on shared Delta-format tables can now [read the Change Data Feed](https://github.com/delta-io/delta/pull/6627) of a shared table and [run backfill-then-stop pipelines via `Trigger.AvailableNow`](https://github.com/delta-io/delta/pull/6549) (on top of the [delta-sharing-client 1.4.0 upgrade](https://github.com/delta-io/delta/pull/6740)).

## Conclusion

Delta 4.3 strengthens catalog-managed Delta tables across the stack. The UC Delta APIs bring every table operation under a single, catalog-validated commit path. Streaming and CDF now work on catalog-managed Delta tables from Apache Spark. UniForm's Iceberg conversion becomes atomic and incremental. Together these build directly on the [catalog-managed tables](https://delta.io/blog/2026-02-02-delta-catalog-managed-tables/) foundation, toward an ecosystem where engines like Spark, DuckDB, Flink, and any client integrated with Delta-Kernel can all operate on the same tables through the same catalog.

For the complete list of changes, fixes, and contributor acknowledgments, see the [Delta 4.3.0 release notes on GitHub](https://github.com/delta-io/delta/releases/tag/v4.3.0).
