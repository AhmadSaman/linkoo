import { extendTheme } from "@chakra-ui/react";

const colors = {
  text: "#EEEEEE",
  box: "#393E46",
  background: "#222831",
  secondary: "#00ADB5",
};
const fonts = {
  heading: "IBM Plex Sans",
  body: "IBM Plex Sans",
};
const textStyles = {
  title: {
    fontSize: ["20px"],
    fontWeight: "bold",
  },
  normal: {
    fontSize: ["16px"],
    fontWeight: "normal",
  },
};

export default extendTheme({ colors, fonts, textStyles });
