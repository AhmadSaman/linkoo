import { useState } from "react";
import type { NextPage } from "next";
import { Box, Container } from "@chakra-ui/react";

import { Card } from "../components/Card";
import Navbar from "../components/Navbar";
import { Search } from "../components/Search";
import axios from "axios";
import useSWR from "swr";

type TProps = {
  serverPosts: object[];
  tags: object[];
};
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

const Home: NextPage<TProps> = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3000/api/index_page", (url) => axios.get(url));
  // const [posts, setPosts] = useState(serverPosts);

  return (
    <Container maxW={"1100px"}>
      <Navbar tags={data?.data.tags} />
      {/* TODO: Search Feature will be improved in the future 🤙 */}
      {/* <Search serverPosts={serverPosts} updatePosts={setPosts} /> */}
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
        {data?.data.serverPosts?.map((value) => {
          const { title, image, link, description, userInfo, tags: postTags } = value as TMap;

          return (
            <Card
              key={link}
              title={title}
              image={image}
              description={description}
              link={link}
              userName={userInfo?.name}
              userImage={userInfo?.avatar}
              tags={data?.data.tags}
              postTags={postTags}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Home;
