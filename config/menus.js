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

module.exports = {
  community,
  footer,
  learn,
  main,
  social,
};
