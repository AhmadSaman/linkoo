import { Box, Button } from "@chakra-ui/react";
import useSWR from "swr";

import Tabs from "./Tabs";
import { Card } from "./Card";
import axios from "axios";

const TabsComp: React.FC<any> = ({ postTags, posts }: any) => {
  const { data, error, isLoading } = useSWR("api/admin/posts", (url) => axios.get(url).then((data) => data));
  const handelAcceptAll = async () => {
    const { data } = await axios.post("http://localhost:3000/api/admin/acceptall");
    console.log(data);
  };

  return (
    <Tabs variant="soft-rounded" color={"text"}>
      <Tabs.list>
        <Tabs.tab>Posts</Tabs.tab>
        <Tabs.tab>Pending</Tabs.tab>
        {!!data?.data.data.length && <Tabs.tab>Admin</Tabs.tab>}
      </Tabs.list>
      <Tabs.panels>
        <Tabs.panel>
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {posts?.map((value: any) => {
              const { title, image, link, description, userInfo, tags, approved } = value as any;

              return (
                approved && (
                  <Card
                    key={link}
                    title={title}
                    image={image}
                    description={description}
                    link={link}
                    userName={userInfo?.name}
                    userImage={userInfo?.avatar}
                    tags={postTags}
                    postTags={tags}
                  />
                )
              );
            })}
          </Box>
        </Tabs.panel>
        <Tabs.panel>
          {" "}
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {posts?.map((value: any) => {
              const { title, image, link, description, userInfo, tags, approved } = value;

              return (
                !approved && (
                  <Card
                    key={link}
                    title={title}
                    image={image}
                    description={description}
                    link={link}
                    userName={userInfo?.name}
                    userImage={userInfo?.avatar}
                    tags={postTags}
                    postTags={tags}
                  />
                )
              );
            })}
          </Box>
        </Tabs.panel>
        <Tabs.panel>
          <Button
            onClick={handelAcceptAll}
            width={"full"}
            bgColor={"secondary"}
            transition={".2s"}
            _hover={{ transform: "scale(0.9)" }}
          >
            Accept All
          </Button>
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} color={"white"}>
            {data?.data.data.map((value: any) => {
              const { title, image, link, description, userInfo, tags } = value as any;

              return (
                <Card
                  key={link}
                  title={title}
                  image={image}
                  description={description}
                  link={link}
                  userName={userInfo?.name}
                  userImage={userInfo?.avatar}
                  tags={postTags}
                  postTags={tags}
                />
              );
            })}
          </Box>
        </Tabs.panel>
      </Tabs.panels>
    </Tabs>
  );
};

export default TabsComp;
