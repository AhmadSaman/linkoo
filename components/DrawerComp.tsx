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
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import Select from "react-select";
import { MdContentPaste } from "react-icons/md";
import { FiDownloadCloud } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { array, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { postPost } from "../apis/apis";
import { useAuth } from "../hooks/useAuth";

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
  tags: object[];
}

type FormValues = {
  link: string;
  title: string;
  image: string;
  description: string;
  tags: object[];
};
type TInfo = {
  link: "link";
  title: "title";
  image: "image";
  description: "description";
  tags: "tags";
};
type TTag = { id: string; name: string };
const DrawerComp: React.FC<DrawerProps> = ({ btnRef, isOpen, onClose, tags }: DrawerProps) => {
  const { user }: any = useAuth();
  const [loadingInfo, setLoadingInfo] = React.useState<boolean>(false);
  const { register, handleSubmit, setValue, control, watch } = useForm<FormValues>({
    defaultValues: { link: "", title: "", image: "", description: "", tags: [] },
    resolver: yupResolver(schema),
  });
  const handlePaste: () => void = () => {
    navigator.clipboard.readText().then((clipText) => setValue("link", clipText));
  };
  const handleFetch: () => void = () => {
    setLoadingInfo(true);
    axios
      .get(`https://api.linkpreview.net/?key=4aab97cbd9dfd9368d30ffcf68313672&q=${watch("link")}`)
      .then(({ data }) => {
        setInformationFormValues(data);
        setLoadingInfo(false);
      })
      .catch(() => setLoadingInfo(false));
  };
  const setInformationFormValues: (info: TInfo) => void = (info: TInfo) => {
    Object.entries(info).map(([index, value]) => setValue(index as "link" | "title" | "image" | "description", value));
  };
  const formatTags: (tags: object[]) => {
    label: string;
    value: string;
  }[] = (tags: object[]) =>
    tags.map((tag) => {
      const { name, id } = tag as TTag;
      return { label: name, value: id };
    });
  const generateRandomImg = () =>
    setValue("image", `https://source.unsplash.com/random/350x200?sig=${Math.floor(Math.random() * 100)}`);
  const changeTagsFormat = (tags: any) => tags.map((tag: any) => tag.value);

  const onSubmit = async (data: any) => {
    const newData = {
      title: data.title,
      image: data.image,
      link: data.link,
      tags: changeTagsFormat(watch("tags")),
      approved: false,
      userId: user?.id,
      userInfo: { name: user.user_metadata.name, avatar: user.user_metadata.avatar_url },
    };
    console.log(newData);
    await postPost(newData);
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
              <InputRightElement marginRight={"48px"}>
                <Tooltip label="fetch information">
                  <Button h="1.75rem" size="sm" onClick={handleFetch}>
                    {loadingInfo ? <Spinner size={"xs"} /> : <FiDownloadCloud />}
                  </Button>
                </Tooltip>
              </InputRightElement>
              <InputRightElement marginRight={"5px"}>
                <Tooltip label="Paste link">
                  <Button h="1.75rem" size="sm" onClick={handlePaste}>
                    <MdContentPaste />
                  </Button>
                </Tooltip>
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
                <Text fontSize={"xs"}>note: invalid image will not be accepted </Text>
                <Box marginTop={"3"} width={"full"} display={"flex"} justifyContent={"space-between"}>
                  <Button size={"xs"} onClick={generateRandomImg}>
                    <Text fontSize={"xs"}>Generate Image</Text>
                  </Button>
                  {watch("image") && (
                    <Image src={watch("image")} maxHeight={"100px"} width={"110px"} alt={"card Image"} rounded={"md"} />
                  )}
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
                      <Select isMulti {...field} options={formatTags(tags)} menuPlacement={"top"} />
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
