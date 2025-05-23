---
title: Pros and cons of Hive-style partitioning
description: This post discusses the pros and cons of Hive-style partioning.
thumbnail: "./thumbnail.png"
author:
  - matthew-powers
  - martin-bode
publishedAt: 2024-04-24
---

This blog post explains when Hive-style partitioning is a useful data management technique and why it can have downsides for both data lake and Lakehouse storage system users.

You’ll also see how techniques like partition evolution overcome some of the limitations of Hive-style partitioning, but still suffer from the fundamental issues of Hive-style partitioning.

Hive-style partitioning physically separates data in folders. Here’s an example of a dataset that’s partitioned by country.

```
country="Angola"/
  fileA.parquet
  fileB.parquet
country="Colombia"/
  fileC.parquet
  fileD.parquet
  fileE.parquet
```

Let’s look at how Hive-style partitioning can speed up queries on data lakes before turning our attention to the downsides.

## Hive-style partitioning for data lakes

Hive-style partitioning lets you run queries on a data lake faster when the query allows for certain data files to get skipped.

Suppose you want to run the following query: `select count(*) from the_table where country = 'Angola'`. This query will run faster if the data lake is partitioned by the `country` column. The query engine only needs to list and read the data files in the `country='Angola'` directory. It can skip the data files in the other directories.

Engines need to run file listing operations to determine the files that must be read for different queries. Hive-style partitioning allows the query engine to read less files for certain queries.

For a query like `select count(*) from the_table`, the Hive-style partitioning doesn’t allow for any data skipping, so the query won’t run any faster. The Hive-style partitioning can actually make queries that can’t leverage data skipping run far slower.

File listing operations execute differently depending on the underlying storage system. A file listing operation on a Unix-based file system like Mac OS is executed differently than on a cloud based key-value store, like Amazon S3.

Globbing nested directories is much slower on key-value object stores. Slower file listing operations is just one way Hive-style partitioning can make queries slower.

## Hive-style partitioning can exacerbate the small file problem

Hive-style partitioning can also make the small file problem worse.

Query engines generally run slower if the data lake contains a lot of small files. The query will generally run faster on 100 files that are 1 GB each compared to 10,000 files that are 0.01 GB each.

Hive-style partitioning requires data to be stored in separate files, even if it’s just a single row of data. Suppose you are partitioning a dataset on columnA which has 1,000 distinct values. That means your dataset must be written out to at least 1,000 different files.

Further suppose that you update this dataset with new data every hour. That means up-to 1,000 files are created every hour, which is 24,000 files per day. Hive-style partitioning can result in rapid growth of small files.

If you’re only ingesting 1GB of data per hour, then it’s not wise to write out up to 1,000 files every hour. You can fix the small files with periodic compaction, but that’ll waste compute cycles.

Data is often skewed and the ideal situation is to have full partitioning for the most common column values, but shared partitions for the long-tail column values. Hive-style partitioning is too strict for skewed datasets.

Let’s dive into the architecture of a Lakehouse storage system to understand how they list files different and why physical disk partitioning isn’t even necessary.

## Hive-style partitioning for Lakehouse storage systems

Lakehouse storage systems (like Delta Lake) store data in Parquet files and metadata about the files in the transaction log.

Engines find the file paths in the transaction log when querying Lakehouse storage systems - they don’t need to perform file listing operations. Avoiding file listing operations is one major advantage of a Lakehouse storage system over a data lake.

Engines don’t need physical disk partitioning to enjoy the data skipping benefits of disk partitioning when Lakehouse storage systems are used. The engine can get all the file skipping benefits from consulting the transaction log. It doesn’t need to glob directories to discern which files contain certain partition values.

Let’s look at a Hive-style partitioned table with Delta Lake and explain why this data management technique is supported.

## Hive-style partitioning for Delta Lake tables

Let’s create a small partitioned Delta table to demonstrate the feature. Start by creating a DataFrame with people.

```
+----------+---------+---------+
|first_name|last_name|  country|
+----------+---------+---------+
|   Ernesto|  Guevara|Argentina|
|     Maria|Sharapova|   Russia|
|     Bruce|      Lee|    China|
|      Jack|       Ma|    China|
+----------+---------+---------+
```

Now write this DataFrame out to a Hive-style partitioned Delta table:

```
(
    df.repartition(F.col("country"))
    .write.partitionBy("country")
    .format("delta")
    .saveAsTable("country_people")
)
```

Note: `repartition()` is used here so one file is written per partition for example purposes.

Take a look at the contents of the Delta table in storage:

