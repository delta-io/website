---
title: Delta Lake 4.1.0 Released
description: We’re excited to announce the release of Delta Lake 4.1.0. This release introduces significant new features, performance improvements, and critical platform upgrades, including full support for Apache Spark 4.1.0 and enhanced storage management in Unity Catalog.
thumbnail: ./thumbnail.png
author:
  - zheng-hu
  - scott-haines
publishedAt: 2026-03-10
---

We’re excited to announce the release of Delta Lake 4.1.0. This release introduces significant new features, performance improvements, and critical platform upgrades, including full support for Apache Spark 4.1.0 and enhanced storage management in Unity Catalog.

Delta Lake 4.1.0 is a recommended update for all users, featuring:

1. Catalog-Managed Table Enhancements: which establish the catalog as the coordinator of table access and source of truth for table state. This simplifies how tables are discovered and secured, enables consistent governance across engines, and unlocks faster performance.
2. Apache Spark 4.1.0 Support: Full support for the latest Spark version while maintaining compatibility with Spark 4.0.1.
3. Server-Side Planning (Preview): Delegated scan planning to catalog servers for improved query efficiency.
4. AWS Storage Credentials & External Locations: First-class resource management for AWS IAM roles and S3 storage in Unity Catalog.
5. Atomic CTAS for UC Tables: Fully atomic <span style="color:#d63384">CREATE TABLE AS SELECT</span> operations for managed and external Delta tables.
6. Conflict-Free Feature Enablement: Enable Deletion Vectors and Column Mapping on existing tables without blocking concurrent writes.

Let’s take a closer look at what’s new.

## Catalog-Managed Table Enhancements

### Delta Spark and Kernel now provide full production support for catalog-managed tables.

---

This release enhances the integration between Delta Lake and Unity Catalog, enabling seamless table creation, batch/streaming reads and writes, and history inspection.

- **Delta Kernel Support**: Kernel-based connectors can now interact with catalog-managed Delta tables, shifting commit coordination from the filesystem to the catalog.
- **New V2 Connector**: A Spark DataSource V2 connector backed by Delta Kernel is now available, specifically supporting streaming reads for catalog-managed tables.

For a deeper dive into Catalog-Managed Tables, head over to our [overview blog post and tutorial here](https://delta.io/blog/2026-02-02-delta-catalog-managed-tables/).

## Apache Spark 4.1.0 and New Artifact Naming

### Delta Lake 4.1.0 is built for Spark 4.1.0 and introduces a more flexible artifact naming convention.

---

Starting with this release, Maven artifacts include a Spark version suffix (e.g., <span style="color:#d63384">delta-spark_4.1_2.13</span>) to allow users to choose the version that matches their specific Spark runtime.
While backward-compatible artifacts without the suffix are still published for this release, we recommend transitioning to the new naming format.

**Key benefits include:**

- **Choice of Runtime**: Explicit artifacts for both Spark 4.1 and Spark 4.0.
- **Java 17 Requirement**: This release fully embraces Java 17; Spark 3.5 support has been officially dropped. All releases will be focused on alignment with Spark >= 4.

## Server-Side Planning (Preview)

### Reduce client-side overhead by delegating query planning to the catalog server.

---

This feature allows Delta Lake's Spark connector to **delegate table scan planning** — file discovery, predicate
filtering, and credential provisioning — to an external catalog (currently Unity Catalog via the Iceberg REST Catalog
protocol) instead of locally on the driver. The primary motivation is **Fine-Grained Access Control (FGAC)**: for
tables with row-level or column-level access policies, the driver should never get raw storage access. The catalog
instead decides which files the query is allowed to see and hands back scoped, temporary credentials.

What's amazing here is this feature supports server-side pushdown of filters, projections, and limits, significantly
reducing the metadata that needs to be processed by the client.

Enabling this feature requires you to create a Spark Session that is connected to Unity Catalog with the following
configuration:

```python
DELTA_VERSION='4.1.0'
UNITY_CATALOG_VERSION='0.4.0'

# replace <hostname> with the hostname of your Unity Catalog server
unity_catalog_server_url = "http://<hostname>:8080"

config = {
    "spark.jars.packages": f"io.delta:delta-spark_4.1_2.13:{DELTA_VERSION},io.unitycatalog:unitycatalog-spark_2.13:{UNITY_CATALOG_VERSION}",
    "spark.sql.extensions": "io.delta.sql.DeltaSparkSessionExtension",
    "spark.sql.catalog.spark_catalog": "org.apache.spark.sql.delta.catalog.DeltaCatalog",
    f"spark.sql.catalog.unity": "io.unitycatalog.spark.UCSingleCatalog",
    f"spark.sql.catalog.unity.uri": unity_catalog_server_url,
    f"spark.sql.catalog.unity.token": "",
    "spark.sql.defaultCatalog": catalog,
    "spark.databricks.delta.catalog.enableServerSidePlanning": "true",
}

spark_config = (
    SparkConf()
        .setMaster('local[*]')
        .setAppName("DeltaServerSidePlanning")
)

for k, v in config.items():
    spark_config = spark_config.set(k, v)

# build the session
spark: SparkSession = SparkSession.builder.config(conf=spark_config).getOrCreate()
```

Now you can read tables from Unity Catalog with server-side planning enabled.

## Atomic CTAS and Conflict-Free Operations

### Increased reliability for table creation and feature upgrades.

---

- **Atomic CTAS**: In conjunction with UC 0.4.0, <span style="color:#d63384">CREATE TABLE AS SELECT (CTAS)</span> is now fully atomic for Delta tables. This ensures that if a failure occurs during write that you aren't left with a partially written or corrupted table.
- **Non-Blocking Feature Enablement**: You can now enable Deletion Vectors and Column Mapping on existing tables without requiring a maintenance window or blocking concurrent transactions.

## Compatibility and Breaking Changes

---

The following are the key compatibility and breaking changes introduced in this release.

- **Java 17+**: Required for Delta Lake 4.1.0.
- **Spark 3.5 Support Dropped**: Users must upgrade to Spark 4.0.1 or 4.1.0.

## Try Delta Lake 4.1.0 and Get Involved

Delta Lake 4.1.0 is available now on Maven and PyPI. We want to thank the community for their incredible contributions
to this release—from reporting bugs to submitting PRs. If you want to learn more, take a peek at the official
[release notes on GitHub here](https://github.com/delta-io/delta/releases/tag/v4.1.0).

Try the new features and share feedback in the
[Delta Users Slack](https://go.delta.io/slack) or [create issues on GitHub](https://github.com/delta-io/delta/issues).
