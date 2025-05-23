---
title: "Query Delta Lake natively using BigQuery"
thumbnail: "./thumbnail.png"
description: Users working with Delta Lake tables can now easily integrate their workloads with BigQuery, ensuring secure and more managed interoperability.
publishedAt: 2024-06-03
author:
  - gaurav-saxena
  - justin-levandoski
---

Users working with Delta Lake tables can now easily integrate their workloads with BigQuery, ensuring secure and more managed interoperability. BigQuery's native integration with Delta Lake’s log allows its query engine to leverage valuable metadata, simplifying the process of querying Delta tables with improved performance and granular security controls. This integration is another example of BigQuery's continued commitment to an open and unified platform, enabling users to query data regardless of format or type. BigQuery now supports querying data from all major open table formats, including Apache Iceberg, Apache Hudi, and Delta.io.

The previous method for querying Delta Lake tables required a manifest-based approach, involving manual refreshes and potential read staleness. This new integration streamlines the process by directly parsing the table's state from the Delta log. The use of delta log metadata for query, combined with BigLake’s governance model results in enhanced management, performance, and security.

## Query support that spans across multiple clouds

To query Delta tables using BigQuery, first create a BigLake table with the format type set to Delta. Point this table to the object store prefix of the Delta table. This instructs BigLake to create a table that references the Delta log as the source of truth for metadata. This functionality is in public preview for Amazon S3, Azure Blob Storage, ADLS Gen2 and on Google Cloud Storage.

Once created, you can query the BigLake table like any other table in BigQuery. BigQuery parses Delta log metadata at query time, enabling optimized query planning, improved performance, and the elimination of read staleness limitations associated with previous approaches. When the table resides on Amazon S3 or ADLS Gen2, BigQuery Omni is used to query the data, processing it locally in the respective cloud for performance and cost benefits.

To make it easier to manage and adapt to evolving data, BigQuery can also automatically detect and update schema changes in Delta tables.

**Create a Delta table using BigLake:**

SQL

```
CREATE EXTERNAL TABLE `PROJECT_ID.DATASET.DELTALAKE_TABLE_NAME`
WITH CONNECTION `PROJECT_ID.REGION.CONNECTION_ID`
OPTIONS (
  format ="DELTA_LAKE",
  uris=['DELTA_TABLE_GCS_BASE_PATH']);
```

**Query the table:**

SQL

```
SELECT field1, field2 FROM mydataset.my_cloud_storage_table;
```

**Enable automatic schema management:**

Command Line

```
bq update --autodetect_schema PROJECT_ID :DATASET.DELTALAKE_TABLE_NAME
```

## Unified fine-grained security via BigLake

BigLake provides a consistent security model that protects data in BigQuery storage, Amazon S3, Azure Data Lake Storage Gen2, and Google Cloud Storage, regardless of format. It provides fine-grained permissions at the row and column level and supports data masking. You can easily set up fine-grained permissions on Delta tables with SQL statements or use the integration with Dataplex to simplify management at scale. Dataplex allows you to centrally define these policies, which are then pushed down to BigLake. BigLake enforces these fine-grained permissions when data is accessed by BigQuery (on Google Cloud Storage) or BigQuery Omni (on AWS and Azure). We recommend using this security model to meet the governance needs of your organization.

## Get Started!

Refer to our [documentation](https://cloud.google.com/bigquery/docs/create-delta-lake-table) to start querying your Delta tables with BigQuery. For further assistance, contact your Google Cloud representative or email biglake-help@google.com.
