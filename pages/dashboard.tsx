import React from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Container } from "@chakra-ui/react";

import TabsComp from "../components/TabsComp";
import Header from "../components/DashboardHeader";

const Dashboard: React.FC = ({ userData, tags }: any) => {
  const user: User | null = useUser();

  return (
    user && (
      <Container maxW={"1100px"}>
        <Header />
        {!!tags.length && !!userData.length && <TabsComp postTags={tags} posts={userData} />}
      </Container>
    )
  );
};

export async function getServerSideProps(ctx: any) {
  const supabase = createServerSupabaseClient(ctx);
  let userData: any = [];
  let tags: any = [];
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data }: any = await supabase.from("posts").select("*").in("userId", [session?.user.id]);
    const { data: tag }: any = await supabase.from("tags").select("*");
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

export default Dashboard;
