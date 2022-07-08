import React from "react";
import {
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
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { MdContentPaste } from "react-icons/md";
import usePaste from "../hooks/usePaste";

interface DrawerProps {
  btnRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}
const DrawerComp: React.FC<DrawerProps> = ({
  btnRef,
  isOpen,
  onClose,
}: DrawerProps) => {
  const [value, setValue] = React.useState<
    string | number | readonly string[] | undefined
  >("");
  const { paste } = usePaste();
  const handlePaste = () => {
    setValue(paste);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement={"right"}
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Post </DrawerHeader>
        <DrawerBody>
          <InputGroup>
            <InputLeftAddon>Link</InputLeftAddon>
            <Input type={"text"} placeholder="paste your Link" value={value} />
            <InputRightElement height={"1.75rem"} margin={"1.5"}>
              <Button h="1.75rem" size="sm" onClick={handlePaste}>
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
              <Box marginTop={"3"} width={"100px"}>
                <Image
                  src={"https://bit.ly/dan-abramov"}
                  alt={"card Image"}
                  rounded={"md"}
                />
              </Box>
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
            Post
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
