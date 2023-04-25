import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import PetGrid from "./components/PetGrid";

function App() {
  return (
    <Grid
      backgroundColor={"F7F3EA"}
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main down"`,
      }}
    >
      <GridItem
        border={"sold"}
        // borderColor={"white"}
        borderWidth={"3px"}
        area="nav"
      >
        <Navbar></Navbar>
      </GridItem>
      <GridItem area="main">
        <PetGrid></PetGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
