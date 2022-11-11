import type { NextPage } from "next";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Search } from "../components/Search";
import { Card } from "../components/Card";
import { getPosts, getTags } from "../apis/apis";
import { useState } from "react";

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

const Home: NextPage<TProps> = ({ serverPosts, tags }: TProps) => {
  const [posts, setPosts] = useState(serverPosts);

  return (
    <Container maxW={"1100px"}>
      <Navbar tags={tags} />
      {/* TODO: Search Feature will be improved in the future 🤙 */}
      <Search serverPosts={serverPosts} updatePosts={setPosts} />
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
        {posts?.map((value) => {
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
              tags={tags}
              postTags={postTags}
            />
          );
        })}
      </Box>
    </Container>
  );
};
export async function getServerSideProps() {
  const { data: serverPosts } = await getPosts();
  const { data: tags } = await getTags();

  return {
    props: {
      serverPosts,
      tags,
    },
  };
}

export default Home;
