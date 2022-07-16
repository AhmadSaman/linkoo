import type { NextPage } from "next";
import { Text, Button, Box, Container } from "@chakra-ui/react";
import supabase from "../utils/supabase";
import Navbar from "../components/Navbar";
import { Search } from "../components/Search";
import { Card } from "../components/Card";

type TProps = {
  posts: object[];
};

const Home: NextPage<TProps> = ({ posts }: TProps) => {
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
      </Box>
    </Container>
  );
};
export async function getStaticProps() {
  const { data: posts, error } = await supabase.from("posts").select("*");
  return {
    props: {
      posts,
    },
  };
}

export default Home;
