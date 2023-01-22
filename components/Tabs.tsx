import { Tabs as ChakraTabs, Tab as ChakraTab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";

const Tabs = (props: { children: React.ReactNode; variant?: string; color?: string }) => {
  return (
    <ChakraTabs variant="soft-rounded" color={"text"}>
      {props.children}
    </ChakraTabs>
  );
};

const Tab = (props: { children: React.ReactNode }) => {
  return <ChakraTab _selected={{ bg: "secondary", color: "text" }}>{props.children}</ChakraTab>;
};

Tabs.list = TabList;
Tabs.tab = Tab;
Tabs.panels = TabPanels;
Tabs.panel = TabPanel;

export default Tabs;
