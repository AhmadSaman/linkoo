import React from "react";
import NextLink from "next/link";
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
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Textarea,
  List,
  ListItem,
  ListIcon,
  Badge,
  Image,
  Link,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdContentPaste } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
const Navbar: React.FC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Flex paddingY={5} justifyContent={"space-between"} alignItems={"center"}>
      <Box>
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
            <Avatar
              src="https://avatars.githubusercontent.com/u/55833403?v=4"
              name="Ahmad Saman"
            />

            <Text textStyle={"title"} alignSelf={"center"} marginLeft={"2"}>
              Ahmad Saman
            </Text>
          </Link>
        </NextLink>
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
        <DrawerHeader>Post </DrawerHeader>
        <DrawerBody>
          <InputGroup>
            <InputLeftAddon>Link</InputLeftAddon>
            <Input type={"text"} placeholder="paste your Link" />
            <InputRightElement height={"1.75rem"} margin={"1.5"}>
              <Button h="1.75rem" size="sm">
                <MdContentPaste />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex marginTop={"5"} flexDirection={"column"}>
            <Text fontSize={"xl"} fontWeight={"bold"} marginY={"2"}>
              Information
            </Text>
            <InputGroup flexDirection={"column"}>
              <Text fontSize={"md"} marginBottom={"1"}>
                Title:
              </Text>
              <Input type={"text"} value={""} />
            </InputGroup>
            <InputGroup marginTop={"2"} flexDirection={"column"}>
              <Text fontSize={"md"} marginBottom={"1"}>
                Image:
              </Text>
              <Input placeholder={"Image Link"} />
              {/* <Box marginTop={"3"} width={"100px"}>
                <Image
                  src={"https://bit.ly/dan-abramov"}
                  alt={"card Image"}
                  rounded={"md"}
                />
              </Box> */}
            </InputGroup>
            <InputGroup marginTop={"2"} flexDirection={"column"}>
              <Text fontSize={"md"} marginBottom={"1"}>
                Description:
              </Text>
              <Textarea placeholder={"Description"} />
            </InputGroup>
            <InputGroup marginTop={"2"} flexDirection={"column"}>
              <Text fontSize={"md"} marginBottom={"1"}>
                Tags:
              </Text>
              <Box backgroundColor={"text"} rounded={"md"}>
                <Input placeholder={"Tags"} backgroundColor={"white"} />
                <List spacing={"3"} transition={".3s"} margin={"2"}>
                  <ListItem display={"flex"}>
                    <ListIcon
                      as={TiDelete}
                      color={"red.500"}
                      alignSelf={"center"}
                      width={"20px"}
                    />
                    <Badge>React</Badge>
                  </ListItem>
                </List>
              </Box>
            </InputGroup>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bgColor="secondary"
            color={"text"}
            _hover={{ color: "#00ADB5", backgroundColor: "white" }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
