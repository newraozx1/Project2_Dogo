import { HStack, Img } from "@chakra-ui/react";
import dogo from "../assets/headdogy.png";
import ColorModeSwitch from "./ColorModeSwitch";
import sleepy2 from "../assets/sleepy2.gif";

const Navbar = () => {
  return (
    <HStack
      backgroundColor={"#FBE2D4"}
      justifyContent="space-between"
      padding="10px"
      overflow="hidden"
    >
      <Img src={dogo} boxSize="45px"></Img>
      <div>
        <Img width="104px" boxSize="100px" src={sleepy2}></Img>
      </div>
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default Navbar;
