import React from "react";
import { Badge, Box, Flex, Image, Text, Avatar } from "@chakra-ui/react";

export const Card: React.FC = () => {
  return (
    <Box
      backgroundColor={""}
      width={["100%", "100%", "45%", "30%"]}
      margin={"3"}
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
          paddingX={"3"}
          backgroundColor={"inherit"}
        >
          You can learn Adobe Photoshop CC. Graphic Design, Photo Editing \u0026
          Retouching, Learn it all with this Photoshop class.
        </Text>
        <Flex
          backgroundColor={"inherit"}
          marginY={"1"}
          flexWrap={"wrap"}
          padding={"3"}
        >
          <Badge margin={0.5}>React</Badge>
          <Badge margin={0.5}>UI</Badge>
          <Badge margin={0.5}>Javascript</Badge>
        </Flex>
        <Flex padding={"3"} background={"inherit"}>
          <Avatar
            size={"xs"}
            src="https://avatars.githubusercontent.com/u/55833403?v=4"
            name={"ahmad Saman"}
            rounded={"full"}
          />
          <Text
            backgroundColor={"inherit"}
            color={"text"}
            alignSelf={"center"}
            marginLeft={"2"}
            fontSize={"sm"}
          >
            Ahmad Saman
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
