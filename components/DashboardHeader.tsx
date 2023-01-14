import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextRouter, useRouter } from "next/router";
import { Flex, Button, Link, Text, Box } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import LinkNext from "next/link";

const DashboardHeader: React.FC = () => {
  const router: NextRouter = useRouter();
  const supabaseClient = useSupabaseClient();
  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.back();
  };

  return (
    <Flex paddingY={5}>
      <Box
        backgroundColor={"text"}
        width={"40px"}
        height={"40px"}
        rounded={"full"}
        alignSelf={"center"}
        display={"flex"}
        justifyContent={"center"}
        transition={".3s"}
        _hover={{
          transform: "scale(.9)",
          cursor: "pointer",
        }}
      >
        <LinkNext href={"/"} passHref>
          <Link display={"flex"} alignItems={"center"} _active={{ border: "none" }} _focus={{ border: "none" }}>
            <IoMdArrowRoundBack />
          </Link>
        </LinkNext>
      </Box>
      <Text
        fontSize={["md", "md", "lg", "4xl"]}
        marginLeft={"5"}
        color={"text"}
        alignSelf={"center"}
        fontWeight={"bold"}
      >
        Your Dashboard
      </Text>
      <Button marginLeft={"auto"} alignSelf={"center"} colorScheme={"red"} onClick={handleSignOut}>
        Logout
      </Button>
    </Flex>
  );
};

export default DashboardHeader;