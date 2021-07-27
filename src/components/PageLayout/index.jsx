import * as React from "react";
import PageHeader from "./PageHeader";

const PageLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <PageHeader />
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
