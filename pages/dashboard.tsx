import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import LinkNext from "next/link";

const dashboard = () => {
  return (
    <Container maxW={"1100px"}>
      <Header />
      <TabComp />
    </Container>
  );
};

const Header: React.FC = () => {
  return (
    <Flex paddingY={5}>
      <Box
        backgroundColor={"text"}
        width={"40px"}
        height={"40px"}
        rounded={"full"}
        alignSelf={"center"}
        display={"flex"}
        justifyContent={"center"}
        transition={".3s"}
        _hover={{
          transform: "scale(.9)",
          cursor: "pointer",
        }}
      >
        <LinkNext href={"/"} passHref>
          <Link
            display={"flex"}
            alignItems={"center"}
            _active={{ border: "none" }}
            _focus={{ border: "none" }}
          >
            <IoMdArrowRoundBack />
          </Link>
        </LinkNext>
      </Box>
      <Text fontSize={"4xl"} marginLeft={"5"} color={"text"}>
        Your Dashboard
      </Text>
    </Flex>
  );
};

const TabComp: React.FC = () => {
  return (
    <Tabs variant="soft-rounded" color={"text"}>
      <TabList>
        <Tab _selected={{ bg: "secondary", color: "text" }}>Post</Tab>
        <Tab _selected={{ bg: "secondary", color: "text" }}>Pending</Tab>
      </TabList>
      <TabPanels>
        <TabPanel> Posted </TabPanel>
        <TabPanel>Pending</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default dashboard;
