import React from "react";
import { Badge, Box, Flex, Image, Text, Avatar } from "@chakra-ui/react";

type TProps = {
  title: string;
  description: string;
  link: string;
  image: string;
  userName: string;
  userImage: string;
};

export const Card: React.FC<TProps> = ({ title, description, link, image, userName, userImage }) => {
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
      <Image src={image} alt="post" width={"full"} />
      <Box backgroundColor={"inherit"}>
        <Text fontWeight={"semibold"} color={"text"} backgroundColor={"inherit"} padding={"3"}>
          {title}
        </Text>
        <Text fontSize={"sm"} color={"text"} paddingX={"3"} backgroundColor={"inherit"}>
          {description}
        </Text>
        <Flex backgroundColor={"inherit"} marginY={"1"} flexWrap={"wrap"} padding={"3"}>
          <Badge margin={0.5}>React</Badge>
          <Badge margin={0.5}>UI</Badge>
          <Badge margin={0.5}>Javascript</Badge>
        </Flex>
        <Flex padding={"3"} background={"inherit"}>
          <Avatar size={"xs"} src={userImage} name={userName} rounded={"full"} />
          <Text backgroundColor={"inherit"} color={"text"} alignSelf={"center"} marginLeft={"2"} fontSize={"sm"}>
            {userName}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
