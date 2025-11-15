---
title: Delta Lake Schema Enforcement
description: This post teaches you about schema enforcement in Delta Lake and why it's better than what's offered by data lakes
thumbnail: "./thumbnail.png"
author: matthew-powers
publishedAt: 2022-11-16
---

This post teaches you about Delta Lake schema enforcement and demonstrates how it protects you from adding files with incompatible schemas to your Delta table.

Parquet tables don’t support built-in schema enforcement, so they accept data with any schema, which isn’t necessarily desirable. Accidentally writing Parquet files to your data lake can be surprisingly difficult to undo.

Data lakes (e.g. Parquet tables) are schema-on-read, which means execution engines need to determine the schema when running queries. Data warehouses are schema-on-write, which means they check the schema when data is written. Delta Lake offers the flexibility of data lakes, and is also schema-on-write, offering the safety and guarantees of data warehouses. Delta Lake schema enforcement is a great schema-on-write benefit provided to users.

Let’s start by looking at how Parquet tables without an associated Hive metastore entry don’t prevent you from appending data with a different schema which is potentially dangerous. We will visit Parquet tables stored in the Hive metastore later.

## Parquet tables don’t have schema enforcement

This section demonstrates how Parquet tables don’t have any built-in schema enforcement, so you can mistakenly append data with a different schema to a Parquet table.

Start by creating a DataFrame with `first_name` and `age` columns and write it out to a Parquet table.

```python
columns = ["first_name", "age"]
data = [("bob", 47), ("li", 23), ("leonard", 51)]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.format("parquet").save("tmp/parquet_table1")
```

Now let’s append a DataFrame with a different schema to the Parquet table. Create a DataFrame with `first_name` and `favorite_color` columns, a different schema from before, and append it to the existing Parquet table.

```
columns = ["first_name", "favorite_color"]
data = [("sal", "red"), ("cat", "pink")]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.mode("append").format("parquet").save("tmp/parquet_table1")
```

PySpark lets you append a DataFrame with a different schema to your Parquet table. Different schemas in a single Parquet table will conflict, and readers will have to resolve that conflict in the future. It’s better for the query engine to throw an error if you write data with a mismatched schema by default.

PySpark, unfortunately, can’t run this pre-write check when working with Parquet tables because finding the schema of the underlying Parquet table would involve checking all the files individually, which would be slow for a large Parquet table.

Read in the Parquet table to a DataFrame and inspect the contents.

```
spark.read.format("parquet").load("tmp/parquet_table1").show()

+----------+----+
|first_name| age|
+----------+----+
|   leonard|  51|
|       cat|null|
|       sal|null|
|       bob|  47|
|        li|  23|
+----------+----+
```

This isn’t a great result. PySpark has encountered two different schemas when reading the Parquet files and is only showing one of them. You’d need to manually set `mergeSchema` to `true` when reading the data to see all of the data.

```
spark.read.option("mergeSchema", "true").format("parquet").load(
    "tmp/parquet_table1"
).show()

+----------+----+--------------+
|first_name| age|favorite_color|
+----------+----+--------------+
|   leonard|  51|          null|
|       cat|null|          pink|
|       sal|null|           red|
|       bob|  47|          null|
|        li|  23|          null|
+----------+----+--------------+
```

Again, this isn’t PySpark’s fault. PySpark is providing the best default behavior possible given the schema-on-read limitations of Parquet tables.

Let’s look at how Delta Lake supports schema enforcement and provides better default behavior out of the box.

## Delta Lake schema enforcement is built-in

Let’s perform the same operations, but on a Delta Lake, and see how the default operations differ from Parquet. Start by creating a DataFrame and writing it out to a Delta table.

```
columns = ["first_name", "age"]
data = [("bob", 47), ("li", 23), ("leonard", 51)]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.format("delta").save("tmp/delta_table1")
```

Create another DataFrame with a different schema and attempt to append it to the existing Delta Table.

```
columns = ["first_name", "favorite_color"]
data = [("sal", "red"), ("cat", "pink")]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.mode("append").format("delta").save("tmp/delta_table1")
```

Here’s the error you’ll get:

