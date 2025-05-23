---
title: "Structured Spark Streaming with Delta Lake: A Comprehensive Guide"
description: The webinar demonstrates how to embrace structured streaming seamlessly from data emission to your final Delta table destination.
thumbnail: "./thumb.png"
author:
  - delta-lake
publishedAt: 2024-04-10
---

In March 2024, [Scott Haines](https://www.linkedin.com/in/scotthaines/) from Nike and [Bartosz Konieczny](https://www.linkedin.com/in/bartosz-konieczny-waitingforcode/), Freelance Data Engineer, delivered an excellent presentation on streaming Delta Lake with Apache Spark structured streaming. The webinar demonstrates how to embrace structured streaming seamlessly from data emission to your final Delta table destination.

In this blog post based on the hour-long webinar, you'll learn how to leverage Apache Spark Structured Streaming to process Delta Lake tables. This includes enabling strict schema enforcement, utilizing auto-merge for trusted upstream changes, and knowing when to adopt a defensive stance to maintain schema integrity.

You can watch the [full video,](https://www.youtube.com/live/Earw_BTbWxo?si=za3XzsEVpAEFbdyB) and view the [webinar slides](https://docs.google.com/presentation/d/13vTjERq6hZ-TdPnMeCdQGHpns3dT32jilp79cyo9Yic/mobilepresent?slide=id.g35f391192_029).

Here’s a summary and high-level overview of their talk.

## Part 1: Introduction to Structured Streaming

In the realm of data processing, embracing structured streaming as a core component throughout your pipeline is essential. From the initial data emission to its journey through your network and eventually landing in your Delta table destination, understanding the nuances of Structured Streaming can significantly enhance your data workflows.

One pivotal aspect to grasp is the importance of schema within your Delta tables. This includes strict schema enforcement, leveraging auto-merge functionalities for trusted upstream changes, and knowing when to maintain a rigid schema stance defensively.

## Reader and Writer APIs Demystified

Apache Spark streams, particularly when combined with Delta tables, offer powerful capabilities, including time-travel features. However, diving into streaming pipelines with Structured Streaming can seem daunting at first.

Let's break it down into two parts: a beginner-friendly overview and a more in-depth discussion. We'll start by exploring the basics of reader and writer APIs, along with common customer objectives. Later, we'll delve into complex topics such as schema enforcement and evolution, simplifying them for better understanding.

## Understanding Delta Table Streaming

Streaming a Delta table involves two primary components: the table itself and the steps involved in interacting with it using the Structured Streaming API. It begins with initializing the Spark source and fetching the latest snapshot for schema purposes. From there, defining your starting point, whether by versioning, timestamping, or defaulting to the latest version, is crucial.

When determining the microbatch size, you have several options available, such as setting it based on bytes or maximum files. However, it's crucial to grasp that the maximum bytes option functions as a threshold, rather than an exact figure. Additionally, the default selection for this rate limit option is 1000 files.

Transitioning from traditional streaming broker systems to Delta Lake streaming may reveal differences in how updates are handled. Unlike changelog-based systems like Kafka, Delta Lake by default provides the latest version of each row when starting the streaming query without specifying the starting version. That way you can see the most recent _snapshot_ of the table.

## Navigating Complexities: Schema Validation and Evolution

As we delve deeper, we encounter intricacies such as schema validation and evolution. Additive and non-additive schemas play a crucial role here. If your schema isn't compatible, your query won't start. Even if the schema change is additive, which by definition is a retro-compatible evolution, the streaming query will stop and ask you for resuming it to avoid an eventual schema change propagation.

Checkpoint locations and files may introduce naming conventions that reference the reservoir, stemming from Delta Lake's early stages, and referring to Delta tables today. Understanding these conventions, along with starting versions and in-place operations, is essential for effective query initiation and processing.

## Writing and Schema Evolution

Moving on to the writing aspect, while relatively simpler compared to reading, it involves tracking created data files and writing them as a part of the commit file. Idempotent writing becomes crucial when writing into multiple Delta tables from a single data frame, ensuring writes occur only once even in case of retries. This concept is essential for data integrity and efficient data pipeline management.

## Part 2: Schema Evolution and Data Trust

Transitioning from simple to complex aspects of Delta Lake's APIs reveals the intricate processes underlying data management. However, these complexities often boil down to people's expectations and constraints. Collaborating effectively with stakeholders is crucial for smooth data operations.

Data pipelines are ultimately designed to support data products, and building trust is paramount for scalability. Delta Lake offers features like multiversion concurrency control to ensure smooth transitions and foster trust among data engineers.

Understanding dataset ownership, update frequency, and data integrity mechanisms is essential for building trust. Comprehensive table metadata, including descriptive information and organizational details, enhances understanding and collaboration among teams.

## Backfilling Data and Considering Implications

When backfilling data in a streaming table due to schema changes, there's no one-size-fits-all approach. It largely depends on the specific use case and requirements. Communication between teams is essential to ensure everyone is aware of the changes and their implications.

In conclusion, mastering Structured Streaming with Delta Lake requires a deep understanding of reader and writer APIs, schema evolution, and data trust mechanisms. By embracing these concepts and best practices, organizations can streamline data workflows, ensure data reliability, and foster collaboration across teams.