```
spark-warehouse/country_people
├── _delta_log
│   └── 00000000000000000000.json
├── country=Argentina
│   └── part-00000-0e188daf-7ed1-4a46-9786-251e5a5b7c61.c000.snappy.parquet
├── country=China
│   └── part-00000-69aeadfb-3692-4765-94bc-f4b271133b35.c000.snappy.parquet
└── country=Russia
    └── part-00000-d3a4d532-74f9-4304-970d-b476cf296a07.c000.snappy.parquet
```

The Delta table consists of Parquet files with the data that are structured in nested directories. The transaction log contains information about the files, including the partition structure.

When engines query the Delta table, the figure out the file locations and partition information from the transaction log. They don’t need to run file listing operations or glob to find the relevant files. The physical partitions of a Delta table are actually unnecessary and the files could simply be logically partitioned. The only reason Delta Lake supports physical partitioning is for compatibility with other engines that support Hive-style partitioning and to make conversions possible.

A Hive-style partitioned Parquet data lake can be converted to a Delta table (and vice versa) because Delta Lake supports Hive-style partitioning.

Let’s look at some more limitations of Hive-style partitioning and how to separate data better.

## Partition evolution for changing partitioning needs

Partition evolution allows you to change the partitioning scheme of an existing table and is sometimes touted as a solution for the limitations of Hive-style partitioning.

Partition evolution is nice if you want to fix a mistake in your table partitioning, like updating from partitioning by day to partitioning by hour. Partition evolution lets you make this switch without rewriting your data table.

Partition evolution lets you fix the mistake of choosing the wrong partition key, but it’s a band-aid solution and doesn’t fix the root issue.

The issue of overly rigid data separation, small files, and slow file listings (for data lakes), still persist. Let’s now turn our attention to Z Ordering, which solves some of the Hive-style partitioning problems more sustainably.

## Z Ordering instead of Hive-style partitioning

You can skip files when running queries on tables in Lakehouse storage systems based on the column level metadata or the partition information in the transaction log.

As we’ve already discussed, Lakehouse storage systems don’t require Hive-style partitioning which uses file listing operations based on the directory structure to skip data. A Delta table can also skip files based on the min/max column values stored in the transaction log.

Z Ordering the data makes skipping files based on min/max file-level metadata more effective.

Z Ordering also makes file skipping better for a wider range of query patterns. Suppose you have a table with `col_a` and `col_b` and you’d like to make all the following types of queries run faster:

- QueryA: filtering on `col_a`
- QueryB: filtering on `col_b`
- QueryC: filtering on both `col_a` and `col_b`

Z Ordering the dataset on `col_a` and `col_b` will make QueryA, QueryB, and QueryC run faster. If the table is partitioned by `col_a`, then only QueryA will run faster.

Z Ordering can be better than Hive-style partitioning in certain use cases, but it also has a lot of tradeoffs. Z Ordering and Hive-style partitioning aren’t mutually exclusive either - a table can be partitioned and each partition can be Z Ordered.