```
AnalysisException: A schema mismatch detected when writing to the Delta table (Table ID: 1f0df7a5-dda6-494f-99bc-4732d455db0b).
To enable schema migration using DataFrameWriter or DataStreamWriter, please set:
'.option("mergeSchema", "true")'.
For other operations, set the session configuration
spark.databricks.delta.schema.autoMerge.enabled to "true". See the documentation
specific to the operation for details.

Table schema:
root
-- first_name: string (nullable = true)
-- age: long (nullable = true)

Data schema:
root
-- first_name: string (nullable = true)
-- favorite_color: string (nullable = true)
```

The error message gives you a descriptive explanation of why the operation failed and two different ways to enable writing data with mismatched schemas.

The default Delta Lake schema enforcement behavior is desirable. You don’t want to allow data with an unmatched schema to be added to a Delta table by default. You only want to allow for schema mismatches when the user explicitly states that’s what they want.

## Delta Lake write with mergeSchema set to true

You can append a DataFrame with a different schema to the Delta table by explicitly setting `mergeSchema` equal to true.

```
df.write.option("mergeSchema", "true").mode("append").format("delta").save(
    "tmp/delta_table1"
)
```

Read the Delta table and inspect the contents:

```
spark.read.format("delta").load("tmp/delta_table1").show()

+----------+----+--------------+
|first_name| age|favorite_color|
+----------+----+--------------+
|   leonard|  51|          null|
|       cat|null|          pink|
|       sal|null|           red|
|       bob|  47|          null|
|        li|  23|          null|
+----------+----+--------------+
```

Note that when reading the Delta table, you don’t need to set `mergeSchema` to `true` as you did when reading the Parquet table. When reading a Parquet table with files of different schemas, you need to manually set `mergeSchema` to `true`.

The Delta Lake default behavior is much better. Readers of the Parquet table need to somehow know they need to set `mergeSchema` to `true` when they read the Parquet table that contains files with different schemas, which is an unreasonable demand. Data professionals may be reading tens or hundreds of Parquet tables. They can’t be expected to keep track of when they need to set `mergeSchema` to `true` and when it’s not necessary.

## Delta Lake enable autoMerge to merge schemas by default

You can also set a Spark property that will enable `autoMerge` by default. Once this property is set, you don’t need to manually set `mergeSchema` to `true` when writing data with a different schema to a Delta table.

Here’s how to enable `autoMerge`:

```
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")
```

Create a DataFrame with another schema and write it to the existing Delta table.

```
columns = ["first_name", "country"]
data = [("bill", "usa"), ("xi", "china")]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.mode("append").format("delta").save("tmp/delta_table1")
```

Examine the contents of the Delta table and verify that the new data was properly appended.

```
spark.read.format("delta").load("tmp/delta_table1").show()

+----------+----+--------------+-------+
|first_name| age|favorite_color|country|
+----------+----+--------------+-------+
|   leonard|  51|          null|   null|
|       cat|null|          pink|   null|
|       sal|null|           red|   null|
|       bob|  47|          null|   null|
|      bill|null|          null|    usa|
|        xi|null|          null|  china|
|        li|  23|          null|   null|
+----------+----+--------------+-------+
```

We can see that the data was appended and we didn’t need to set `mergeSchema` to `true` when performing the write to the Delta table.

**But watch out!**

Take a close look at the property that enables `autoMerge` and notice that it’s specific to Delta Lake: <code>spark.databricks.<strong>delta</strong>.schema.autoMerge.enabled</code>.

This configuration property does not impact the Parquet reads. You still need to manually set `mergeSchema` to `true` when reading a Parquet table, as before, even after setting this property.

```
spark.read.option("mergeSchema", "true").format("parquet").load(
    "tmp/parquet_table1"
).show()
```

This example has demonstrated two important concepts. Let’s discuss them separately.

## Delta Lake schema enforcement vs schema evolution

Schema enforcement is a Delta Lake feature that prevents you from appending data with a different schema to a table unless you explicitly specify that the table should allow data with different schemas to be written. Parquet tables don’t support schema enforcement. Parquet users need to manually implement schema enforcement business logic as a pre-write check if they want to make sure data with a different schema doesn’t get written.

Schema evolution refers to the ability of a table to adapt to different schemas over time, typically by allowing for additional columns to be added. Our example has demonstrated schema evolution, but it’s an important topic, so we’ll cover it in more depth in a separate blog post.

