import type { NextPage } from "next";
import { Box, Container, Spinner } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";

import { Card } from "../components/Card";
import Navbar from "../components/Navbar";
// import { Search } from "../components/Search";

type TUserInfo = {
  name: string;
  avatar: string;
};
type TMap = {
  approved: true;
  tags: number[];
  title: string;
  created_at: string;
  description: string;
  link: string;
  image: string;
  userInfo: TUserInfo;
  id: number;
};

const Home: NextPage = () => {
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_URL}api`, (url) => axios.get(url));

  return (
    <Container maxW={"1100px"}>
      <Navbar tags={data?.data.tags} />
      {/* TODO: Search Feature will be improved in the future 🤙 */}
      {/* <Search serverPosts={serverPosts} updatePosts={setPosts} /> */}
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"} minH={"60vh"}>
        {isLoading ? (
          <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="secondary" color="box" alignSelf={"center"} />
        ) : (
          data?.data.posts?.map((value: TMap) => (
            <Card
              key={value.link}
              title={value.title}
              image={value.image}
              description={value.description}
              link={value.link}
              userName={value.userInfo?.name}
              userImage={value.userInfo?.avatar}
              tags={data?.data.tags}
              postTags={value.tags}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Home;
