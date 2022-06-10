import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import * as React from "react";

const CBCreateTable = ({ sql, python, scala, java }) => (
  <Tabs>
    <TabList>
      {!sql || <Tab>SQL</Tab>}
      {!python || <Tab>Python</Tab>}
      {!scala || <Tab>Scala</Tab>}
      {!java || <Tab>Java</Tab>}
    </TabList>

    {!sql || <TabPanel>{sql}</TabPanel>}
    {!python || <TabPanel>{python}</TabPanel>}
    {!scala || <TabPanel>{scala}</TabPanel>}
    {!java || <TabPanel>{java}</TabPanel>}
  </Tabs>
);

export { CBCreateTable };
