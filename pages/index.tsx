import type { NextPage } from "next";
import { Text, Button, Box, Container } from "@chakra-ui/react";
import supabase from "../utils/supabase";
import Navbar from "../components/Navbar";
import { Search } from "../components/Search";
import { Card } from "../components/Card";

type TProps = {
  posts: object[];
  users: object[];
};

const Home: NextPage<TProps> = ({ posts, users }: TProps) => {
  console.log(posts);

  return (
    <Container maxW={"1100px"}>
      <Navbar />
      <Search />
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"}>
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        {JSON.stringify(posts)}
        {JSON.stringify(users)}
      </Box>
    </Container>
  );
};
export async function getStaticProps() {
  const { data: posts } = await supabase.from("posts");
  const { data: users } = await supabase.from("users_public_data");
  return {
    props: {
      posts,
      users,
    },
  };
}

export default Home;
