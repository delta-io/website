---
title: Unifying the Data Lake and Data Warehouse with Robert Kossendey at claimsforce
description: How claimsforce leverages Delta Lake to power their data infrastructure
author: robert-kossendey
publishedAt: 2025-02-15
thumbnail: "./thumbnail.png"
---

In February 2023, [Denny Lee](https://linkedin.com/in/dennyglee) spoke with [Robert Kossendey](https://www.linkedin.com/in/kossendey/) of [claimsforce](https://en.claimsforce.com/) about the company’s recently completed transition from a data warehouse to a data lake using Delta Lake. Robert is the technical lead of the data team at claimsforce and responsible for their data architecture. Over the last five years, claimsforce has experimented with a variety of data architectures, but they ultimately chose Delta Lake as their open source storage framework. With Delta Lake, Robert explained, claimsforce has everything they need to reduce costs, maintain data correctness, and keep their customers happy – and the switch has made the data team’s job significantly easier.

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/2tsvgM8ECVk"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
></iframe>

## What is claimsforce?

claimsforce is a small tech startup based in Hamburg, Germany, that provides software for participants in the insurance market. As an example, suppose you have a water leak that causes damage in your home, so you need to make an insurance claim. If it’s large enough, a loss adjuster will have to come and assess the claim. claimsforce provides software for those adjustors, and also for the clerks and back office employees managing those. The startup collects a lot of data related to these claims from various parties, and needed to figure out how to process it efficiently and in compliance with local regulations. In Germany, paper documentation is still prevalent in the insurance industry, making it even more difficult to track and store all of the relevant information.

## Starting with a data warehouse

The initial approach to big data at claimsforce was a two-tier architecture consisting of a data lake stage in Amazon S3 and a data warehouse stage in Amazon Redshift. Over time, they realized that having two stages comes with disadvantages like increased engineering and maintenance effort, infrastructure costs, and data staleness. claimsforce is using DynamoDB as their production database, and to gain analytic insights they partnered with AWS Solutions Architects, developing a solution that consisted of capturing data change and writing it via AWS Kinesis Data Firehose to a raw landing zone in S3. They use glue crawlers to infer the schema, making the data queryable by AWS Athena, then loaded the data into Redshift for further processing. Queries were performed in Redshift, and the results were fed into their QuickSight dashboards.

## Problems with the initial setup

claimsforce’s two-stage approach had advantages and disadvantages. S3 storage is cheap, Athena uses a schema-on-read model, and the data lake supports all of their data formats, so all the photos, videos, and other documents could be dumped there. However, running queries on raw data, CSV, JSON, or even Parquet files with Athena took a long time, and they don’t support ACID transactions on data lakes. In addition, there was no way to perform SQL MERGE type operations. The initial users didn’t have the capabilities to move all of their workloads that were performed on top of Redshift to the data lake.

## Finding the lakehouse

In addition to all of these problems, new customer requirements were surfacing, like real-time data and ML services. Recognizing that their current architecture was not well adapted to their needs, claimsforce began to look for a new architecture solution. Data correctness is very important to their customers, so they knew support for ACID transactions was a must-have feature. In addition, compliance is a major concern in the insurance industry, so a transaction log and the ability to delete user data upon request (one of the rights granted by the GDPR) were key requirements. Vanilla data lakes do not support ACID transactions, so that was a no-go for claimsforce; they needed to have security mechanisms in place to prevent them from writing the same data once in one transaction. Their research led them to Delta Lake, which provided all the features they were looking for.

## Benefits of using Delta Lake

In addition to meeting all of their technical needs, for claimsforce, one of the biggest upsides of Delta Lake is cost reduction. The usage costs for Athena increased, but this was more than compensated for by the savings of moving away from Redshift. Using Delta Lake also meant they did not have to move their data from S3 to another storage system; it can all stay in S3. This cut down their ETL times, because loading the data into Redshift had always been the slowest part of their pipelines. Automatically reading data and aggregated tables loading times improved drastically, specifically for machine learning purposes. They found working with Athena and Delta Lake to be very easy to set up and to be very fast. With their current setup, claimsforce is confident they’ll be able to scale to meet any future business needs.

> “We don't have the data that a big Fortune 500 company has, but it seems like we can scale indefinitely with our current setup, at least for now. We are now completely future proof. It's great.”

claimsforce needed a reliable, open source storage framework that would enable them to build a [Lakehouse architecture](https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf) to cut costs, save time, and simplify their workflows. Transitioning from a data warehouse to a Lakehouse architecture with Delta Lake provided them with exactly the solution they were looking for, and they’ve found the Spark integration to be top-notch and the fast-growing open source community a huge plus.

Check out Robert’s latest blog posts about Delta Lake:

- [Lakehouse — The journey unifying Data Lake and Data Warehouse](https://medium.com/claimsforce/lakehouse-the-journey-unifying-data-lake-and-data-warehouse-bef7629c143a)
- [Lakehouse — Running Delta Lake on AWS Glue](https://medium.com/claimsforce/lakehouse-running-delta-lake-on-top-of-aws-glue-181133a916f3)
