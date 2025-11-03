---
title: How to create and append to Delta Lake tables with pandas
description: This post explains how to create and append to Delta Lake tables with pandas
thumbnail: "./thumbnail.png"
author:
  - matthew-powers
publishedAt: 2023-04-01
---

This blog post explains how to create and append to Delta Lake tables with pandas.

You can easily create Delta Lake tables with pandas and you don’t need to depend on Spark.

You can also append to Delta tables, overwrite Delta tables, and overwrite specific Delta table partitions using pandas. Delta transactions are implemented differently than pandas operations with other file types like CSV or Parquet. Normal pandas transactions irrevocably mutate the data whereas Delta transactions are easy to undo.

Let’s dive in! See [this notebook](https://github.com/delta-io/delta-examples/blob/master/notebooks/pandas/create-delta-table-with-pandas.ipynb) if you’d like to run the code on your local machine.

## Create Delta Lake table with pandas

Let’s start by creating a pandas DataFrame.

```
import pandas as pd

df = pd.DataFrame({"x": [1, 2, 3]})
```

Now let’s write the pandas DataFrame to a Delta table.

```
import os
from deltalake import DeltaTable
from deltalake.writer import write_deltalake

write_deltalake("tmp/some_delta_lake", df)
```

Let’s read the Delta table back into a pandas DataFrame to make sure it was written properly:

```
DeltaTable("tmp/some_delta_lake").to_pandas()

	x
0	1
1	2
2	3
```

It’s easy to write a pandas DataFrame to a Delta table and read a Delta table into a pandas DataFrame. Let’s now look at how to append more data to an existing Delta table.

## Append to Delta Lake table with pandas

Create another pandas DataFrame that will be appended to the Delta table.

```
df2 = pd.DataFrame({"x": [8, 9, 10]})
```

Now append the pandas DataFrame to the Delta table.

```
write_deltalake("tmp/some_delta_lake", df2, mode="append")
```

Read in the Delta table to a pandas DataFrame to make sure the Delta table is properly read.

```
DeltaTable("tmp/some_delta_lake").to_pandas()

	x
0	1
1	2
2	3
3	9
4	8
5	10
```

Append operations add data to an existing Delta table. Now let’s see how to overwrite a Delta table which will remove all the existing data and replace it with new contents.

## Overwrite Delta Lake table with pandas

Create another pandas DataFrame that will be used to overwrite the Delta table.

```
df3 = pd.DataFrame({"x": [55, 66, 77]})
```

Perform the overwrite transaction.

```
write_deltalake("tmp/some_delta_lake", df3, mode="overwrite")
```

Confirm that the Delta table has been overwritten.

```
DeltaTable("tmp/some_delta_lake").to_pandas()

	x
0	55
1	66
2	77
```

Overwriting a Delta table is a logical operation. It doesn’t actually remove the old data files from disk. See [Denny’s blog post](https://dennyglee.com/2023/03/20/why-does-altering-a-delta-lake-table-schema-not-show-up-in-the-spark-dataframe/) to gain more intuition about logical vs physical transactions.

Since the data files are not physically removed from disk, you can time travel between the different versions of the data, as described in [this blog post](https://delta.io/blog/2022-10-15-version-pandas-dataset/).

## Overwrite partition of Delta Lake table with pandas

As of [the deltalake 0.8.1 release](https://github.com/delta-io/delta-rs/releases/tag/python-v0.8.1), you can now overwrite partitions of Delta tables with predicates.

Create a pandas DataFrame with `name` and `country` columns that can be used to make a partitioned Delta table.

```
df = pd.DataFrame(
    {"name": ["li", "xi", "sally", "fred"], "country": ["china", "china", "us", "us"]}
)
```

Now write out the DataFrame as a partitioned Delta table:

```
write_deltalake(
    "tmp/some_people",
    df,
    partition_by=["country"],
)
```

Here are the contents of the Delta table. You can see that it’s using Hive-style partitioning.

```
tmp/some_people
├── _delta_log
│   └── 00000000000000000000.json
├── country=china
│   └── 0-dd1deda9-b862-47fb-8ffd-4c91d410ad31-0.parquet
└── country=us
    └── 0-dd1deda9-b862-47fb-8ffd-4c91d410ad31-0.parquet
```

View the contents of the Delta table when it’s read into a pandas DataFrame:

```
DeltaTable("tmp/some_people").to_pandas()

	name	country
0	li	china
1	xi	china
2	sally	us
3	fred	us
```

Create another DataFrame with three other individuals from China.

```
df = pd.DataFrame(
    {"name": ["jack", "bruce", "yao"], "country": ["china", "china", "china"]}
)
```

Overwrite the China partition with the new DataFrame. You should only overwrite the China partition and leave the other partitions untouched.

```
write_deltalake(
    "tmp/some_people",
    df,
    mode="overwrite",
    partition_filters=[("country", "=", "china")],
)
```

Read the Delta table to confirm the Delta table contents are as expected.

```
DeltaTable("tmp/some_people").to_pandas()

	name	country
0	sally	us
1	fred	us
2	jack	china
3	bruce	china
4	yao	china
```

You can still time travel back to the initial version of the Delta table:

```
DeltaTable("tmp/some_people", version=0).to_pandas()

	name	country
0	li	china
1	xi	china
2	sally	us
3	fred	us
```

You can look at the files in storage and see that a file has been added to the China partition:

```
tmp/some_people
├── _delta_log
│   ├── 00000000000000000000.json
│   └── 00000000000000000001.json
├── country=china
│   ├── 0-dd1deda9-b862-47fb-8ffd-4c91d410ad31-0.parquet
│   └── 1-45cf731b-382f-4244-b156-d1f009f02a80-0.parquet
└── country=us
    └── 0-dd1deda9-b862-47fb-8ffd-4c91d410ad31-0.parquet
```

Delta Lake overwrite operations are logical operations, not physical operations. Delta Lake logically removes the file via a metadata operation. It doesn’t physically remove the file by deleting it from storage.

Let’s take a look at the transaction log entry associated with the overwrite transaction to get a better understanding.

```
{
  "add": {
    "path": "country=china/1-41f18aa2-9707-4716-b5ae-4089cf778756-0.parquet",
    "size": 1859,
    "partitionValues": {
      "country": "china"
    },
    "modificationTime": 1679455801261,
    "dataChange": true,
    "stats": "{\"numRecords\": 3, \"minValues\": {\"name\": \"bruce\"}, \"maxValues\": {\"name\": \"yao\"}, \"nullCount\": {\"name\": 0}}",
    "tags": null
  }
}
{
  "remove": {
    "path": "country=china/0-7220ecd3-1497-485d-9b85-583cf4fd6be7-0.parquet",
    "deletionTimestamp": 1679455801261,
    "dataChange": true,
    "extendedFileMetadata": false,
    "partitionValues": {
      "country": "china"
    },
    "size": 1834,
    "tags": null
  }
}
{
  "commitInfo": {
    "timestamp": 1679455801262,
    "operation": "WRITE",
    "operationParameters": {
      "partitionBy": "[\"country\"]",
      "mode": "Overwrite"
    },
    "clientVersion": "delta-rs.0.8.0"
  }
}
```

It’s easy to overwrite a partition in a Delta table with pandas!

## Creating a partitioned Parquet table with pandas

Let’s create the same DataFrame as before, but write it out to a partitioned Parquet DataFrame with pandas.

Recreate the original pandas DataFrame:

```
df = pd.DataFrame(
    {"name": ["li", "xi", "sally", "fred"], "country": ["china", "china", "us", "us"]}
)
```

Write out the DataFrame to a partitioned Parquet dataset:

```
df.to_parquet("tmp/some_people_parquet", partition_cols=["country"])
```

Inspect the files in storage:

```
tmp/some_people_parquet
├── country=china
│   └── de44a20d63a8443ba94883fc956a239d-0.parquet
└── country=us
    └── de44a20d63a8443ba94883fc956a239d-0.parquet
```

View the contents of one of the Parquet files:

```
pd.read_parquet(
    "tmp/some_people_parquet/country=china/de44a20d63a8443ba94883fc956a239d-0.parquet"
)

	name
0	li
1	xi
```

The Parquet file follows Hive-style partitioning and doesn’t contain the `country` column. The data from the `country` column has been abstracted to the directory structure.

Now let’s see how to overwrite a partition of the partitioned Parquet table with pandas.

## Overwriting a partition of a partitioned Parquet table with pandas

We’ll need to do some hacking to overwrite the Parquet table partition with pandas.

Start by creating the same DataFrame from before that will overwrite:

```
df = pd.DataFrame(
    {"name": ["jack", "bruce", "yao"], "country": ["china", "china", "china"]}
)
```

We need to drop the `country` column before appending the data to follow Hive-style partitioning conventions.

```
df2 = df.drop(columns=["country"])
```

Append the new data to the partitioned Parquet table. You need to manually specify the right folder.

```
df2.to_parquet("tmp/some_people_parquet/country=china/new-data.parquet")
```

Take a look at the contents of the Parquet table in storage:

```
tmp/some_people_parquet
├── country=china
│   ├── de44a20d63a8443ba94883fc956a239d-0.parquet
│   └── new-data.parquet
└── country=us
    └── de44a20d63a8443ba94883fc956a239d-0.parquet
```

Here’s the content of the Parquet table:

```
	name	country
0	li	china
1	xi	china
2	jack	china
3	bruce	china
4	yao	china
5	sally	us
6	fred	us
```

We haven’t overwritten the partition, we’ve just appended to the partition. Let’s manually delete the old data file:

```
rm tmp/some_people_parquet/country=china/de44a20d63a8443ba94883fc956a239d-0.parquet
```

Our Parquet table now contains the correct data:

```
pd.read_parquet("tmp/some_people_parquet")

	name	country
0	jack	china
1	bruce	china
2	yao	china
3	sally	us
4	fred	us
```

Overwriting a Delta table partition is much better than what’s offered by pandas for Parquet tables.

What sets Delta Lake apart here is it will verify the data you are passing matches the partition you are overwriting, and will error if there seems to be a mistake. It also doesn’t require the user to perform manual and dangerous file removal operations.

## Why Delta Lake is better than Parquet for many pandas analyses

Delta Lake has a number of advantages compared to Parquet for pandas analyses:

- Schema enforcement
- Schema evolution
- File skipping when reading data
- ACID transactions
- DML transactions
- [Versioned data](https://delta.io/blog/2022-10-15-version-pandas-dataset/)
- And many more…

For most analyses, Delta Lake provides a better user experience than vanilla Parquet. And [Parquet is better than CSV of course for the reasons explained in this video](https://www.youtube.com/watch?v=9LYYOdIwQXg).

## Conclusion

There are several ways to create and append data to Delta tables with pandas.

You can append to an existing Delta table, overwrite a Delta table entirely, or overwrite a specific partition in a Delta table.

Delta Lake append and overwrite transactions are logical operations, so you can still time travel to earlier versions of your data or rollback to undo mistakes.

Delta Lake transactions are easy to undo and they don’t delete your old data files, so you can always time travel back to earlier versions of the data. These features are key quality of life improvements for pandas users. No more accidental deletion of data with regular pandas overwrites that can cause data loss!
