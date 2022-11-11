import React from "react";
import NextLink from "next/link";
import { Box, Flex, Text, Button, Avatar, useDisclosure, Link, Tooltip } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImGoogle } from "react-icons/im";
import DrawerComp from "./DrawerComp";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import supabase from "../utils/supabase";
type TProps = {
  tags: object[];
};
const Navbar: React.FC<TProps> = ({ tags }: TProps) => {
  const user = useUser();
  const session = useSession();
  const signIn = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
    });

  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Flex paddingY={5} justifyContent={"space-between"} alignItems={"center"}>
      {user && (
        <Tooltip label="Go to Dashboard" aria-label="A tooltip">
          <Box>
            {" "}
            <NextLink passHref href={"/dashboard"}>
              <Link
                color={"text"}
                width={"full"}
                height={"full"}
                display={"flex"}
                padding={"5px"}
                rounded={"md"}
                backgroundColor={"inherit"}
                transition={".3s"}
                _hover={{
                  backgroundColor: "white",
                  rounded: "md",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  transform: "scale(.9)",
                  color: "#222831",
                }}
              >
                <Avatar src={user.user_metadata.avatar_url} name={user.user_metadata.full_name} />

                <Text textStyle={"title"} alignSelf={"center"} marginLeft={"2"} textTransform={"capitalize"}>
                  {user.user_metadata.full_name}
                </Text>
              </Link>
            </NextLink>
          </Box>
        </Tooltip>
      )}

      {user && (
        <Box width={{ md: "10%" }}>
          <Button
            ref={btnRef}
            onClick={onOpen}
            width={"full"}
            bgColor={"secondary"}
            transition={".2s"}
            _hover={{ transform: "scale(0.9)" }}
          >
            <AiOutlinePlus style={{ backgroundColor: "inherit", color: "white" }} size={"30px"} />
          </Button>
          <DrawerComp btnRef={btnRef} isOpen={isOpen} onClose={onClose} tags={tags} />
        </Box>
      )}

      {!user && (
        <Box display={"flex"} width={"full"}>
          <Text
            maxWidth={"90%"}
            color={"white"}
            alignSelf={"end"}
            textStyle={"normal"}
            textAlign={"end"}
            mr="2"
            width={"full"}
          >
            Join Linkoo and help the community to grow
          </Text>

          <Button
            maxWidth={"10%"}
            onClick={signIn}
            width={"full"}
            bgColor={"secondary"}
            transition={".2s"}
            _hover={{ transform: "scale(0.9)" }}
            color={"white"}
            ml={"2"}
          >
            <ImGoogle size={"30px"} />
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
