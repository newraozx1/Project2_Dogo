import React, { Fragment, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Image,
  Input,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import downlaodicon from "../assets/download.png";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import axios from "axios";
import "./test.scss";
export const pagedataexport = {};

const PetGrid = () => {
  const [doginfo, setDoginfo] = useState([]);
  const [search, setsearch] = useState("dog");
  const [saveddogo, setsaveddogo] = useState([]);
  const [isloading, setisloading] = useState(false);
  const ismobile = window.innerWidth <= 750;
  const [issavebutton, setissavebutton] = useState(false);
  //fetches the data
  useEffect(() => {
    setisloading(true);
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
        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
        setisloading(false);
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

  const downloader = (image) => {
    let url = image;
    saveAs(url, "dog-imaeg");
  };

  return (
    <div>
      <div
        className="div-search"
        style={{
          display: "flex",
          justifyContent: "center",
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
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div className="div-grid" style={{ minWidth: "80%" }}>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={10}
            margin={2}
          >
            {doginfo.map((dogobj) => {
              return (
                <Card overflow={"hidden"} borderRadius={25}>
                  <a href={dogobj.Image} download={dogobj.Image}></a>
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
                      {!ismobile && (
                        <Button
                          margin={1}
                          width={"100%"}
                          onClick={() => savedogohandler(dogobj)}
                        >
                          Save
                        </Button>
                      )}

                      <Button
                        margin={1}
                        width={"100%"}
                        onClick={() => downloader(dogobj.Image)}
                      >
                        Down
                      </Button>
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        </div>
        {saveddogo.length !== 0 && !ismobile ? (
          <div
            style={{
              maxWidth: "15%",
              width: "100%",
            }}
            className="save"
          >
            <SimpleGrid
              margin={2}
              borderWidth={2}
              height="800px"
              borderRadius={12}
              backgroundColor={"#B8ADAD"}
            >
              <UnorderedList
                display="flex"
                flexDirection="column"
                margin={4}
                overflowX="hidden"
              >
                {saveddogo.map((dogo) => {
                  return (
                    <li display="flex" flexDirection="column" key={Image}>
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
                        >
                          <FaDownload></FaDownload>
                          {/* <img
                            style={{ width: "auto", height: "100%" }}
                            src={FaDownload}
                          ></img> */}
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

    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    // >
    //   <div className="div-search">
    //     <Input
    //       placeholder="large size"
    //       size="lg"
    //       onChange={(e) => setsearch(e.target.value)}
    //       display={"inline-block"}
    //       width={"50%"}
    //     />
    //   </div>

    //   <div className="dogogrid">
    //     <SimpleGrid
    //       columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    //       spacing={10}
    //       margin={10}
    //     >
    //       {doginfo.map((dogobj) => {
    //         return (
    //           <Card overflow={"hidden"} borderRadius={25}>
    //             <Image src={dogobj.Image}></Image>
    //             <CardBody
    //               display={"Flex"}
    //               flexDirection={"row"}
    //               justifyContent={"space-between"}
    //             >
    //               <Text color="black">{dogobj.name}</Text>
    //               <p
    //                 style={{
    //                   display: "flex",
    //                   flexDirection: "column",
    //                 }}
    //               >
    //                 <Button
    //                   margin={1}
    //                   width={"100%"}
    //                   onClick={() => savedogohandler(dogobj)}
    //                 >
    //                   Save
    //                 </Button>
    //                 <Button margin={1} width={"100%"}>
    //                   Down
    //                 </Button>
    //               </p>
    //             </CardBody>
    //           </Card>
    //         );
    //       })}
    //     </SimpleGrid>
    //   </div>
    //   <div className="div-saveddogogrid">
    //     {saveddogo.length !== 0 ? (
    //       <SimpleGrid
    //         border="solid"
    //         borderWidth={2}
    //         height="800px"
    //         borderRadius={12}
    //         backgroundColor={"#B8ADAD"}
    //       >
    //         <UnorderedList
    //           display="flex"
    //           flexDirection="column"
    //           margin={4}
    //           overflowX="hidden"
    //         >
    //           {saveddogo.map((dogo) => {
    //             return (
    //               <li display="flex" flexDirection="column" key={Image}>
    //                 <Image width="400px" height="auto" src={dogo.Image} />
    //                 <Button
    //                   width="100%"
    //                   borderRadius={1}
    //                   marginBottom={2}
    //                   maxWidth={196.7}
    //                   colorScheme="red"
    //                   s
    //                   height="30px"
    //                   onClick={() => deletedogo(dogo)}
    //                   color="white"
    //                 >
    //                   {" "}
    //                   Remove
    //                 </Button>
    //               </li>
    //             );
    //           })}
    //         </UnorderedList>
    //       </SimpleGrid>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>
  );
};

export default PetGrid;
