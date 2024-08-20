const React = require("react");

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });

  setHeadComponents([
    <script
      key="plausible-script"
      defer
      data-domain="delta.io"
      src="https://plausible.io/js/script.js"
    ></script>,
  ]);
};
