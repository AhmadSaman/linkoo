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
type TMap = {
  approved?: true;
  tags?: object;
  title: string;
  created_at?: string;
  description: string;
  link: string;
  img: string;
  user: string;
  id: number;
};

const Home: NextPage<TProps> = ({ posts }: TProps) => {
  console.log(posts);
  return (
    <Container maxW={"1100px"}>
      <Navbar />
      <Search />
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
        {posts?.map((value) => {
          const { title, img, link, description, userInfo } = value as TMap;
          return (
            <Card
              key={link}
              title={title}
              image={img}
              description={description}
              link={link}
              userName={userInfo?.name}
              userImage={userInfo?.avatar_url}
            />
          );
        })}
      </Box>
    </Container>
  );
};
export async function getStaticProps() {
  const { data: posts } = await supabase.from("posts");
  return {
    props: {
      posts,
    },
  };
}

export default Home;
