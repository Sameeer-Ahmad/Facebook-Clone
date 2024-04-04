

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
    
  
    return (
      <Flex  mt={4} >
        <WatchSidebar />
        <Center width={"100%"}  flex="1">
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="800px"
            width="100%"
          >
            {videos.map((el) => (
              <Card key={el.id} mb={4} width="100%">
                <CardHeader>
                  <Flex alignItems="center">
                    <Avatar src="https://bit.ly/sage-adebayo" />
                    <Box ml={2}>
                      <Heading size="sm">{el.userName}</Heading>
                    </Box>
                    <Box flex="1" textAlign="right">
                      <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                      />
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{el.title}</Text>
                </CardBody>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={el.video}
                    title="YouTube video player"
                    width="100%"
                    height="100%"
                  ></iframe>
                </AspectRatio>
                <CardFooter justify="space-between">
                  <Button leftIcon={<BiLike />}>Like</Button>
                  <Button leftIcon={<BiChat />}>Comment</Button>
                  <Button leftIcon={<BiShare />}>Share</Button>
                </CardFooter>
              </Card>
            ))}
          </Flex>
        </Center>
      </Flex>
    );
  };
  
  export default Watch;