---
title: Delta Lake replaceWhere
description: Selectively overriding rows or partitions of a Delta Lake table with replaceWhere.
thumbnail: "./thumbnail.png"
author: matthew-powers
publishedAt: 2023-12-18
---

This blog post explains how to use Delta Lake’s `replaceWhere` functionality to perform selective overwrites based on a filtering condition.

`replaceWhere` is a special case of Delta Lake’s [overwrite](https://docs.delta.io/latest/delta-batch.html#overwrite) function that lets you overwrite a subset of a table as follows:

```
(
    df.write.format("delta")
    .option("replaceWhere", "number > 2")
    .mode("overwrite")
    .save("tmp/my_data")
)
```

When you don’t specify `replaceWhere`, the overwrite save mode will replace the entire table. Instead of updating the entire table (which is costly!), you may want to overwrite only the specific parts of the table that should be changed. In this case, you can use a `replaceWhere` operation to overwrite only the relevant records or partitions.

Selectively overwriting can save you time and computational expense, especially if the table is partitioned efficiently.

This post will walk you through the most common use cases of `replaceWhere` with code examples. We’ll start with a simple example and then build up the complexity to see how `replaceWhere` can be applied to partitioned Delta tables. By the end, you will know when and how you can use `replaceWhere` to speed up your queries and selective override operations.

Let’s jump in 🪂

# Simple Delta Lake replaceWhere example

Let’s say we have some data stored in a Delta Lake on disk at `tmp/my_data`. The Delta table contains two columns `letter` and `number,` and the following rows of data:

```
+------+------+
|letter|number|
+------+------+
|     a|     1|
|     b|     2|
|     c|     3|
|     d|     4|
+------+------+
```

Suppose we’d like to update this table with the following DataFrame (`df2)`:

```
+------+------+
|letter|number|
+------+------+
|     x|     7|
|     y|     8|
|     z|     9|
+------+------+
```

Let’s say we are particularly attached to the records with `number &lt;= 2` and we absolutely need to preserve those records in the final table. The other records in `df1` can be replaced.

A regular overwrite operation wouldn’t work in this case. It would simply overwrite all the contents, and we would lose our precious `number &lt;= 2` records.

Instead, you can use` replaceWhere` to overwrite the rows of the Delta table with the contents of `df2` _only when the records match a certain condition_. In this case, that condition will be `number > 2`:

```
(
    df2.write.format("delta")
    .option("replaceWhere", "number > 2")
    .mode("overwrite")
    .save("tmp/my_data")
)
```

Reading the updated Delta Lake back in we can see that only the rows with `number > 2` have been overwritten.

```
spark.read.format("delta").load("tmp/my_data").show()

+------+------+
|letter|number|
+------+------+
|     a|     1|
|     b|     2|
|     x|     7|
|     y|     8|
|     z|     9|
+------+------+
```

This was a simple example to illustrate the basic concept of `replaceWhere`. Let’s look at a slightly more complex example to get closer to real-world applications.

# Delta Lake replaceWhere for partitioned tables

Let’s take this one step further to see what happens when you want to perform a selective overwrite on records stored across multiple partitions.

> This section uses Delta Lake >= 2.0; [see here](https://docs.delta.io/latest/delta-batch.html#overwrite) if you’re running a legacy version of Delta Lake.

Suppose you have a partitioned Delta table partitioned by `country` with the following data:

```
+----------+---------+---------+-------------+
|first_name|last_name|  country|    continent|
+----------+---------+---------+-------------+
|   Ernesto|  Guevara|Argentina|South America|
|  Wolfgang|   Manche|  Germany|       Europe|
|    Soraya|     Jala|  Germany|       Europe|
|   Jasmine| Terrywin| Thailand|         Asia|
|   Janneke|    Bosma|  Belgium|       Europe|
|     Hamed|   Snouba|  Lebanon|         Asia|
|     Bruce|      Lee|    China|         Asia|
|      Jack|       Ma|    China|         Asia|
+----------+---------+---------+-------------+
```

Now your manager has asked you to perform some basic data anonymization to preserve the privacy of the subjects in your dataset. You are again working towards a tight deadline, so you want to perform this only on the relevant records for your team: the records for which `continent = Asia`.

You define an anonymization function (that will hopefully be more difficult to crack than the one below 😀) to anonymize the last names:

```
from pyspark.sql.functions import translate

def anonymizeLastname(df):
    return df.withColumn('last_name', translate('last_name', 'aeiou', '12345'))
```

This algorithm uses the [translate](https://spark.apache.org/docs/3.1.1/api/python/reference/api/pyspark.sql.functions.translate.html) function to replace characters with their assigned counterparts. In this case, `a` is replaced with `1`, `e` with `2`, `i` with `3`, and so on. As stated earlier, this is not a secure anonymization algorithm, but clear enough for our demonstration.

Let’s run this function on all the records from `Asia` on a DataFrame to see how the function works in memory:

```
df.where(col("continent") == "Asia").transform(anonymizeLastname)
df.show()

+----------+---------+--------+---------+
|first_name|last_name| country|continent|
+----------+---------+--------+---------+
|   Jasmine| T2rryw3n|Thailand|     Asia|
|     Hamed|   Sn45b1| Lebanon|     Asia|
|     Bruce|      L22|   China|     Asia|
|      Jack|       M1|   China|     Asia|
+----------+---------+--------+---------+
```

Nice! The function was successfully applied to all the `Asia` records in memory.

Now let’s selectively overwrite these new records to disk. You can use `replaceWhere `to overwrite only the affected records (with `continent == 'Asia'`) even if they are stored across multiple `country` partitions:

```
(
    df.write.format("delta")
    .option("replaceWhere", "continent = 'Asia'")
    .mode("overwrite")
    .save(deltaPath)
)
```

Now let’s read the data back in to confirm:

```
spark.read.format("delta").load(deltaPath).show()

+----------+---------+---------+-------------+
|first_name|last_name|country  |continent    |
+----------+---------+---------+-------------+
|Ernesto   |Guevara  |Argentina|South America|
|Vladimir  |Putin    |Russia   |Europe       |
|Maria     |Sharapova|Russia   |Europe       |
|Jasmine   |T2rryw3n |Thailand |Asia         |
|Janneke   |Bosma    |Belgium  |Europe       |
|Hamed     |Sn45b1   |Lebanon  |Asia         |
|Bruce     |L22      |China    |Asia         |
|Jack      |M1       |China    |Asia         |
+----------+---------+---------+-------------+
```

Awesome, the `Asia` records have been successfully anonymized!

Let’s take at how this `replaceWhere` transaction was recorded in the Delta Lake transaction log to confirm only the Asian partitions have changed:

```
{
    "add": {
        "path": "country=Thailand/part-00000-90e36b14-623b-455b-917a-11a6063ecccb.c000.snappy.parquet",
        "partitionValues": {
            "country": "Thailand"
        },
        "size": 1032,
        "modificationTime": 1702406183349,
        "dataChange": true,
        "stats": "{\"numRecords\":1,\"minValues\":{\"first_name\":\"Jasmine\",\"last_name\":\"T2rryw3n\",\"continent\":\"Asia\"},\"maxValues\":{\"first_name\":\"Jasmine\",\"last_name\":\"T2rryw3n\",\"continent\":\"Asia\"},\"nullCount\":{\"first_name\":0,\"last_name\":0,\"continent\":0}}"
    }
}
{
    "add": {
        "path": "country=Lebanon/part-00001-e419556d-7d8d-4263-b6fd-915a4edff62b.c000.snappy.parquet",
        "partitionValues": {
            "country": "Lebanon"
        },
        "size": 1004,
        "modificationTime": 1702406183349,
        "dataChange": true,
        "stats": "{\"numRecords\":1,\"minValues\":{\"first_name\":\"Hamed\",\"last_name\":\"Sn45b1\",\"continent\":\"Asia\"},\"maxValues\":{\"first_name\":\"Hamed\",\"last_name\":\"Sn45b1\",\"continent\":\"Asia\"},\"nullCount\":{\"first_name\":0,\"last_name\":0,\"continent\":0}}"
    }
}
{
    "add": {
        "path": "country=China/part-00002-0a628002-85f9-450c-9340-4b01ef225e0e.c000.snappy.parquet",
        "partitionValues": {
            "country": "China"
        },
        "size": 1002,
        "modificationTime": 1702406183354,
        "dataChange": true,
        "stats": "{\"numRecords\":2,\"minValues\":{\"first_name\":\"Bruce\",\"last_name\":\"L22\",\"continent\":\"Asia\"},\"maxValues\":{\"first_name\":\"Jack\",\"last_name\":\"M1\",\"continent\":\"Asia\"},\"nullCount\":{\"first_name\":0,\"last_name\":0,\"continent\":0}}"
    }
}
{
    "remove": {
        "path": "country=Thailand/part-00005-1f073a57-dca5-4690-9f9c-ffebb5912b75.c000.snappy.parquet",
        "deletionTimestamp": 1702406182360,
        "dataChange": true,
        "extendedFileMetadata": true,
        "partitionValues": {
            "country": "Thailand"
        },
        "size": 1032
    }
}
{
    "remove": {
        "path": "country=Lebanon/part-00002-7594dbc1-85d4-4f08-980f-4a2e56420b3a.c000.snappy.parquet",
        "deletionTimestamp": 1702406182360,
        "dataChange": true,
        "extendedFileMetadata": true,
        "partitionValues": {
            "country": "Lebanon"
        },
        "size": 1004
    }
}
{
    "remove": {
        "path": "country=China/part-00000-e364c08a-1db9-4736-9fa6-c51b7b72caa2.c000.snappy.parquet",
        "deletionTimestamp": 1702406182360,
        "dataChange": true,
        "extendedFileMetadata": true,
        "partitionValues": {
            "country": "China"
        },
        "size": 1002
    }
}
```

Great, the logs confirm that only the partitions for the countries located in Asia – Thailand, Lebanon and China – have been edited by this `replaceWhere` operation.

You can imagine that if this were a large dataset you would have saved yourself some serious time and money by not having to rewrite all of the other partitions that were not affected by your change.

# replaceWhere vs. Dynamic Partitioning

[Dynamic partitioning](https://docs.delta.io/latest/delta-batch.html#dynamic-partition-overwrites) is another form of overwrite that will overwrite **all the existing data** in each partition for which the write will commit new data. It is only available for users working with Delta Lake 2.0 or above.

You can use dynamic partitioning by setting the `partitionOverwriteMode` to `dynamic` as part of your call to the `DataFrameWriter`:

```
(
    df.write.format("delta")
    .mode("overwrite")
    .option("partitionOverwriteMode", "dynamic")
    .saveAsTable("default.people10m")
)
```

When using dynamic partitioning, you’ll want to validate that data written with dynamic partitioning only touches the partitions you expect it to. If there’s accidentally a single row in an incorrect partition this can result in overwriting an entire partition that was meant to remain untouched.

It’s generally recommended to use `replaceWhere` to specify which data to overwrite. `replaceWhere` is a more precise functionality because it forces you to specify the filtering predicate.

# Conclusion

This blog post has shown you why and how you can use` replaceWhere` to selectively overwrite parts of your Delta table. You have worked through multiple examples of applying `replaceWhere` to make your data rewrites more efficient by only writing out the records that meet a certain predicate. You have applied` replaceWhere` across both unpartitioned and partitioned Delta tables and learned about the different use cases for `replaceWhere` vs. dynamic partitioning.
