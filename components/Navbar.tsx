import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar: React.FC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Flex paddingY={5} justifyContent={"space-between"} alignItems={"center"}>
      <Box>
        <Button
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
          <Avatar
            src="https://avatars.githubusercontent.com/u/55833403?v=4"
            name="Ahmad Saman"
          />

          <Text
            textStyle={"title"}
            alignSelf={"center"}
            backgroundColor={"inherit"}
            marginLeft={"2"}
          >
            Ahmad Saman
          </Text>
        </Button>
      </Box>
      <Box width={{ md: "10%" }}>
        <Button
          ref={btnRef}
          onClick={onOpen}
          width={"full"}
          bgColor={"secondary"}
          transition={".2s"}
          _hover={{ transform: "scale(0.9)" }}
        >
          <AiOutlinePlus
            style={{ backgroundColor: "inherit", color: "white" }}
            size={"30px"}
          />
        </Button>
        <DrawerComp ref={btnRef} isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};
interface DrawerProps {
  ref: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}
const DrawerComp: React.FC<DrawerProps> = ({
  ref,
  isOpen,
  onClose,
}: DrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement={"right"}
      onClose={onClose}
      finalFocusRef={ref}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>ahmad saman</DrawerHeader>
        <DrawerBody>hey</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
