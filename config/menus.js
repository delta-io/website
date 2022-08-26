const main = [
  {
    label: "Sharing",
    url: "/sharing",
  },
  {
    label: "Integrations",
    url: "/integrations",
  },
  {
    label: "Learn",
    url: "/learn",
    submenu: [
      {
        label: "Getting Started",
        url: "/learn/getting-started",
      },
      {
        label: "Blogs",
        url: "/blog",
      },
      {
        label: "Tutorials",
        url: "/learn/tutorials/",
      },
      {
        label: "Videos",
        url: "/learn/videos/",
      },
    ],
  },
  {
    label: "Roadmap",
    url: "/roadmap",
  },
  {
    label: "Community",
    url: "/community",
    submenu: [
      {
        url: "/community/contributing",
        label: "Contributing",
      },
      {
        url: "/community/getting-help",
        label: "Getting Help",
      },
      {
        url: "/community/adoption",
        label: "Adoption",
      },
    ],
  },
  {
    label: "Docs",
    url: "/docs/spark",
  },
];

const social = [
  {
    label: "StackOverflow",
    url: "https://stackoverflow.com/questions/tagged/delta-lake",
    icon: "stackOverflow",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/DeltaLakeOSS",
    icon: "twitter",
  },
  {
    label: "Slack Group",
    url: "https://go.delta.io/delta-users",
    icon: "slack",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/deltalake",
    icon: "linkedin",
  },
];

const community = [
  {
    url: "/community/contributing",
    label: "Contributing",
  },
  {
    url: "/community/getting-help",
    label: "Getting Help",
  },
  {
    url: "/community/adoption",
    label: "Adoption",
  },
];

const learn = [
  {
    label: "Getting Started",
    url: "/learn/getting-started",
  },
  {
    label: "Blogs",
    url: "/blog",
  },
  {
    label: "Tutorials",
    url: "/learn/tutorials/",
  },
  {
    label: "Videos",
    url: "/learn/videos/",
  },
];

const footer = [
  {
    url: "/sharing/",
    label: "Sharing",
  },
  {
    url: "/integrations/",
    label: "Integrations",
  },
  {
    url: "/roadmap/",
    label: "Roadmap",
  },
  {
    url: "/blog/",
    label: "Blogs",
  },
];

const docs = [
  {
    label: "Apache Spark",
    url: "/docs/spark",
    items: [
      {
        label: "Introduction",
        url: "/docs/spark/delta-intro",
      },
      {
        label: "Quickstart",
        url: "/docs/spark/quick-start-oss",
      },
      {
        label: "Batch operations",
        url: "/docs/spark/batch",
      },
      {
        label: "Streaming operations",
        url: "/docs/spark/streaming",
      },
      {
        label: "Update operations",
        url: "/docs/spark/updates",
      },
      {
        label: "Utility operations",
        url: "/docs/spark/utilities",
      },
      {
        label: "Constraints",
        url: "/docs/spark/constraints",
      },
      {
        label: "Table Versioning Control",
        url: "/docs/spark/versioning-oss",
      },
      {
        label: "Delta Lake APIs",
        url: "/docs/spark/delta-apidoc",
      },
      {
        label: "Delta Column Mapping",
        url: "/docs/spark/delta-column-mapping",
      },
      {
        label: "Storage Configuration",
        url: "/docs/spark/delta-storage-oss",
      },
      {
        label: "Concurrency Control",
        url: "/docs/spark/concurrency-control",
      },
      {
        label: "Migration Guide",
        url: "/docs/spark/porting",
      },
      {
        label: "Best Practices",
        url: "/docs/spark/best-practices",
      },
      {
        label: "Frequently Asked Questions",
        url: "/docs/spark/delta-faq",
      },
      {
        label: "Releases",
        url: "/docs/spark/releases-oss",
      },
      {
        label: "Delta Lake Resources",
        url: "/docs/spark/delta-resources",
      },
    ],
  },
  {
    label: "Flink",
  },
  {
    label: "Presto",
  },
  {
    label: "Trino",
  },
  {
    label: "Hive",
  },
  {
    label: "Standalone",
  },
];

const utilities = [
  {
    label: "Removing Files",
    url: "/learn/utilities",
  },
];

module.exports = {
  utilities,
  community,
  footer,
  learn,
  main,
  social,
  docs,
};
