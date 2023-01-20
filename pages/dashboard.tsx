import React from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Container } from "@chakra-ui/react";
import useSWR from "swr";

import TabsComp from "../components/TabsComp";
import Header from "../components/DashboardHeader";
import axios from "axios";
import { NextPage } from "next";

const Dashboard: () => false | JSX.Element | null = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3000/api/dashboard/posts", (url) => axios.get(url));
  const user: User | null = useUser();
  console.log(data, isLoading);

  return (
    user &&
    !isLoading && (
      <Container maxW={"1100px"}>
        <Header />
        {!!data?.data.tags.length && !!data?.data.posts.length && (
          <TabsComp postTags={data?.data.tags} posts={data?.data.posts} />
        )}
      </Container>
    )
  );
};

export default Dashboard;
