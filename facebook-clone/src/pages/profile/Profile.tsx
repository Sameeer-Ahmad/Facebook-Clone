
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
} from "@chakra-ui/react";
import RightBar from "../../components/Rightbar";
import { Feed } from "../../components/MiddleFeedParts/FeedSections/Feed";
import  Sidebar  from "../../components/Sidebar";
import { Post } from "../../components/MiddleFeedParts/FeedSections/Post";
import { Story } from "../../components/MiddleFeedParts/FeedSections/Story";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import PostPage from "../../components/MiddleFeedParts/PostPage";
import  Grid  from "@chakra-ui/react";
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
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Postl[]>([]);
  
 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postData as any[]  );
      console.log("postdata", postData); 
      
    });
    
    return unsubscribe; // Unsubscribe from snapshot listener when component unmounts or re-renders
  }, []);
  return (
    <>
     <Center>
        <Box
        //   maxW={'270px'}
        w={"full"}
        bg={"gray.800"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"}>
          <Image
            h={"300px"}
            w={["100%", "100%", "100%", "100%", "70%",'70%']}
            borderRadius={"8px"}
            src={
              "https://c.pxhere.com/photos/59/89/apple_art_black_black_wallpaper_creative_creativity_fruit_glass-912907.jpg!d"
            }
            objectFit="cover"
            alt="#"
          />
        </Flex>
        <Flex justify={"center"} mt={-12}>
          <Avatar
            h={"200px"}
            w={"200px"}
            src={"https://i.stack.imgur.com/l60Hf.png"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
      </Box>
    </Center>
      <Flex className="profile" direction="row" justifyContent={"space-evenly"} >
        <Flex className="profileLeft" direction="column">
       
          <SimpleGrid spacing={4} mt={4}>
          <Card>
            <CardHeader>
              <Heading size='md'> Intro</Heading>
            </CardHeader>
                      <CardBody>
                        <Button bg={"#e4e6eb"} size='lg' width={"100%"}  mb={2} color={"black"}>Add Bio</Button>
              <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}><AiTwotoneHome/>Lives in Patana,India</Text>
              <Text display={"flex"} gap={"10px"} alignItems={"center"}  m={2}><IoLocation/>From Patana,India</Text>

              <Text display={"flex"} gap={"10px"} alignItems={"center"}  m={2}><FaHeart/>Single</Text>
              <Text display={"flex"} gap={"10px"} alignItems={"center"} m={2}><IoMdStopwatch/>Joined on feb 2022</Text>
              <Text display={"flex"} gap={"10px"} alignItems={"center"}  m={2}><MdRssFeed/>Followed by 100 users</Text>
                        
                      </CardBody>
            <CardFooter>
              <Button bg={"#e4e6eb"} size='lg' width={"100%"} mb={2} color={"black"}>Edit details</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size='md'> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size='md'> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
        </Flex>

        <Flex className="profileRight" direction="column">
         
          <Flex className="profileRightBottom">
        <Flex direction={"column"} >
          
              <Feed />
              <Center bg='grey.100' h='40px' color='black' width={"100%"}>
 Post's
</Center>
          {/* <Text mt={"10px"} fontSize={"20px"}  borderColor={"black"} borderBottomWidth={"1px"} mb={"10px"}>Post's</Text> */}
                        {posts.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds).map(post => (
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
        </Flex>
       
      </Flex>
    </>


