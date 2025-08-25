---
title: Delta Lake 1.1.0 Released
description: We are excited to announce the release of Delta Lake 1.1.0.
thumbnail: "./thumbnail.png"
author: scottsandre
publishedAt: 2021-12-03
---

We are excited to announce the release of [Delta Lake 1.1.0](https://github.com/delta-io/delta/releases/tag/v1.1.0) on [Apache Spark 3.2](https://spark.apache.org/releases/spark-release-3-2-0.html). Similar to Apache Spark™, we have released Maven artifacts for both Scala 2.12 and Scala 2.13. The key features in this release are as follows.

- **Performance improvements in MERGE operation**
  - On partitioned tables, MERGE operations will automatically [repartition the output data before writing to files](https://docs.delta.io/latest/delta-update.html#performance-tuning). This ensures better performance out-of-the-box for both the MERGE operation as well as subsequent read operations.
  - On very wide tables (e.g., 1000 columns), MERGE operation can be faster since it now [avoids quadratic complexity when resolving column names](https://github.com/delta-io/delta/commit/83780aeeadd67893ad69ed6481f7c6bce5be563c) in a table with ~1000 or more columns.

- **Support for passing Hadoop configurations via DataFrameReader/Writer options** - You can now set Hadoop FileSystem configurations (e.g., access credentials) via DataFrameReader/Writer options. Earlier the only way to pass such configurations was to set Spark session configuration which would set them to the same value for all reads and writes. Now you can set them to different values for each read and write. See the [documentation](https://docs.delta.io/1.1.0/delta-batch.html#dataframe-options) for more details.

- **Support for arbitrary expressions in`replaceWhere` DataFrameWriter option** - Instead of expressions only on partition columns, you can now use arbitrary expressions in the `replaceWhere` DataFrameWriter option. That is you can replace arbitrary data in a table directly with DataFrame writes. See the [documentation](https://docs.delta.io/1.1.0/delta-batch.html#dataframe-options) for more details.

- **Improvements to nested field resolution and schema evolution in MERGE operation on array of structs** - When applying the MERGE operation on a target table having a column typed as an array of nested structs, the nested columns between the source and target data are now resolved by name and not by position in the struct. This ensures structs in arrays have a consistent behavior with structs outside arrays. When automatic schema evolution is enabled for MERGE, nested columns in structs in arrays will follow the same evolution rules (e.g., column added if no column by the same name exists in the table) as columns in structs outside arrays. See the [documentation](https://docs.delta.io/1.1.0/delta-batch.html#dataframe-options) for more details.

- **Support for Generated Columns in MERGE operation** - You can now apply MERGE operations on tables having [Generated Columns](https://docs.delta.io/latest/delta-batch.html#use-generated-columns).

- **Fix for rare data corruption issue on GCS** - Experimental GCS support released in Delta Lake 1.0 has a rare bug that can lead to Delta tables being unreadable due to partially written transaction log files. This issue has now been fixed ([1](https://github.com/delta-io/delta/commit/7a3f1e8ec626e80880d524c2b897a969c8b4d63a), [2](https://github.com/delta-io/delta/commit/95e90763fd9f54df8880911b28b97b023a485d5f)).

- **Fix for the incorrect return object in Python `DeltaTable.convertToDelta()`** - This existing API [now returns](https://github.com/delta-io/delta/commit/c586f9a7374923867c36f61df4ed133725c8df2c) the correct Python object of type `delta.tables.DeltaTable` instead of an incorrectly-typed, and therefore unusable object.

- **Python type annotations** - We have added Python type annotations which improve auto-completion performance in editors which support type hints. Optionally, you can enable static checking through [mypy](http://mypy-lang.org/) or built-in tools (for example Pycharm tools).

- **Other notable changes**
  - Removed support to read tables with certain special characters in partition column name. See [migration guide](https://docs.delta.io/1.1.0/porting.html#delta-lake-1-0-and-below-to-1-1-and-above) for details.
  - [Support](https://github.com/delta-io/delta/commit/1470e33f3f728a1670a77da63f3fb78780c30873) for “delta.\`path\`” in `DeltaTable.forName()` for consistency with other APIs
  - Improvements to [DeltaTableBuilder API](https://docs.delta.io/1.1.0/delta-batch.html#create-a-table) introduced in Delta 1.0.0
    - [Fix](https://github.com/delta-io/delta/commit/59aa330c403f8a71b3eef0e90bd61cd54aab108c) for bug that prevented passing of multiple partition columns in Python `DeltaTableBuilder.partitionBy`.
    - [Throw error](https://github.com/delta-io/delta/commit/104e2a472b5a0a5c718c42ac14ac8b851a1a7fe8) when column data type is not specified.
  - Improved [support](https://github.com/delta-io/delta/commit/83277eb30c0834bd837d9658864261fc31d366f6) for MERGE/UPDATE/DELETE on temp views.
  - [Support](https://github.com/delta-io/delta/commit/a2722f8b17369a47dd8d23696fc4958f022bb496) for setting `userMetadata` in the commit information when creating or replacing tables.
  - [Fix](https://github.com/delta-io/delta/commit/4e1c53c6984ba7d56fd2a0d9fe27ac2573df27ea) for an incorrect analysis exception in MERGE with multiple INSERT and UPDATE clauses and automatic schema evolution enabled.
  - [Fix](https://github.com/delta-io/delta/commit/4359484368b4a06c32b663826ac60bf12d9e8025) for incorrect handling of special characters (e.g. spaces) in paths by MERGE/UPDATE/DELETE operations.
  - [Fix](https://github.com/delta-io/delta/commit/7f46e91cf0950e437ffbce93d8a5925ebd0a3991) for Vacuum parallel mode from being affected by the Adaptive Query Execution enabled by default in Apache Spark 3.2.
  - [Fix](https://github.com/delta-io/delta/commit/4243bccbe397e0f47dc36b525f14983d57bbc848) for earliest valid time travel version.
  - [Fix](https://github.com/delta-io/delta/commit/43d14226cc802d721d1683495cdc8511acf460a1) for Hadoop configurations not being used to write checkpoints.
  - Multiple fixes ([1](https://github.com/delta-io/delta/commit/83780aeeadd67893ad69ed6481f7c6bce5be563c), [2](https://github.com/delta-io/delta/commit/685820b66ec42de7ef8f8a61ef3fd0fcfb702a70), [3](https://github.com/delta-io/delta/commit/db113dab3db5bdc371f3d49734e26a7403372c24)) to Delta Constraints.

#### Credits

Abhishek Somani, Adam Binford, Alex Jing, Alexandre Lopes, Allison Portis, Bogdan Raducanu, Bart Samwel, Burak Yavuz, David Lewis, Eunjin Song, Feng Zhu, Flavio Cruz, Florian Valeye, Fred Liu, Guy Khazma, Jacek Laskowski, Jackie Zhang, Jarred Parrett, JassAbidi, Jose Torres, Junlin Zeng, Junyong Lee, KamCheung Ting, Karen Feng, Lars Kroll, Li Zhang, Linhong Liu, Liwen Sun, Maciej, Max Gekk, Meng Tong, Prakhar Jain, Pranav Anand, Rahul Mahadev, Ryan Johnson, Sabir Akhadov, Scott Sandre, Shixiong Zhu, Shuting Zhang, Tathagata Das, Terry Kim, Tom Lynch, Vijayan Prabhakaran, Vítor Mussa, Wenchen Fan, Yaohua Zhao, Yijia Cui, YuXuan Tay, Yuchen Huo, Yuhong Chen, Yuming Wang, Yuyuan Tang, Zach Schuermann, ericfchang, gurunath

Visit the [release notes](https://github.com/delta-io/delta/releases/tag/v1.1.0) to learn more about the release.
