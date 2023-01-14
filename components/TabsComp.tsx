import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Tabs from "./Tabs";
import { Card } from "./Card";

const TabsComp: React.FC<any> = ({ postTags, posts }: any) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [unApprovedPosts, setUnApprovedPosts] = useState([]);
  const [userRole, setUser] = useState<any>([]);
  const handelAcceptAll = async () => {
    await supabase.from("posts").update({ approved: true }).is("approved", false);
  };
  const getAdminPanelPosts = useCallback(async () => {
    if (!user) return;
    const { data }: any = await supabase.from("posts").select("*").in("approved", [false]);
    const { data: userAdmin }: any = await supabase.from("users_public_data").select("*").eq("id", user.id);
    setUnApprovedPosts(data);
    setUser(userAdmin[0]?.role);
  }, []);

  useEffect(() => {
    getAdminPanelPosts();
  }, []);

  return (
    <Tabs variant="soft-rounded" color={"text"}>
      <Tabs.list>
        <Tabs.tab>Posts</Tabs.tab>
        <Tabs.tab>Pending</Tabs.tab>
        {userRole === "ADMIN" && <Tabs.tab>Admin</Tabs.tab>}
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
            {unApprovedPosts?.map((value) => {
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
