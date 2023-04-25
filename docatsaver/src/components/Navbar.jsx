import { HStack, Img } from "@chakra-ui/react";
import React from "react";
import dogo from "../assets/headdogy.png";
import { Button, ButtonGroup } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <HStack
      backgroundColor={"#FBE2D4"}
      justifyContent="space-between"
      padding="10px"
    >
      <Img src={dogo} boxSize="45px"></Img>
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default Navbar;
