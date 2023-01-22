import React from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import useSWR from "swr";

import TabsComp from "../components/TabsComp";
import Header from "../components/Header";
import axios from "axios";

const Dashboard: () => false | JSX.Element | null = () => {
  const { data, error, isLoading } = useSWR("api/user/posts", (url) => axios.get(url));
  const user: User | null = useUser();
  return (
    <Container maxW={"1100px"}>
      {user && !isLoading ? (
        <>
          <Header />
          {!!data?.data.tags.length && !!data?.data.posts.length && (
            <TabsComp postTags={data?.data.tags} posts={data?.data.posts} />
          )}
        </>
      ) : (
        <Flex justifyContent={"space-around"} minH={"60vh"}>
          <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="secondary" color="box" alignSelf={"center"} />
        </Flex>
      )}
    </Container>
  );
};

export default Dashboard;
