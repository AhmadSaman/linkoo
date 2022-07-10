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
  Image,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import { MdContentPaste } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { array, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  link: string().required(),
  title: string().required(),
  image: string().required(),
  description: string().required(),
  tags: array().min(1, "more than one").required(),
});
interface DrawerProps {
  btnRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  link: string;
  title: string;
  image: string;
  description: string;
  tags: object[];
};

const DrawerComp: React.FC<DrawerProps> = ({ btnRef, isOpen, onClose }: DrawerProps) => {
  const { register, handleSubmit, setValue, control } = useForm<FormValues>({
    defaultValues: { link: "", title: "", image: "", description: "", tags: [] },
    resolver: yupResolver(schema),
  });
  const handlePaste = () => {
    navigator.clipboard.readText().then((clipText) => setValue("link", clipText));
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Drawer isOpen={isOpen} placement={"right"} onClose={onClose} finalFocusRef={btnRef} size={"md"}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
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
                <Input type={"text"} {...register("title")} />
              </InputGroup>
              <InputGroup marginTop={"2"} flexDirection={"column"}>
                <Text fontSize={"md"} marginBottom={"1"}>
                  Image:
                </Text>
                <Input placeholder={"Image Link"} {...register("image")} />
                <Box marginTop={"3"} width={"100px"}>
                  <Image src={"https://bit.ly/dan-abramov"} alt={"card Image"} rounded={"md"} />
                </Box>
              </InputGroup>
              <InputGroup marginTop={"2"} flexDirection={"column"}>
                <Text fontSize={"md"} marginBottom={"1"}>
                  Description:
                </Text>
                <Textarea placeholder={"Description"} {...register("description")} />
              </InputGroup>
              <InputGroup marginTop={"2"} flexDirection={"column"}>
                <Text fontSize={"md"} marginBottom={"1"}>
                  Tags:
                </Text>
                <Box backgroundColor={"text"} rounded={"md"}>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isMulti
                        {...field}
                        options={[
                          { value: "react", label: "React" },
                          { value: "vue", label: "Vue" },
                          { value: "javaScript", label: "JavaScript" },
                        ]}
                      />
                    )}
                  />
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
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default DrawerComp;
