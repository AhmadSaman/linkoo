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
        transition={".3s"}
        _hover={{
          transform: "scale(1.1)",
          backgroundColor: "white",
        }}
      >
        <Input
          placeholder="Search..."
          backgroundColor={"box"}
          _hover={{
            outline: "none",
            backgroundColor: "inherit",
            color: "#222831",
          }}
          _active={{ outline: "none" }}
          _focus={{ outline: "none" }}
        />
      </InputGroup>
    </Box>
  );
};
