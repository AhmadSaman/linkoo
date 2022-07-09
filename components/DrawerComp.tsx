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
import { useForm, UseFormRegister } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  link: string().required(),
});
interface DrawerProps {
  btnRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}
type Form = {
  register: UseFormRegister<{ link: string }>;
  handleSubmit: any;
  setValue: any;
};

const DrawerComp: React.FC<DrawerProps> = ({ btnRef, isOpen, onClose }: DrawerProps) => {
  const { register, handleSubmit, setValue }: Form = useForm({
    defaultValues: { link: "" },
    resolver: yupResolver(schema),
  });
  // const [value, setValue] = React.useState<string | number | readonly string[] | undefined>("");
  const handlePaste = () => {
    navigator.clipboard.readText().then((clipText) => setValue("link", clipText));
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Drawer isOpen={isOpen} placement={"right"} onClose={onClose} finalFocusRef={btnRef} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerCloseButton />
          <DrawerHeader>Post </DrawerHeader>
          <DrawerBody>
            <InputGroup>
              <InputLeftAddon>Link</InputLeftAddon>
              <Input type={"text"} placeholder="paste your Link" {...register("link")} />
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
                <Input type={"text"} />
              </InputGroup>
              <InputGroup marginTop={"2"} flexDirection={"column"}>
                <Text fontSize={"md"} marginBottom={"1"}>
                  Image:
                </Text>
                <Input placeholder={"Image Link"} />
                <Box marginTop={"3"} width={"100px"}>
                  <Image src={"https://bit.ly/dan-abramov"} alt={"card Image"} rounded={"md"} />
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
                      <ListIcon as={TiDelete} color={"red.500"} alignSelf={"center"} width={"20px"} />
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
              type="submit"
              bgColor="secondary"
              color={"text"}
              _hover={{ color: "#00ADB5", backgroundColor: "white" }}
            >
              Post
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
