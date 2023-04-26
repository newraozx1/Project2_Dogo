import React, { Fragment, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import axios from "axios";
import "./genral.scss";
export const pagedataexport = {};

const PetGrid = () => {
  const [doginfo, setDoginfo] = useState([]); //fetched data
  const [search, setsearch] = useState("dog"); // search
  const [saveddogo, setsaveddogo] = useState([]); //saved data
  const ismobile = window.innerWidth <= 750;
  //fetches the data
  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/dogs?name=${search}`, {
        headers: {
          "X-Api-Key": "A2Z0gegD6bHNGBmKE7Jz1A==sAcbL0lRNSDGlXf1",
          "Content-Type": "application / json",
        },
      })
      .then((res) => {
        setDoginfo(
          res.data.map((dogobj) => ({
            name: dogobj.name,
            Image: dogobj.image_link,
          }))
        );
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const savedogohandler = (dogo) => {
    const exist = saveddogo.find((obj) => obj.Image === dogo.Image);

    if (exist) {
      return alert("Already Saved"); // wont save the dogo if exist
    }
    setsaveddogo(saveddogo.concat(dogo)); // adding the the dogo to the list
  };

  const deletedogo = (dogo) => {
    //filter out the new dogo list without the deleted dogo
    setsaveddogo(
      saveddogo.filter((innerdogo) => innerdogo.Image !== dogo.Image)
    );
  };

  const downloader = (image) => {
    //uses a third party package file-save to downlode the image
    let url = image;
    saveAs(url, "dog-imaeg");
  };

  return (
    //STRUCTURE
    //headdiv - two rows > 1st row == navbar , 2nd row == col1(dogoGrid) , col2( savedDogolist)

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="div-search"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          justifySelf: "center",
        }}
      >
        <Input
          placeholder="Search the Dogo Breed Here..."
          size="lg"
          onChange={(e) => setsearch(e.target.value)}
          width={"60%"}
          margin={2}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "window",
          flexdirection: "row",
          padding: "0",
          margin: "0",
        }}
      >
        <div className="div-grid" style={{ minWidth: "80%" }}>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={10}
            margin={2}
          >
            {doginfo.map((dogobj) => {
              return (
                <Card overflow={"hidden"} borderRadius={25}>
                  <Image src={dogobj.Image}></Image>
                  <CardBody
                    display={"Flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                    padding={3}
                  >
                    <Text fontSize={"3xl"}>{dogobj.name}</Text>
                  </CardBody>
                  <CardFooter padding={3}>
                    {!ismobile && (
                      <Button
                        margin={1}
                        width={"100%"}
                        onClick={() => savedogohandler(dogobj)}
                        borderRadius={25}
                      >
                        Save
                      </Button>
                    )}
                    <Button
                      borderRadius={25}
                      margin={1}
                      width={"100%"}
                      onClick={() => downloader(dogobj.Image)}
                    >
                      Down
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </SimpleGrid>
        </div>

        {saveddogo.length !== 0 && !ismobile ? (
          <div
            style={{
              position: "relative",
              right: 0,
              maxWidth: "15%",
              width: "100%",
              overflow: "scroll",
            }}
            className="save"
          >
            <SimpleGrid
              margin={1}
              borderWidth={2}
              height="800px"
              borderRadius={12}
              backgroundColor={"inherit"}
              padding={0}
            >
              <UnorderedList
                display="flex"
                flexDirection="column"
                margin={3}
                overflow="scroll"
              >
                {saveddogo.map((dogo) => {
                  return (
                    <li
                      borderRadius={10}
                      display="flex"
                      flexDirection="column"
                      key={Image}
                      overflow="hidden"
                    >
                      <Image width="100%" height="auto" src={dogo.Image} />
                      <div className="div-buttondiv">
                        <Button
                          width="50%"
                          borderRadius={1}
                          marginBottom={2}
                          colorScheme="red"
                          height="30px"
                          onClick={() => deletedogo(dogo)}
                          color="white"
                          borderBottomRadius={3}
                        >
                          <RiDeleteBack2Line height="100%"></RiDeleteBack2Line>
                        </Button>

                        <Button
                          width="50%"
                          borderRadius={1}
                          marginBottom={2}
                          colorScheme="green"
                          height="30px"
                          onClick={() => downloader(dogo.Image)}
                          color="white"
                          borderBottomRadius={3}
                        >
                          <FaDownload></FaDownload>
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </UnorderedList>
            </SimpleGrid>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PetGrid;
