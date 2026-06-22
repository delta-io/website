---
title: Delta 4.3 Release
description: Delta 4.3 builds on catalog-managed tables with Unity Catalog REST API integration, streaming advances, and UniForm support-letting Spark, DuckDB, and Flink share the same tables.
thumbnail: ./delta_4.3-released.png
author:
  - alex-jiang
publishedAt: 2026-06-17
---

With catalog-managed tables firmly established as Delta's new foundation, 4.3 turns to what's built on top of it. Delta 4.3 integrates with the Unity Catalog Delta REST APIs, a new catalog integration layer that routes table operations through intent-based catalog APIs so the catalog can validate and apply every commit. Advancements in streaming and UniForm integration make catalog-managed tables the natural target for more workloads. The result is a more robust ecosystem, one where engines like Spark, DuckDB, and Flink can all operate on the same set of tables through the same catalog.

## Delta REST Catalog

Every operation on a catalog-managed table now flows through the Unity Catalog Delta REST APIs: table [loads](https://github.com/delta-io/delta/pull/6796), [CREATE and CTAS](https://github.com/delta-io/delta/pull/6826), [REPLACE](https://github.com/delta-io/delta/pull/6859), [CREATE OR REPLACE](https://github.com/delta-io/delta/pull/6859), and [RTAS](https://github.com/delta-io/delta/pull/6859), and [metadata-changing writes](https://github.com/delta-io/delta/pull/6840) such as DML schema evolution and supported ALTER TABLE updates. Delta 4.2 makes commits catalog-coordinated while Delta 4.3 brings the rest of the operation surface under unified APIs.

As a result, the catalog can provide further guarantees. Server-side commit validation rejects malformed or conflicting commits before they corrupt table state. Server-advertised table features let an engine learn what a table supports from the catalog instead of probing the log. Intent-based metadata updates express schema changes as declarative intents the catalog validates and applies. Together, these give every engine that connects one well-defined behavior, including Spark and every Kernel-based connector that adopts the UC Delta REST APIs.

Here's what this looks like in practice. Launch Spark 4.1 with Delta 4.3 and the Unity Catalog Spark connector 0.5, and point a catalog at your UC endpoint:

```bash
$SPARK_HOME/bin/spark-sql
--packages io.delta:delta-spark_2.13:4.3.0,io.unitycatalog:unitycatalog-spark_4.1_2.13:0.5.0
--conf spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension
--conf spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog
--conf spark.sql.catalog.prod=io.unitycatalog.spark.UCSingleCatalog
--conf spark.sql.catalog.prod.uri=<uc_endpoint>
--conf spark.sql.catalog.prod.token=<uc_token>
--conf spark.sql.defaultCatalog=prod
```

From there, every operation routes through the catalog:

```sql
CREATE TABLE prod.consumer.clickstream (
  event_date  DATE,
  event_type  STRING,
  user_id     STRING
) USING DELTA CLUSTER BY (event_date);

INSERT INTO prod.consumer.clickstream VALUES
  ('2026-06-01', 'click', 'user-001'),
  ('2026-06-01', 'view',  'user-002');

ALTER TABLE prod.consumer.clickstream ADD COLUMNS (device_type STRING);
```

The integration is on by default in Spark; you can opt out per catalog by explicitly setting `deltaRestApi.enabled=false`.

## Delta UniForm Improvements

UniForm keeps Apache Iceberg metadata in sync with Delta commits so Iceberg readers can query Delta tables without copying data. 4.3 advances UniForm on two fronts:

First, conversion is now atomic and incremental: [large commits convert to Iceberg metadata atomically within the Delta transaction](https://github.com/delta-io/delta/pull/6717), and [incremental conversion](https://github.com/delta-io/delta/pull/6834) regenerates only the changed log range instead of the full snapshot on every commit.

Second, [IcebergCompatV3 (experimental)](https://github.com/delta-io/delta/pull/6783) enables Delta tables that use deletion vectors (DVs) to also have UniForm enabled. With `delta.enableIcebergCompatV3=true`, DVs and UniForm coexist on the same table, and the new mode adds geometry/geography compatibility with the latest Iceberg writer protocol.

```sql
-- New table with Deletion Vectors and UniForm together
CREATE TABLE prod.consumer.clickstream (
  event_date DATE,
  event_type STRING,
  user_id    STRING
)
USING DELTA
TBLPROPERTIES (
  'delta.enableIcebergCompatV3'  = 'true',
  'delta.feature.catalogManaged' = 'supported',
  'delta.enableDeletionVectors'  = 'true'
);

-- Or enable on an existing table
ALTER TABLE prod.consumer.clickstream
SET TBLPROPERTIES ('delta.enableIcebergCompatV3' = 'true');
```

UniForm is now built against Iceberg-spark 1.11.0 and [supports both Spark 4.0 and Spark 4.1](https://github.com/delta-io/delta/pull/6858).

## Streaming and Change Data Feed (CDF)

Structured Streaming now supports [CDC streaming](https://github.com/delta-io/delta/pull/6363), [Row Tracking reads](https://github.com/delta-io/delta/pull/6519), and [additive and non-additive schema evolution](https://github.com/delta-io/delta/pull/6697) tracked through a schema-tracking log. This means a column rename no longer stalls your stream. Opt in per-query with `allowSourceColumnRename`, `allowSourceColumnDrop`, or `allowSourceTypeChange`:

```python
query = (
    spark.readStream
        .format("delta")
        .option("allowSourceColumnRename", "true")
        .option("allowSourceColumnDrop",   "true")
        .option("checkpointLocation", "/checkpoints/clickstream-stream")
        .table("prod.consumer.clickstream")
        .writeStream
        .format("delta")
        .toTable("prod.consumer.clickstream_sink")
)
```

```sql
-- Upstream renames the column; the stream picks it up without replay
ALTER TABLE prod.consumer.clickstream RENAME COLUMN user_id TO userId;
```

Tables with Row Tracking enabled now expose `_metadata.row_id` and `_metadata.row_commit_version` on streaming reads via DSv2:

```sql
SELECT
  event_date,
  event_type,
  userId,
  _metadata.row_id,
  _metadata.row_commit_version
FROM STREAM(prod.consumer.clickstream);
```

[failOnDataLoss](https://github.com/delta-io/delta/pull/6395) support also gives you data-loss guardrails on your streaming writes. Setting it to `false` now skips to the earliest available version when log files have been cleaned up instead of throwing an error. In practice, one streaming read can now survive a schema change upstream and keep its data-loss guardrail:

```python
query = (spark.readStream
  .option("schemaTrackingLocation", "/checkpoints/clickstream/_schema_log")
  .option("failOnDataLoss", "false")
  .table("prod.consumer.clickstream")
  .writeStream
  .option("checkpointLocation", "/checkpoints/clickstream")
  .toTable("prod.consumer.clickstream_bronze"))
```

Change Data Feed support extends beyond streaming: [batch CDC](https://github.com/delta-io/delta/pull/6794) lands as `SELECT … CHANGES FROM VERSION/TIMESTAMP` for catalog-managed tables with full [Deletion-Vector-support](https://github.com/delta-io/delta/pull/6886) (available behind `spark.databricks.delta.changelogV2.enabled`):

```sql
SET spark.databricks.delta.changelogV2.enabled = true;

-- Replay changes from a specific version
SELECT * FROM prod.consumer.clickstream CHANGES FROM VERSION 10;

-- Or from a point in time
SELECT * FROM prod.consumer.clickstream CHANGES FROM TIMESTAMP '2026-05-01 00:00:00';
```

Moreover, Delta Sharing streaming queries can now [read the Change Data Feed](https://github.com/delta-io/delta/pull/6627) of a shared table and [run backfill-then-stop pipelines](https://github.com/delta-io/delta/pull/6549) via `Trigger.AvailableNow`.

## Conclusion

Delta 4.3 extends the catalog-managed foundation across the stack. The Unity Catalog Delta REST APIs bring every table operation under a single, validated commit path. Streaming expands with CDC, Row Tracking, and schema evolution that survives upstream changes. UniForm's Iceberg conversion becomes atomic and incremental. The result is an ecosystem where engines like Spark, DuckDB, Flink, and any client integrated with Delta-Kernel can all operate on the same tables through the same catalog.

For the complete list of changes, fixes, and contributor acknowledgments, see the [Delta 4.3.0 release notes on GitHub](https://github.com/delta-io/delta/releases/tag/v4.3.0).
