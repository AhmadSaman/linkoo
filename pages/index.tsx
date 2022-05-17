import type { NextPage } from "next";
import { Text, Button, Box, Container } from "@chakra-ui/react";
import supabase from "../utils/supabase";
import Navbar from "../components/Navbar";
const Home: NextPage = ({ posts }: any) => {
  return (
    <Container maxW={"1100px"}>
      <Navbar />
      <Text fontSize={"2xl"} color={"text"}>
        Ahmad Saman
      </Text>
      <Button>Button</Button>
      <Text color={"text"}>{JSON.stringify(posts, null, 2)}</Text>
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
