import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
const Navbar: React.FC = () => {
  return (
    <Flex paddingY={5} justifyContent={"space-between"} alignItems={"center"}>
      <Box
        display={"flex"}
        color={"text"}
        padding={"5px"}
        rounded={"md"}
        transition={".3s"}
        _hover={{
          backgroundColor: "white",
          rounded: "md",
          boxSizing: "border-box",
          cursor: "pointer",
          transform: "scale(.9)",
          color: "#222831",
        }}
      >
        <Image
          src=""
          rounded={"full"}
          height={"50px"}
          fallbackSrc="https://avatars.githubusercontent.com/u/55833403?v=4"
          alt="Profile Picture"
        />
        <Text
          textStyle={"title"}
          alignSelf={"center"}
          backgroundColor={"inherit"}
          marginLeft={"2"}
        >
          Ahmad Saman
        </Text>
      </Box>
      <Box width={{ md: "10%" }}>
        <Button
          width={"full"}
          bgColor={"secondary"}
          transition={".2s"}
          _hover={{ transform: "scale(0.9)" }}
        >
          <AiOutlinePlus
            style={{ backgroundColor: "inherit", color: "white" }}
            size={"30px"}
          />
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
