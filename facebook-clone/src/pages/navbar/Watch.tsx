

import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
//import { Image } from "@chakra-ui/image";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/layout";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import WatchSidebar from "./Sidebars/WatchSidebar";
import { useState } from "react";


const videos = [
    {
      id: 1,
      userName: "Nat Geo",
      title: "Nature is Healing",
      video: "https://www.youtube.com/embed/QFHzrjAps_8?si=uR6r5Ejd_3Nky3Q6",
    },
    {
      id: 2,
      userName: "Nat Geo",
      title: "Nature",
      video: "https://www.youtube.com/embed/kgrV3_g9rYY?si=PxlevoIyP_lchqgh",
    },
    {
      id: 3,
      userName: "Discovery",
      title: "Beatu...",
      video: "https://www.youtube.com/embed/7wKu13wmHog?si=wlrldnXgT97SM7MR",
    },
    {
      id: 4,
      userName: "BBC",
      title: "BBC Special",
      video: "https://www.youtube.com/embed/Th15ia-Up_s?si=EAwG_oLJh3eYKxgt",
    },
    {
      id: 5,
      userName: "JOhn Doe",
      title: "Life is Beatutiful",
      video: "https://www.youtube.com/embed/FSzh981zcqQ?si=Qvzod9F7_UEtYG32",
    },
    {
      id: 6,
      userName: "Tracey River",
      title: "Try to know the nature.",
      video: "https://www.youtube.com/embed/Y6aYx_KKM7A?si=w29qRiAZHGYVPf-w",
    },
    {
      id: 7,
      userName: "Sujeet Kumar",
      title: "sujeet",
      video: "https://www.youtube.com/embed/8u1o-OmOeGQ?si=5joMNhBnq0xCOagE",
    },
    {
      id: 8,
      userName: "Sameer Ahmed",
      title: "sameer",
      video: "https://www.youtube.com/embed/uPOBS-3bVHk?si=dAZUXwfSzwlleXaV",
    },
    {
      id: 9,
      userName: "Gulsaba Praveen",
      title: "gulsaba",
      video: "https://www.youtube.com/embed/mO8n8ZWnzR8?si=A8t0SkdjtLVek5A6",
    },
    {
      id: 10,
      userName: "Sachin Kumanache",
      title: "sachin",
      video: "https://www.youtube.com/embed/3KtWfp0UopM?si=DkCHjLm-C6PwMSrg",
    },
    {
      id: 11,
      userName: "Rohan Sethi",
      title: "rohan",
      video: "https://www.youtube.com/embed/fjHtjT7GO1c?si=T_5_4y_3YClQBQo0",
    },
  ];
const Watch = () => {
    const [likes,setLikes]=useState<number>(0);
    const [comments,setComments]=useState<string>("");
    const [commentsCount,setCommentsCount]=useState<number>(0);
 

  return (
    <>
      <Flex >
        <WatchSidebar />
        <Center width={"100%"} >
          <Box   flexBasis={"100%"}  display={"flex"}  flexDir={"column"} justifyContent={"center"} alignItems={"center"}  >
            {videos.map((el) => (
              <Card width={"800px"}  maxW="xl" key={el.id} m={4} >
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        // name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />

                      <Box>
                        <Heading size="sm">{el.userName}</Heading>
                        {/* <Text>{}</Text> */}
                      </Box>
                    </Flex>
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                    />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{el.title}</Text>
                </CardBody>

                <AspectRatio maxW="560px" ratio={1}>
                  <iframe
                    width="560"
                    height="315"
                    src={el.video}
                    title="YouTube video player"
                  ></iframe>
                </AspectRatio>

                <CardFooter
                  justify="space-between"
                  flexWrap="wrap"
                  sx={{
                    "& > button": {
                      minW: "136px",
                    },
                  }}
                >
                  <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                    Like
                  </Button>
                  <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                    Comment
                  </Button>
                  <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </Box>
        </Center>
      </Flex>
    </>
  );
};
export default Watch;