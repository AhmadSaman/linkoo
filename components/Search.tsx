import React from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSearchAlt2 } from "react-icons/bi";
export const Search: React.FC = () => {
  return (
    <Box width={["100%", "90", "60%"]} marginX={"auto"} marginY={"10"}>
      <InputGroup
        backgroundColor={"box"}
        outline={"none"}
        borderColor={"box"}
        rounded={"md"}
        color={"text"}
      >
        <InputLeftElement
          pointerEvents="none"
          backgroundColor={"box"}
          rounded={"md"}
        >
          <BiSearchAlt2 size={"25px"} style={{ backgroundColor: "#393E46" }} />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          backgroundColor={"box"}
          _hover={{ outline: "none" }}
          _active={{ outline: "none" }}
          _focus={{ outline: "none" }}
        />
      </InputGroup>
    </Box>
  );
};