## Delta Lake schema enforcement vs constraints

Schema enforcement refers to schema-level checks when data is appended to an existing table. It refers to the presence of certain columns and data types.

Delta Lake also supports [constraints](https://docs.delta.io/latest/delta-constraints.html), which are value-level checks when data is appended. You can add a constraint that will prevent you from adding `null` values to a given column for example.

Schema enforcement and constraints are related because they both check the quality of your data before writing, but they’re separate concepts. You’ll often want to apply both schema enforcement and constraints.

## Schema enforcement edge cases

This post covers the most common schema enforcement situation, but there are some edge cases that aren’t discussed. See [this blog post](https://www.databricks.com/blog/2019/09/24/diving-into-delta-lake-schema-enforcement-evolution.html) for more information about schema enforcement edge cases.

## Why bad writes can be hard to fix in Parquet tables

Bad writes are surprisingly hard to undo in Parquet tables. Suppose you perform a write operation with a mismatched schema to a partitioned Parquet table that’s stored in the cloud. The write operation outputs 500 files to different partitions.

It’s not easy to identify the 500 files that were written to the Parquet table. As a matter of fact, you won’t even know how many files were written when you’re trying to debug this.

Once you identify the 500 files to be deleted, you need to make sure your script to delete the bad data will not accidentally delete good data as well! Manually removing data is dangerous. A single misplaced glob string character could cause you to accidentally wipe out all your data.

Manually deleting data can also break downstream ETL pipeline automation too. It’s a dangerous operation that can create a change of ETL breakages.

Delta Lake provides versioned data and ACID transactions, so you don’t need to perform any Parquet table hotfixes. You can easily [rollback a Delta table to a prior version](https://delta.io/blog/2022-10-03-rollback-delta-lake-restore/) if you ever make a mistake.

## Schema enforcement for Parquet tables stored in Hive metastore

Up until now, we’ve just discussed Parquet files without associated Hive metastore entries. Parquet tables stored in Hive Metastore have completely different schema enforcement default behavior.

Let’s create a Parquet table in Hive Metastore and observe the schema enforcement defaults.

```
columns = ["first_name", "age"]
data = [("bob", 47), ("li", 23), ("leonard", 51)]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.format("parquet").saveAsTable("mystery_table")
```

Try to append some data with a different schema to the table.

```
columns = ["first_name", "favorite_color"]
data = [("sal", "red"), ("cat", "pink")]
rdd = spark.sparkContext.parallelize(data)
df = rdd.toDF(columns)

df.write.mode("append").format("parquet").saveAsTable("mystery_table")
```

The Parquet table does not allow for data with a different schema to be appended and throws this exception:

```
AnalysisException: cannot resolve 'age' given input columns: [first_name, favorite_color]
```

Parquet tables stored in Hive Metastore have schema enforcement built-in only if you are accessing it using the table name. If you forget to use the table name and use the path directly, you can bypass schema enforcement and mess up your table. It’s impossible to bypass the Delta Lake schema enforcement. In addition, you can’t set a config property or use `mergeSchema` to use a safe schema evolution for Parquet tables. `mergeSchema` is ignored when writing to a Parquet table:

```
df.write.option("mergeSchema", "true").mode("append").format("parquet").saveAsTable(
    "mystery_table"
)
```

Here’s the error that’s thrown:

```
AnalysisException: cannot resolve 'age' given input columns: [first_name, favorite_color]
```

The customizable schema enforcement offered by Delta Lake is better than the rigid schema enforcement of managed Parquet tables.

## Conclusion

Delta Lake is built with schema enforcement out of the box, which is a great way to protect the quality of your data table.

Parquet tables without Hive metastore information don’t have built-in schema enforcement, don’t allow for good merge schema defaults, and are hard to fix if a write operation goes wrong. Parquet tables stored in Hive metastore allow for schema enforcement, but it’s rigid and not as flexible as the schema enforcement offered by Delta Lake.

Schema enforcement is one of the many advantages Delta Lake offers compared to Parquet tables. You can easily [convert from Parquet to Delta Lake](https://delta.io/blog/2022-09-23-convert-parquet-to-delta/) and take advantage of these features for your workloads.
