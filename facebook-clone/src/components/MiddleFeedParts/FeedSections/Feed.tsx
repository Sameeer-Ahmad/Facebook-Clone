import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
// import FeedModal from "../PostModals/FeedModal";
// import {storage,db} from ".."
// import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { getAuth } from "firebase/auth";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import { useEffect, useRef, useState } from "react";
import { Timestamp, addDoc, collection, doc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Feed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [loading, setLoading] = useState<boolean>(true);
  // const [useName, setUserName] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement|any>(null);
  const[posts,setPosts]=useState<any>([]);
  const auth = getAuth();

  const user = auth.currentUser;
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);
        const postsData = querySnapshot.docs.map((doc) => doc.data() as Post);
        setPosts(postsData.reverse()); // Reverse the array to show newest posts first
  
        const unsubscribe = onSnapshot(postsRef, (snapshot) => {
          const updatedPostsData = snapshot.docs.map((doc) => doc.data() as Post);
          setPosts(updatedPostsData.reverse()); // Reverse the array to show newest posts first
        });
  
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
  
    fetchPosts();
  }, []);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setImage(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };
  interface Post {
    caption: string;
    imageUrl: string;
    likes: number;
    userName: string;
    uid: string;
    timestamp: Timestamp;
  }

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCaption("");
    setImageUrl("");
    if (caption === "" && imageUrl === "") {
      console.log("Prevented access to photo and caption submission ");
    } else {
      e.preventDefault();
      try {
        if (imageUrl === "") {
          // If imageUrl is empty, create a new post with a unique ID as the document name
          await addDoc(collection(db, "posts"), {
            caption: caption,
            imageUrl: "",
            likes: likes,
            userName: user?.displayName,
            uid: user?.uid,
            timestamp: serverTimestamp(),
          });
        } else {
          const storage = getStorage();
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
  
          // Add a new document to the "posts" collection
          await addDoc(collection(db, "posts"), {
            caption: caption,
            imageUrl: url,
            likes: likes,
            userName: user?.displayName,
            uid: user?.uid,
            timestamp: serverTimestamp(),
          });
        }
        // Fetch the updated list of posts after adding a new post
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);
        const postsData = querySnapshot.docs.map((doc) => doc.data() as Post);
        setPosts(postsData);
        onClose();
      } catch (error) {
        // Handle errors
        console.log(error);
        // alert(error.message);
      }
    }
  };
  
// console.log();

const handleCloseModal = () => {
  setCaption("");
  // setImage(null);
  setImageUrl("");
};



  const sizes = ["xs", "sm", "md", "lg", "xl", "full"];
  
  return (
    <>
      <Center>
        <Modal isOpen={isOpen} onClose={()=>{onClose(); handleCloseModal();}} size={sizes}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf={"center"} fontWeight={"700"}>
              Create Post
            </ModalHeader>
            <ModalCloseButton bg={"#e4e6eb"} borderRadius={"50%"} p={3} />
            <ModalBody borderTop={"2px solid #e4e6eb"}>
              {/* Your modal content */}
              <Flex align={"center"} gap={1}>
                
                <Image
                  src ={user?.photoURL as string}
                  width={"50px"}
                  height={"50px"}
                  borderRadius={"50%"}
                  border={"2px solid white"}
                  objectFit={"cover"}
                />
                <Box>
                  <Text fontWeight={"700"} marginBottom={1}>
                  {user?.displayName}
                  </Text>
                  <Box
                    display={"flex"}
                    gap={1}
                    textAlign={"center"}
                    p={"2px 10px"}
                    bg={"#e4e6eb"}
                    borderRadius={"5px"}
                  >
                    <Image
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/4qsdCsLNqKi.png"
                      width={"15px"}
                      height={"15px"}
                      marginTop={"4px"}
                    />
                    Friends
                  </Box>
                </Box>
              </Flex>
              <Textarea
                height={"60px"}
                marginTop={2}
                value={caption} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setCaption(e.target.value)}
                placeholder={`What's in your mind, ${user?.displayName}`}
              />
                <Image w={"30%"}  borderRadius={"7px"}  src={imageUrl as string} alt="" />
              <Flex justifyContent={"space-between"} p={1}>
                <Image
                  src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                  width={"40px"}
                />
                <Image
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
                  color={"#e4e6eb"}
                  width={"28px"}
                  height={"32px"}
                />
              </Flex>
              <Flex
                justifyContent={"space-between"}
                border={"1px solid #e4e6eb"}
                p={3}
              >
                <Text fontWeight={"700"} marginTop={2}>
                  Add to your post
                </Text>
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                    width={"30px"}
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                  />
                  <Input
                    type="file"
                    display={"none"}
                    ref={fileInputRef}
                    accept="image/*"
                    
                    onChange={handleChange}
                  />
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/MqTJr_DM3Jg.png"
                    width={"30px"}
                  />
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
                    width={"30px"}
                  />
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/uywzfiZad5N.png"
                    width={"30px"}
                  />
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/j0Jp-GpONWx.png"
                    width={"30px"}
                  />

                  <Text m={2}>...</Text>
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                bg={"#0866ff"}
                width={"100%"}
                color={"white"}
                _hover={{ bg: "blue" }}
                onClick={handleUpload}
                isDisabled={!caption.trim() || !imageUrl}
                loadingText="Uploading..."
              >
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <Center>
        <Box
          marginTop={6}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          }
          width={["90%", "80%", "70%", "60%", "40%", "40%"]}
          m={3}
          p={4}
          borderRadius={"10px"}
        >
          <Flex gap={5} p={2} borderBottom={"3px solid #e4e6eb"}>
            <Image
              src={user?.photoURL as string}
              width={"40px"}
              height={"40px"}
              borderRadius={"50%"}
              border={"2px solid white"}
              objectFit={"cover"}
            />
            <Button
           
              borderRadius={"25px"}
              bg={"#e4e6eb"}
              marginRight={"5px"}
              color={"#818285"}
              p={"6px 220px"}
              textAlign={"start"}
              onClick={onOpen}
            >
            {`What's in your mind, ${user?.displayName}`}
            </Button>
          
          </Flex>

          <Flex justifyContent={"space-around"} p={1}>
            <Flex
              gap={2}
              p={"8px 20px"}
              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"
                width={"20px"}
              />
              <Text fontSize={"14px"} fontWeight={"500"} color={"#818285"}>
                {" "}
                Live video
              </Text>
            </Flex>

            <Flex
              gap={2}
              p={"8px 20px"}
              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                width={"20px"}
              />
              <Text fontSize={"14px"} fontWeight={"500"} color={"#818285"}>
                {" "}
                Photo/video
              </Text>
            </Flex>
            <Flex
              gap={2}
              p={"8px 20px"}
              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
                width={"20px"}
              />
              <Text fontSize={"14px"} fontWeight={"500"} color={"#818285"}>
                {" "}
                Feeling/activity
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
};
