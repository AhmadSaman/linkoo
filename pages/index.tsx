import type { NextPage } from "next";
import { Text, Button, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Text fontSize={"2xl"} color={"text"}>
        hello world
      </Text>
      <Button>Button</Button>
    </Box>
  );
};

export default Home;
