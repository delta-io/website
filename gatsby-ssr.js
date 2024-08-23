const React = require("react");

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });

  setHeadComponents([
    // eslint-disable-next-line react/jsx-filename-extension
    <script
      key="plausible-script"
      defer
      data-domain="delta.io"
      src="https://plausible.io/js/script.js"
    />,
  ]);
};
