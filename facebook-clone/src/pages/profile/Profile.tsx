import  { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Center,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { Feed } from "../../components/MiddleFeedParts/FeedSections/Feed";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import PostPage from "../../components/MiddleFeedParts/PostPage"; 
import { AiTwotoneHome } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoMdStopwatch } from "react-icons/io";
import { MdRssFeed } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";

interface Postl {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  postUserId: string;
  userName: string;
  timestamp: Timestamp;
  uid: string;
  userImage:string
}

interface PostData {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  postUserId: string;
  userName: string; // Add userName property
  timestamp: Timestamp;
  uid: string;
  userImage: string;
}

interface UserData {
  photoURL: string;
  displayName: string;
}
export default function Profile() {
   const { displayName } = useParams();
   const [userData, setUserData] = useState<UserData | null>(null);

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
  const [posts, setPosts] = useState<Postl[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostData[]; 
      // Filter posts by userName
      const filteredPosts = postData.filter(post => post.userName === displayName);
      setPosts(filteredPosts);
      console.log("postdata", filteredPosts);
    });
  
    return unsubscribe;
  }, [displayName]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data() as UserData; 
        if (data.displayName === displayName) {
          setUserData(data);
        }
      });
    });

    return () => unsubscribe();
  }, [displayName]);

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
                "https://images.pexels.com/photos/259698/pexels-photo-259698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              objectFit="cover"
              alt="#"
            />
          </Flex>
          <Flex direction={"row"} justify={"center"} mt={-12} flexWrap={"wrap"}>
            <Avatar
              h={"200px"}
              w={"200px"}
              src={ userData?.photoURL || ""}
              css={{
                border: "2px solid white",
              }}
            />

            <Stack ml={2}>

            <Text fontWeight={"bold"} fontSize={"2xl"} mt={"50px"}>{displayName}</Text>
            <Text fontWeight={"700"}>378 friends</Text>
            <Flex>{cardDataArray.map((el)=>(
              <Box marginBottom={4}>
              <Image width={"30px"} height={"30px"} borderRadius={"50%"}  src={el.imageSrc}/>
              </Box>
            ))}</Flex>
            </Stack>
          </Flex>
          <Divider border={"1px solid #d1d5da"} marginTop={3} />
          <Flex p={2} marginLeft={["0", "110px"]}>
            <Button>Posts</Button>
            <Button>About</Button>
            <Button>Friends</Button>
            <Button>Photos</Button>
            <Button>Videos</Button>
            <Button>Reels</Button>
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
              <CardBody>
                <Flex alignItems={"center"}>
                  <MdPrivacyTip />

                  <Box marginLeft={4}>
                    <Text fontWeight={"700"}>You've locked your profile</Text>
                    <Text fontWeight={"700"} color={"#0866ff"}>
                      Learn more
                    </Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
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
              
                <Center
                  bg="grey.100"
                  h="40px"
                  color="black"
                  width={"100%"}
                ></Center>
                { user?.displayName ===displayName && <Feed />}
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
                      userImage={post.imageUrl}
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
