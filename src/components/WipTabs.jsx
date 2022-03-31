import * as React from "react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const Examples = ({ pyspark, pandas }) => (
  <Tabs forceRenderTabPanel>
    <TabList>
      <div style={{ display: "inline-block", width: "6ch" }}>API:</div>
      <Tab>PySpark API</Tab>
      <Tab>PySpark Pandas API</Tab>
    </TabList>
    <TabPanel>{pyspark}</TabPanel>
    <TabPanel>{pandas}</TabPanel>
  </Tabs>
);

const Environments = ({ tabIndexEnv, setTabIndexEnv, P, S }) => (
  <Tabs
    forceRenderTabPanel
    selectedIndex={tabIndexEnv}
    onSelect={(index) => setTabIndexEnv(index)}
  >
    <TabList>
      <div style={{ display: "inline-block", width: "18ch" }}>Environment:</div>
      <Tab>Python</Tab>
      <Tab>PySpark Shell</Tab>
    </TabList>
    <TabPanel>{P}</TabPanel>
    <TabPanel>{S}</TabPanel>
  </Tabs>
);

const Packages = ({
  tabIndexPkgs,
  setTabIndexPkgs,
  tabIndexEnv,
  setTabIndexEnv,
  PS,
  PP,
  DS,
  DP,
}) => (
  <Tabs
    forceRenderTabPanel
    selectedIndex={tabIndexPkgs}
    onSelect={(index) => setTabIndexPkgs(index)}
  >
    <TabList>
      <div style={{ display: "inline-block", width: "18ch" }}>
        Python Packages:
      </div>
      <Tab>pyspark</Tab>
      <Tab>pyspark & spark-delta</Tab>
    </TabList>
    <TabPanel>
      <Environments
        tabIndexEnv={tabIndexEnv}
        setTabIndexEnv={setTabIndexEnv}
        P={PP}
        S={PS}
      />
    </TabPanel>
    <TabPanel>
      <Environments
        tabIndexEnv={tabIndexEnv}
        setTabIndexEnv={setTabIndexEnv}
        P={DP}
        S={DS}
      />
    </TabPanel>
  </Tabs>
);

const Managers = ({
  tabIndexPkgMan,
  setTabIndexPkgMan,
  tabIndexPkgs,
  setTabIndexPkgs,
  tabIndexEnv,
  setTabIndexEnv,
  pipPS,
  pipPP,
  pipDS,
  pipDP,
  condaPS,
  condaPP,
  condaDS,
  condaDP,
}) => (
  <Tabs
    forceRenderTabPanel
    selectedIndex={tabIndexPkgMan}
    onSelect={(index) => setTabIndexPkgMan(index)}
  >
    <TabList>
      <div style={{ display: "inline-block", width: "18ch" }}>
        Package Manager:
      </div>
      <Tab>pip</Tab>
      <Tab>conda</Tab>
    </TabList>
    <TabPanel>
      <Packages
        tabIndexPkgs={tabIndexPkgs}
        setTabIndexPkgs={setTabIndexPkgs}
        tabIndexEnv={tabIndexEnv}
        setTabIndexEnv={setTabIndexEnv}
        PS={pipPS}
        PP={pipPP}
        DS={pipDS}
        DP={pipDP}
      />
    </TabPanel>
    <TabPanel>
      <Packages
        tabIndexPkgs={tabIndexPkgs}
        setTabIndexPkgs={setTabIndexPkgs}
        tabIndexEnv={tabIndexEnv}
        setTabIndexEnv={setTabIndexEnv}
        PS={condaPS}
        PP={condaPP}
        DS={condaDS}
        DP={condaDP}
      />
    </TabPanel>
  </Tabs>
);

export const TestTab = ({
  pipPS,
  pipPP,
  pipDS,
  pipDP,
  condaPS,
  condaPP,
  condaDS,
  condaDP,
}) => {
  const [tabIndexPkgMan, setTabIndexPkgMan] = useState(0);
  const [tabIndexPkgs, setTabIndexPkgs] = useState(0);
  const [tabIndexEnv, setTabIndexEnv] = useState(0);

  return (
    <Managers
      tabIndexPkgMan={tabIndexPkgMan}
      setTabIndexPkgMan={setTabIndexPkgMan}
      tabIndexPkgs={tabIndexPkgs}
      setTabIndexPkgs={setTabIndexPkgs}
      tabIndexEnv={tabIndexEnv}
      setTabIndexEnv={setTabIndexEnv}
      pipPS={pipPS}
      pipPP={pipPP}
      pipDS={pipDS}
      pipDP={pipDP}
      condaPS={condaPS}
      condaPP={condaPP}
      condaDS={condaDS}
      condaDP={condaDP}
    />
  );
};
