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
    url: "https://github.com/delta-io/delta/issues/1307",
  },
  {
    label: "Community",
    url: "/community-page",
  },
  {
    label: "Docs",
    url: "https://docs.delta.io",
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
    url: "https://go.delta.io/slack",
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
    url: "/community-page",
    label: "Community",
  },
  {
    url: "/community/getting-help",
    label: "Getting Help",
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
    url: "https://github.com/delta-io/delta/issues/1307",
    label: "Roadmap",
  },
  {
    url: "/blog/",
    label: "Blogs",
  },
];

module.exports = {
  community,
  footer,
  learn,
  main,
  social,
};
