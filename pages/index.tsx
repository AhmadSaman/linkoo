import type { NextPage } from "next";
import { Text, Button, Box } from "@chakra-ui/react";
import supabase from "../utils/supabase";
const Home: NextPage = ({ posts }: any) => {
  return (
    <Box>
      <Text fontSize={"2xl"} color={"text"}>
        Ahmad Saman
      </Text>
      <Button>Button</Button>
      <Text color={"text"}>{JSON.stringify(posts, null, 2)}</Text>
    </Box>
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
