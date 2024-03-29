// There is problem with sizing and there is a scroll in the card

import React from "react";
import { Badge, Box, Flex, Image, Text, Avatar, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type TProps = {
  title: string;
  description: string;
  link: string;
  image: string;
  userName?: string;
  userImage?: string;
  tags: TTag;
  postTags: number[];
};
type TTag = {
  filter: any;
  id?: number;
  name?: string;
  created_at?: Date;
};

export const Card: React.FC<TProps> = ({ title, description, link, image, userName, userImage, tags, postTags }) => {
  const showTags = postTags.map((postId) => tags.filter((tagVal: TTag) => tagVal.id === postId)[0]);
  return (
    <NextLink href={link} passHref>
      <Box
        as={Link}
        isExternal
        width={["100%", "100%", "45%", "30%"]}
        display={"flex"}
        flexDir={"column"}
        margin={"3"}
        bgColor={"box"}
        rounded={"md"}
        overflow={"auto"}
        transition={"0.3s"}
        cursor={"pointer"}
        _hover={{ transform: "scale(0.9)" }}
        height={"450px"}
      >
        <Image
          src={image}
          alt="post"
          minWidth={"300px"}
          minHeight={"150px"}
          objectFit="cover"
          referrerPolicy="no-referrer"
        />

        <Box flex={"1"} display={"flex"} flexDir={"column"}>
          <Text fontWeight={"semibold"} color={"text"} padding={"3"}>
            {title}
          </Text>

          <Text fontSize={"sm"} color={"text"} paddingX={"3"}>
            {description.length > 200 ? description.slice(0, 200) + "..." : description}
          </Text>
          <Flex marginTop={"auto"} flexDirection={"column"}>
            <Flex marginY={"1"} flexWrap={"wrap"} padding={"3"}>
              {showTags?.map((tag: TTag) => (
                <Badge key={tag.id} margin={0.5}>
                  {tag.name}
                </Badge>
              ))}
            </Flex>
            <Flex padding={"3"}>
              <Avatar size={"xs"} src={userImage} name={userName} rounded={"full"} />
              <Text color={"text"} alignSelf={"center"} marginLeft={"2"} fontSize={"sm"}>
                {userName}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
};
