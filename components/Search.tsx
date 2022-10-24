import React, { useEffect, useState } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSearchAlt2 } from "react-icons/bi";
import { searchPost } from "../apis/apis";

interface TProps {
  serverPosts: object[];
  updatePosts: any;
}

export const Search: React.FC<TProps> = ({ serverPosts, updatePosts }: TProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  useEffect(() => {
    let timeout = setTimeout(async () => {
      if (searchValue.length) {
        const { data } = await searchPost(searchValue);
        updatePosts(data);
      } else {
        updatePosts(serverPosts);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue, updatePosts, serverPosts]);
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
          placeholder="Search..(this search is based on words like 'react' not letter like 'r')"
          backgroundColor={"box"}
          _hover={{
            outline: "none",
            backgroundColor: "inherit",
            color: "#222831",
          }}
          _active={{ outline: "none" }}
          _focus={{ outline: "none" }}
          onChange={handleSearch}
          value={searchValue}
        />
      </InputGroup>
    </Box>
  );
};
