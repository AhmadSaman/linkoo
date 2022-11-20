import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Flex, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import LinkNext from "next/link";
import { NextRouter, useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "../components/Card";

export async function getServerSideProps(ctx: any) {
  const supabase = createServerSupabaseClient(ctx);
  let userData: any[] | null = [];
  let tags: any[] | null = [];
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await supabase.from("posts").select("*").in("userId", [session?.user.id]);
    const { data: tag } = await supabase.from("tags").select("*");
    userData = data;
    tags = tag;
  }

  return {
    props: {
      userData,
      tags,
    },
  };
}

const Dashboard: React.FC = ({ userData, tags }) => {
  const user: User | null = useUser();

  return (
    user && (
      <Container maxW={"1100px"}>
        <Header />
        {!!tags.length && !!userData.length && <TabComp postTags={tags} posts={userData} />}
      </Container>
    )
  );
};

const Header: React.FC = () => {
  const router: NextRouter = useRouter();
  const supabaseClient = useSupabaseClient();
  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.back();
  };

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
          <Link display={"flex"} alignItems={"center"} _active={{ border: "none" }} _focus={{ border: "none" }}>
            <IoMdArrowRoundBack />
          </Link>
        </LinkNext>
      </Box>
      <Text
        fontSize={["md", "md", "lg", "4xl"]}
        marginLeft={"5"}
        color={"text"}
        alignSelf={"center"}
        fontWeight={"bold"}
      >
        Your Dashboard
      </Text>
      <Button marginLeft={"auto"} alignSelf={"center"} colorScheme={"red"} onClick={handleSignOut}>
        Logout
      </Button>
    </Flex>
  );
};

const TabComp: React.FC = ({ postTags, posts }: any) => {
  const supabase = useSupabaseClient();
  const [unApprovedPosts, setUnApprovedPosts] = useState([]);
  const [user, setUser] = useState([]);
  const handelAcceptAll = async () => {
    await supabase.from("posts").update({ approved: true }).is("approved", false);
  };
  const getAdminPanelPosts = useCallback(async () => {
    const { data } = await supabase.from("posts").select("*").in("approved", [false]);
    const {
      data: [userAdmin],
    } = await supabase.from("users_public_data").select("*").eq("role", "ADMIN");
    setUnApprovedPosts(data);
    setUser(userAdmin);
  }, []);

  useEffect(() => {
    getAdminPanelPosts();
  }, []);

  return (
    <Tabs variant="soft-rounded" color={"text"}>
      <TabList>
        <Tab _selected={{ bg: "secondary", color: "text" }}>Posts</Tab>
        <Tab _selected={{ bg: "secondary", color: "text" }}>Pending</Tab>
        {user.role === "ADMIN" && <Tab _selected={{ bg: "secondary", color: "text" }}>Admin</Tab>}
      </TabList>
      <TabPanels>
        <TabPanel>
          {" "}
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {posts?.map((value) => {
              const { title, image, link, description, userInfo, tags, approved } = value;

              return (
                approved && (
                  <Card
                    key={link}
                    title={title}
                    image={image}
                    description={description}
                    link={link}
                    userName={userInfo?.name}
                    userImage={userInfo?.avatar}
                    tags={postTags}
                    postTags={tags}
                  />
                )
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel>
          {" "}
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {posts?.map((value) => {
              const { title, image, link, description, userInfo, tags, approved } = value;

              return (
                !approved && (
                  <Card
                    key={link}
                    title={title}
                    image={image}
                    description={description}
                    link={link}
                    userName={userInfo?.name}
                    userImage={userInfo?.avatar}
                    tags={postTags}
                    postTags={tags}
                  />
                )
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel>
          <Button
            onClick={handelAcceptAll}
            width={"full"}
            bgColor={"secondary"}
            transition={".2s"}
            _hover={{ transform: "scale(0.9)" }}
          >
            Accept All
          </Button>
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {unApprovedPosts?.map((value) => {
              const { title, image, link, description, userInfo, tags } = value;

              return (
                <Card
                  key={link}
                  title={title}
                  image={image}
                  description={description}
                  link={link}
                  userName={userInfo?.name}
                  userImage={userInfo?.avatar}
                  tags={postTags}
                  postTags={tags}
                />
              );
            })}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
