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
import { PiShareFatLight } from "react-icons/pi";

const videos = [
  {
    id: 1,
    userName: "Nat Geo",
    title: "Nature is Healing",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 2,
    userName: "Nat Geo",
    title: "Nature",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 3,
    userName: "Discovery",
    title: "Beatu...",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 4,
    userName: "BBC",
    title: "BBC Special",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 5,
    userName: "JOhn Doe",
    title: "Life is Beatutiful",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 6,
    userName: "Tracey River",
    title: "Try to know the nature.",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 7,
    userName: "Sujeet Kumar",
    title: "sujeet",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 8,
    userName: "Sameer Ahmed",
    title: "sameer",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 9,
    userName: "Gulsaba Praveen",
    title: "gulsaba",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 10,
    userName: "Sachin Kumanache",
    title: "sachin",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
  {
    id: 11,
    userName: "Rohan Sethi",
    title: "rohan",
    video: "https://www.youtube.com/embed/klsAvhHBF-A?si=VoXPwUzJnVIJbFyy",
  },
];
const Watch = () => {
  return (
    <Flex >
      <WatchSidebar />
      <Center width={"100%"} flex="1">
        <Flex
          flexDir="column"
          alignItems="center"
          maxW="800px"
          width="100%"
          p={4}
          // border={"1px solid red"}
          marginLeft={"-25PX"}
        >
          {videos.map((el) => (
            <Card key={el.id} mb={4} width="100%" >
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
              {/* <CardBody> */}
              <Text marginLeft={5} fontWeight={"400"} fontSize={"18px"}>
                {el.title}
              </Text>
              {/* </CardBody> */}
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
                {/* <Button leftIcon={<BiShare />}>Share</Button> */}
                <Button leftIcon={<PiShareFatLight />}>Share</Button>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      </Center>
    </Flex>
  );
};

export default Watch;