See [this post](https://delta.io/blog/2023-06-03-delta-lake-z-order/) for a full description on Z Ordering. For purposes of this discussion, the most important take-away is that data does not need to be separated in subfolders for users to enjoy the benefits of file skipping. Data skipping in a Lakehouse storage system can also take place based on file-level column min/max metadata.

Let’s now look at another reason why Hive-style partitioning is used that’s not related to performance.

## Hive-style partitioning for concurrency

There are certain types of operations that can bypass concurrency issues via Hive-style partitioning.

For example, concurrent update and delete operations on the same data may conflict and will throw errors.

You can bypass these concurrency errors on a Hive-style partitioned table by running the update and delete operations on non-overlapping partitions. For example, these two commands can be run concurrently on a Delta table that’s partitioned by `date`:

- `UPDATE table WHERE date > '2010-01-01'`
- `DELETE table WHERE date < '2010-01-01'`

Hive-style partitioning allows users to bypass concurrency issues in certain circumstances, but as we’ve previously mentioned, separating data into subdirectories isn’t strictly necessary to get a full division of data. Logical partitioning (separating data into separate files and recording this in the transaction log) is sufficient and physical partitioning (separate data into separate folders) isn’t strictly necessary.

## Using a generated column to partition time series data

[4]: https://docs.delta.io/latest/best-practices.html#choose-the-right-partition-column
[6]: https://en.wikipedia.org/wiki/Data_binning
[7]: https://spark.apache.org/docs/latest/api/sql/#date_trunc
[8]: https://delta.io/blog/2023-04-12-delta-lake-generated-columns
[9]: https://docs.delta.io/latest/delta-batch.html#-deltausegeneratedcolumns
[10]: https://github.com/delta-io/delta/releases/tag/v2.3.0

### 🛑 anti-pattern: partition by non-binned `TimestampType` column

When working with transactional data / events, data usually contain some kind of timestamp attribute. Analysis of the data often focuses on the _most recent data_, which is why using the timestamp as partition column might sound promising.
Problem here is that partitioning by a high cardinality column like `TimestampType` column will most certainly lead to over-partitioning, creating an abundance of partitions containing only little data.

```python
from pyspark.sql import functions as F
from pyspark.sql import types as T
from datetime import datetime

schema = T.StructType([
    T.StructField('event_id', T.LongType()),
    T.StructField('event_timestamp', T.TimestampType()),
    T.StructField('event_payload', T.StringType()),
])

data = [
    (            1, datetime.fromisoformat("1990-06-15 09:01:01"), "Australia"),
    (            2, datetime.fromisoformat("1990-06-15 09:01:02"), "Botswana"),
    (    1_000_000, datetime.fromisoformat("1990-12-31 12:34:56"), "Costa Rica"),
    (1_000_000_000, datetime.fromisoformat("2000-01-10 12:34:56"), "Denmark"),
]

df = spark.createDataFrame(data, schema)
```

```python
(
    df
    .coalesce(1) # only for demonstration purposes, so per partition, one file is written
    .write
    .format("delta")
    .mode("overwrite")
    .partitionBy("event_timestamp")
    .saveAsTable("events")
)
```

```
events
├── _delta_log/
│   └── 00000000000000000000.json
├── event_timestamp=1990-06-15 09:01:01/
│   └── part-00001-77330743-946f-4f6a-830e-37a575d5234f.c000.snappy.parquet (1 rows)
├── event_timestamp=1990-06-15 09:01:02/
│   └── part-00003-d4e51376-087d-45fb-b472-d392c3991dab.c000.snappy.parquet (1 rows)
├── event_timestamp=1990-12-31 12:34:56/
│   └── part-00005-0ca14c69-bdcb-4233-b075-da74bc8b0f97.c000.snappy.parquet (1 rows)
└── event_timestamp=2000-01-10 12:34:56/
    └── part-00007-66f59e03-5c5c-4b7f-923b-3059f928e06f.c000.snappy.parquet (1 rows)
```

As shown here, all the rows will end up in a separate partition even when event 1 and 2 happened nearly at the same time.

### ✅ partition by _binned_ `TimestampType` column (using generation expression)

A better approach is, to ["bin"][6] the `TimestampType` values to a _coarser_ granularity and thereby reduce the cardinality of values (e.g., hourly, daily, yearly).
This can easily be done by a [**generated column**][8], making use of the [`DATE_TRUNC`][7] function.
The advantage of a generated column here is that when appending data to the table after its creation, it will be calculated from the reference column automatically during insert (and the column does not need to be contained in the append-`DataFrame`). Moreover, since [Delta 2.3][10], when querying the table with a predicate on a column **referenced by the partition column's generation expression** will also support [partition pruning][9]. When executing `SELECT * FROM events WHERE event_timestamp = '1990-06-15 09:01:01'` Delta will tell the engine only to read partition `event_timestamp_bin=1990-01-01` initially and then filter for `event_timestamp = '1990-06-15 09:01:01'` in the following example.

```python
generation_expression = "DATE_TRUNC('YEAR', event_timestamp)"
(
    df
    .withColumn("event_timestamp_bin", F.expr(generation_expression)) # generated a new column that contains the desired timestamp granularity
    .withMetadata("event_timestamp_bin", {"delta.generationExpression": generation_expression}) # this will tell Delta that this is a generated column
    .coalesce(1) # only for demonstration purposes, so per partition, one file is written
    .write
    .format("delta")
    .mode("overwrite")
    .partitionBy("event_timestamp_bin")
    .saveAsTable("events")
)
```

```
events
├── _delta_log/
│   └── 00000000000000000000.json
├── event_timestamp_bin=1990-01-01 00:00:00/
│   └── part-00000-0ba92f13-29ee-410b-8943-298fa8e86f4e.c000.snappy.parquet (3 rows)
└── event_timestamp_bin=2000-01-01 00:00:00/
    └── part-00000-57b8e78f-a752-4285-8cab-25be3aa632f4.c000.snappy.parquet (1 rows)
```

Here it is visible, that three rows will be stored in the same partition (no more over-partitioning).

<details>
<summary>See partition pruning in action</summary>

```python
spark.table("events").filter(F.col("event_timestamp_bin") == '1990-01-01').explain()
```

```
== Physical Plan ==
*(1) ColumnarToRow
+- FileScan parquet spark_catalog.delta_blog.events[event_id#4761L,event_timestamp#4762,event_payload#4763,event_timestamp_bin#4764]
    Batched: true,
    DataFilters: [],
    Format: Parquet,
    Location: PreparedDeltaFileIndex(1 paths)[dbfs:/user/hive/warehouse/delta_blog.db/events],
    PartitionFilters: [isnotnull(event_timestamp_bin#4764), (event_timestamp_bin#4764 = 1990-01-01 00:00:00)],
    PushedFilters: [],
    ReadSchema: struct<event_id:bigint,event_timestamp:timestamp,event_payload:string>
```

Note `PartitionFilters`

```python
spark.table("events").filter(F.col("event_timestamp") == '1990-06-15 09:01:02').explain()
```

```
== Physical Plan ==
*(1) Filter (isnotnull(event_timestamp#4916) AND (event_timestamp#4916 = 1990-06-15 09:01:02))
+- *(1) ColumnarToRow
   +- FileScan parquet spark_catalog.delta_blog.events[event_id#4915L,event_timestamp#4916,event_payload#4917,event_timestamp_bin#4918]
    Batched: true,
    DataFilters: [isnotnull(event_timestamp#4916), (event_timestamp#4916 = 1990-06-15 09:01:02)],
    Format: Parquet,
    Location: PreparedDeltaFileIndex(1 paths)[dbfs:/user/hive/warehouse/delta_blog.db/events],
    PartitionFilters: [((event_timestamp_bin#4918 = date_trunc(MONTH, 1990-06-15 09:01:02, Some(Etc/UTC))) OR isnull((e..., PushedFilters: [IsNotNull(event_timestamp), EqualTo(event_timestamp,1990-06-15 09:01:02.0)],
    ReadSchema: struct<event_id:bigint,event_timestamp:timestamp,event_payload:string>
```

Note `PartitionFilters`

</details>

### 🔀 Partition evolution: change binning granularity of partition columns

Estimating the _correct_ partition granularity upfront is very difficult. The rule of thumb here is that there should be [at least 1 GB of data in each partition][4].
Therefore, ending up in a situation where the table is either over-partitioned (many partitions containing only little data) or under-partitioned (few partitions containing large data) is rather common.
To **change the granularity** of the partition afterward is easy with Delta but comes at the cost of **rewriting the whole table**.

In this example, the Delta table (previously binned by _year_) is read; the corresponding `DataFrame` is transformed (so that the partition values are binned by _month_) and used to simply overwrite the Delta table in-place. Due to Delta's versioning / time travel functionality, this will create a new version of the table with the changed generation expression. So there is no need to create a temporary table and swap it afterward.

```python
spark.table("events")

new_generation_expression = "DATE_TRUNC('MONTH', event_timestamp)"
(
    spark.table("events")
    .withColumn("event_timestamp_bin", F.expr(new_generation_expression))
    .withMetadata("event_timestamp_bin", {"delta.generationExpression": new_generation_expression})
    .coalesce(1) # only for demonstration purposes, so per partition, one file is written
    .write
    .format("delta")
    .mode("overwrite")
    .option("overwriteSchema", "True") # this is required, because we change the generation expression that is considered part of the schema
    .partitionBy("event_timestamp_bin")
    .saveAsTable("events")
)
```

```
events
├── _delta_log/
│   └── 00000000000000000000.json (old generation expression / partitioning scheme)
│   └── 00000000000000000001.json (new generation expression / partitioning scheme)
├── event_timestamp_bin=1990-01-01 00:00:00/
├── event_timestamp_bin=1990-06-01 00:00:00/
│   └── part-00000-cc206daa-ed02-4277-a340-e73b103f1cb3.c000.snappy.parquet (2 rows)
├── event_timestamp_bin=1990-12-01 00:00:00/
│   └── part-00000-886aa276-3211-4c45-8a5a-6d138809b39b.c000.snappy.parquet (1 rows)
└── event_timestamp_bin=2000-01-01 00:00:00/
    └── part-00000-70d65a32-e9cd-4503-8822-3fe1a7e36586.c000.snappy.parquet (1 rows)
```

## Conclusion

Hive-style partitioning is an important data management technique for data lakes because it allows for data skipping. Data lakes don’t have a transaction log with file-level metadata statistics, so the only way to skip files is by physically partitioning the data in storage.

Hive-style partitioning allows for full data separation, is supported by many legacy engines, and can help users bypass concurrency conflicts, so it’s useful in certain situations.

However, Hive-style partitioning also has many downsides. It creates a rigid table structure, can cause lots of small files to be created, and only works for columns with relatively low cardinality. A table is often queried in different ways and Hive-style partitioning will only make some of the queries faster (and perhaps make the other queries slower).

Delta Lake supports better ways to colocate data that provide the benefits of Hive-style partitioning without the downsides.
