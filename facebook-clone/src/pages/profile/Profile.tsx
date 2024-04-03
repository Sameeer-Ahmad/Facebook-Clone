import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Spacer,
  Center,
  Divider,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  Avatar,
  Grid,
} from "@chakra-ui/react";
import { Feed } from "../../components/MiddleFeedParts/FeedSections/Feed";

import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import PostPage from "../../components/MiddleFeedParts/PostPage";
import { AiTwotoneHome } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoMdStopwatch } from "react-icons/io";
import { MdRssFeed } from "react-icons/md";

interface Postl {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  postUserId: string;
  userName: string;
  timestamp: Timestamp;
  uid: string;
  // postUserId: string;
}
export default function Profile() {
  const cardDataArray: { imageSrc: string }[] = [
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/portrait-young-elegant-man_103153-1409.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/portrait-handsome-man_186382-10866.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/shot-young-man-with-his-arms-folded-standing-alone-city_762026-56484.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/male-models-pose-great-photoshoot-high-fashion-magazine-cover_563241-4413.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/portrait-handsome-young-man_1030147-21.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/handsome-boy_884653-12061.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/man-wearing-trendy-high-quality-checked-double-pocket-shirt-fashion-photography_758367-107414.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/free-photo/vertical-shot-handsome-male-with-black-coat-watch_181624-38993.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/man-wearing-trendy-high-quality-checked-double-pocket-shirt-fashion-photography_758367-67076.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais",
    },
  ];
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Postl[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData as any[]);
      console.log("postdata", postData);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Center>
        <Box w={"full"} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
          <Flex justify={"center"}>
            <Image
              h={"300px"}
              w={["100%", "100%", "100%", "100%", "70%", "70%"]}
              borderRadius={"8px"}
              src={
                "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
              objectFit="cover"
              alt="#"
            />
          </Flex>
          <Flex direction={"row"} justify={"center"} mt={-12}>
            <Avatar
              h={"200px"}
              w={"200px"}
              src={"https://i.stack.imgur.com/l60Hf.png"}
              css={{
                border: "2px solid white",
              }}
            /> 
            <Text fontWeight={"bold"} fontSize={"2xl"} mt={32}>{user?.displayName}</Text>
          </Flex>
        </Box>
      </Center>
      <Flex
        className="profile"
        direction={["column", "column", "column", "row", "row"]}
        justifyContent={"space-evenly"}
      >
        <Flex
          className="profileLeft"
          width={["100%", "100%", "100%", "40%"]}
          direction="column"
        >
          <SimpleGrid spacing={4} mt={4}>
            <Card>
              <CardHeader>
                <Heading size="md"> Intro</Heading>
              </CardHeader>
              <CardBody>
                <Button
                  bg={"#e4e6eb"}
                  size="lg"
                  width={"100%"}
                  mb={2}
                  color={"black"}
                >
                  Add Bio
                </Button>
                <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}>
                  <AiTwotoneHome />
                  Lives in Patna,India
                </Text>
                <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}>
                  <IoLocation />
                  From Patna,India
                </Text>

                <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}>
                  <FaHeart />
                  Single
                </Text>
                <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}>
                  <IoMdStopwatch />
                  Joined on feb 2022
                </Text>
                <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}>
                  <MdRssFeed />
                  Followed by 100 users
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  bg={"#e4e6eb"}
                  size="lg"
                  width={"100%"}
                  mb={2}
                  color={"black"}
                >
                  Edit details
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Flex>

        <Flex
          alignContent={"center"}
          className="profileRight"
          direction="column"
        >
          <Center>
            <Flex className="profileRightBottom">
              <Flex direction={"column"}>
                <Feed />
                <Center
                  bg="grey.100"
                  h="40px"
                  color="black"
                  width={"100%"}
                ></Center>

                {posts
                  .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
                  .map((post) => (
                    <PostPage
                      key={post.id}
                      postId={post.id}
                      user={user}
                      username={post.userName}
                      caption={post.caption}
                      imageURL={post.imageUrl}
                      noOfLikes={post.likes}
                      postUserId={post.uid}
                      timestamp={post.timestamp}
                    />
                  ))}
              </Flex>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
