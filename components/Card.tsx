import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

export const Card: React.FC = () => {
  return (
    <Box
      backgroundColor={""}
      width={["100%", "100%", "33%", "25%"]}
      bgColor={"box"}
      rounded={"md"}
      overflow={"auto"}
      transition={"0.3s"}
      cursor={"pointer"}
      _hover={{ transform: "scale(0.9)" }}
    >
      <Image
        src="https://img-c.udemycdn.com/course/480x270/927356_8108_6.jpg"
        alt="post"
        width={"full"}
      />
      <Box backgroundColor={"inherit"}>
        <Text
          fontWeight={"semibold"}
          color={"text"}
          backgroundColor={"inherit"}
          padding={"3"}
        >
          Adobe Photoshop CC: A Beginner to Advanced Photoshop Course
        </Text>
        <Text
          fontSize={"sm"}
          color={"text"}
          padding={"3"}
          backgroundColor={"inherit"}
        >
          You can learn Adobe Photoshop CC. Graphic Design, Photo Editing \u0026
          Retouching, Learn it all with this Photoshop class.
        </Text>
      </Box>
    </Box>
  );
};
