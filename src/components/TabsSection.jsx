import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SingleTab from "./SingleTab";
import { useState } from "react";
import "react-tabs/style/react-tabs.css";
export default function TabsSection() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>All</Tab>
          <Tab>On Site</Tab>
          <Tab>Part Time</Tab>
          <Tab>Remote</Tab>
          <Tab>Hybrid</Tab>
        </TabList>
        <TabPanel><SingleTab category={"all"} limit={"4"}/></TabPanel>
        <TabPanel><SingleTab category={"on site"} limit={"2"}/></TabPanel>
        <TabPanel><SingleTab category={"part time"} limit={"2"}/></TabPanel>
        <TabPanel><SingleTab category={"remote"} limit={"2"}/></TabPanel>
        <TabPanel><SingleTab category={"hybrid"} limit={"2"}/></TabPanel>
      </Tabs>
    </div>
  );
}
