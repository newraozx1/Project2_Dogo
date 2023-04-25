import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import axios from "axios";

export const pagedataexport = {};

const PetGrid = () => {
  const [doginfo, setDoginfo] = useState([]);
  const [search, setsearch] = useState("dog");
  const [saveddogo, setsaveddogo] = useState([]);
  //fetches the data
  useEffect(() => {
    axios
      .get(
        `https://api.api-ninjas.com/v1/dogs?name=${search}`,
        {
          headers: {
            "X-Api-Key": "A2Z0gegD6bHNGBmKE7Jz1A==sAcbL0lRNSDGlXf1",
            "Content-Type": "application / json",
          },
        },
        search
      )
      .then((res) => {
        setDoginfo(
          res.data.map((dogobj) => ({
            name: dogobj.name,
            Image: dogobj.image_link,
          }))
        );
        console.log("success");
        console.log(...doginfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const savedogohandler = (dogo) => {
    const exist = saveddogo.find((obj) => obj.Image === dogo.Image);

    if (exist) {
      return alert("Already Saved");
    }
    setsaveddogo(saveddogo.concat(dogo));
  };

  const deletedogo = (dogo) => {
    setsaveddogo(
      saveddogo.filter((innerdogo) => innerdogo.Image !== dogo.Image)
    );
  };
  return (
    <>
      <Input
        placeholder="large size"
        size="lg"
        onChange={(e) => setsearch(e.target.value)}
        display={"inline-block"}
        width={"50%"}
      />

      <div style={{ display: "flex" }}>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
          margin={10}
        >
          {doginfo.map((dogobj) => {
            return (
              <Card overflow={"hidden"} borderRadius={25}>
                <Image src={dogobj.Image}></Image>
                <CardBody
                  display={"Flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Text color="black">{dogobj.name}</Text>
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      margin={1}
                      onClick={() => savedogohandler(dogobj)}
                    ></Button>
                    <Button>Down</Button>
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

        <SimpleGrid
          border="solid"
          borderWidth={5}
          height="800px"
          borderRadius={30}
          backgroundColor={"#B8ADAD"}
        >
          <UnorderedList
            display="flex"
            flexDirection="column"
            margin={5}
            overflowX="hidden"
          >
            {saveddogo.map((dogo) => {
              return (
                <li key={Image} width="25%">
                  <Image width="400px" height="auto" src={dogo.Image} />
                  <Button
                    borderRadius={1}
                    marginBottom={2}
                    colorScheme="red"
                    width="400px"
                    height="30px"
                    onClick={() => deletedogo(dogo)}
                    color="white"
                  >
                    X
                  </Button>
                </li>
              );
            })}
          </UnorderedList>
        </SimpleGrid>
      </div>
    </>
  );
};

export default PetGrid;
