import React from "react";
import { Box, Flex, Text, Button, Avatar } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
const Navbar: React.FC = () => {
  return (
    <Flex paddingY={5} justifyContent={"space-between"} alignItems={"center"}>
      <Box>
        <Button
          color={"text"}
          width={"full"}
          height={"full"}
          display={"flex"}
          padding={"5px"}
          rounded={"md"}
          backgroundColor={"inherit"}
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
          <Avatar
            src="https://avatars.githubusercontent.com/u/55833403?v=4"
            name="Ahmad Saman"
          />

          <Text
            textStyle={"title"}
            alignSelf={"center"}
            backgroundColor={"inherit"}
            marginLeft={"2"}
          >
            Ahmad Saman
          </Text>
        </Button>
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
