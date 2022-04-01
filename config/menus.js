const main = [
  {
    label: "Sharing",
    url: "/sharing",
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
        url: "/community",
        label: "The Delta Community",
      },
      {
        url: "/community/contributors",
        label: "Contributors",
      },
      {
        url: "/community/adoption",
        label: "Adoption",
      },
      {
        url: "/community/meetings",
        label: "Meetings  ",
      },
    ],
  },
  {
    label: "Contribute",
    submenu: [
      {
        url: "/community/contributing",
        label: "Contributing",
      },
      {
        url: "/community/contributing-to-docs",
        label: "Contributing to Documentation",
      },
      {
        url: "/community/getting-help",
        label: "Getting Help",
      },
    ],
  },
  {
    label: "Docs",
    submenu: [
      { label: "Delta Docs", url: "https://docs.delta.io" },
      {
        label: "Integrations",
        url: "/integrations",
      },
    ],
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
    url: "https://dbricks.co/delta-users-slack",
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

module.exports = {
  community,
  footer,
  learn,
  main,
  social,
};
