---
title: Converting from Parquet to Delta Lake
description: This post shows how to convert a Parquet table to a Delta Lake.
thumbnail: "./thumbnail.png"
author: matthew-powers
publishedAt: 2022-09-23
---

A Delta Lake has several advantages over a plain vanilla Parquet table, such as support for ACID transactions, time travel, and concurrency control, as well as optimizations to improve query performance. You can easily take advantage of these features by converting your Parquet table into a Delta Lake. The code is simple and the Parquet files don’t need to be rewritten, so it requires fewer computational resources than you might imagine.

This post will show you how to convert a Parquet table to a Delta Lake so you can benefit from all that Delta Lakes have to offer. The conversion is an in-place operation, so it’s quick and cheap.

## Parquet to Delta Lake API

Delta Lake provides an API, [DeltaTable.convertToDelta](https://docs.delta.io/latest/api/python/index.html#delta.tables.DeltaTable.convertToDelta) to convert a Parquet table to a Delta Lake. For example, we can use the following code to convert an unpartitioned Parquet table to a Delta Lake using PySpark:

```python
from delta.tables import *

deltaTable = DeltaTable.convertToDelta(spark, "parquet.`<path-to-table>`")
```

Let’s create a Parquet dataset and run this command on a real set of files. We’ll start by creating a Parquet table with three rows of data:

```python
columns = ["language", "num_speakers"]
data = [("English", "1.5"), ("Mandarin", "1.1"), ("Hindi", "0.6")]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.format("parquet").save("tmp/lake1")
```

Here are the files that are created:

```
tmp/lake1
├── _SUCCESS
├── part-00000-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
├── part-00003-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
├── part-00006-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
└── part-00009-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
```

Now let’s run the code to convert the Parquet table into a Delta Lake:

```python
deltaTable = DeltaTable.convertToDelta(spark, "parquet.`tmp/lake1`")
```

Here are the contents of the Delta Lake:

```
tmp/lake1
├── _SUCCESS
├── _delta_log
│   ├── 00000000000000000000.checkpoint.parquet
│   ├── 00000000000000000000.json
│   └── _last_checkpoint
├── part-00000-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
├── part-00003-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
├── part-00006-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
└── part-00009-b84573b6-b805-4162-9143-9c598b80c289-c000.snappy.parquet
```

The command scans all the Parquet files and builds up the `_delta_log` directory, which contains the necessary metadata for Delta Lake data queries. Note that all the Parquet files in the Delta Lake are the same as the Parquet files in the Parquet table. Despite the added metadata, converting from Parquet to Delta Lake results in only a small increase in storage costs because no data is rewritten: `convertToDelta` is an in-place operation. The added features you can access are definitely worth the tiny increase in cost.

In this example the operation is quick, because there were only two Parquet files. Of course, building up the `_delta_log` takes more time when there are more files.

## Converting a partitioned Parquet table to a Delta Lake

Now let’s look at the process of converting a partitioned Parquet table to a Delta Lake. We’ll start by creating the table:

```python
df.write.partitionBy("language").format("parquet").save("tmp/lake2")
```

Here are the files on disk:

```
tmp/lake2
├── _SUCCESS
├── language=English
│   └── part-00003-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
├── language=Hindi
│   └── part-00009-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
└── language=Mandarin
    └── part-00006-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
```

Now let’s attempt to convert this Parquet table into a Delta Lake:

```python
deltaTable = DeltaTable.convertToDelta(spark, "parquet.`tmp/lake2`")
```

There’s a problem, though – this code errors out with the following message:

```
AnalysisException: Expecting 0 partition column(s): [], but found 1 partition column(s): [`language`] from parsing the file name: file:/.../delta-examples/notebooks/pyspark/tmp/lake2/language=English/part-00003-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
```

In a Parquet table, the data types of partition columns are determined by the directory names, which could be ambiguous. For example, when it reads the directory name date=2022-09-21, Delta Lake has no way of knowing which data type for the date partition column is the desired one – should it be string, date, timestamp? Hence, you need to provide a third parameter: a Hive DDL-formatted string that specifies the column names and data types of the partitions. For example:

```python
deltaTable = DeltaTable.convertToDelta(spark, "parquet.`tmp/lake2`", "language STRING")
```

Here are the files on disk after the conversion:

```
tmp/lake2
├── _SUCCESS
├── _delta_log
│   ├── 00000000000000000000.checkpoint.parquet
│   ├── 00000000000000000000.json
│   └── _last_checkpoint
├── language=English
│   └── part-00003-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
├── language=Hindi
│   └── part-00009-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
└── language=Mandarin
    └── part-00006-fa662100-1eff-4609-a0dd-794b5eec991a.c000.snappy.parquet
```

The process is just as simple, but when you’re converting a disk-partitioned Parquet table to a Delta Lake you’ll need to keep this small extra requirement in mind. If you don’t, Delta Lake will remind you!

## Pros and cons of converting to Delta Lakes

A Delta Lake has multiple advantages over a plain vanilla Parquet table: it allows for time travel between different versions of your data, ACID transactions, concurrency safety, and a variety of other benefits. Converting to a Delta Lake is quick and easy, and has almost no downsides.

One thing to be aware of is that converting from a Parquet table to a Delta Lake can be computationally expensive when there are a lot of Parquet files. This is because the conversion process needs to open all the files and calculate the metadata statistics to build the `_delta_log`.

Also, once a Parquet table is converted to a Delta Lake, it can only be read by query engines that have a Delta Lake reader. Delta Lake has a rapidly growing [connector ecosystem](https://github.com/delta-io/delta/tree/master/connectors), so interoperability with most query engines is already supported; however, some query engines support reading plain vanilla Parquet tables but don’t support reading Delta Lakes yet. Parquet may thus integrate better with some legacy technologies, but these situations are growing rarer.

## Next steps

It’s no surprise that it’s easy to convert from Parquet to Delta Lake, as they’re both open technologies. Parquet is an open source file format, and Delta Lake is an open source file protocol that stores data in Parquet files.

All of the code snippets you’ve seen in this blog post are fully open source, and you can easily run them on your local machine. Converting from Parquet to Delta Lake doesn’t require rewriting data in a proprietary file format, which would be much more computationally expensive.

As previously mentioned, Delta Lake’s vast connector ecosystem means you probably won’t have to convert between Parquet and Delta Lake often. This operation will primarily come in handy when your organization decides to switch from Parquet to Delta Lake to take advantage of all the additional features that Delta Lake provides for free: run it once and your organization can seamlessly enjoy the benefits the new format has to offer!
