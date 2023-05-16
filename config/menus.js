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
      {
        label: "User Stories",
        url: "/user-stories",
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
    label: "GitHub",
    url: "https://go.delta.io/github",
    icon: "github",
  },
  {
    label: "Twitter",
    url: "https://go.delta.io/twitter",
    icon: "twitter",
  },
  {
    label: "Slack",
    url: "https://go.delta.io/slack",
    icon: "slack",
  },
  {
    label: "LinkedIn",
    url: "https://go.delta.io/linkedin",
    icon: "linkedin",
  },
];

const community = [
  {
    url: "/community",
    label: "Community",
  },
  {
    url: "/resources/getting-help",
    label: "Getting Help",
  },
  {
    url: "/resources/contributing-to-delta",
    label: "Contributing to Delta",
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
  {
    label: "User Stories",
    url: "/user-stories",
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
    url: "/roadmap",
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
