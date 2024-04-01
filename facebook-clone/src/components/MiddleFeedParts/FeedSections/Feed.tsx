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

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db, storage } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Feed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // const [useName, setUserName] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement | any>(null);


  const auth = getAuth();
  // const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {});
  const user = auth.currentUser;
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setImage(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCaption("");
    // setImage("");

   setImageUrl("")
    if (caption === "" && imageUrl === "") {
        console.log("Prevented access to photo and caption submission ");
    } else {
        e.preventDefault();
        if (imageUrl === "") {
            // If imageUrl is empty, create a new post with a unique ID as the document name
            addDoc(collection(db, "posts"), {
                caption: caption,
                imageUrl: "",
                likes: likes,
                userName: user?.displayName,
                uid: user?.uid,
            }).then(() => {
                // After adding the document, reset caption and image states
                setCaption("");
                // setImage("");
                setImageUrl("")
            }).catch((error) => {
                // Handle errors
                console.log(error);
                alert(error.message);
            });
        } else {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytes(storageRef, image);

            uploadTask.then((snapshot) => {
                // Upload completed successfully, get the download URL
                getDownloadURL(storageRef).then((url: string) => {
                    // Add a new document to the "posts" collection
                    addDoc(collection(db, "posts"), {
                        caption: caption,
                        imageUrl: url,
                        likes: likes,
                        userName: user?.displayName,
                        uid: user?.uid,

                    }).then(() => {
                        // After adding the document, reset caption and image states
                      console.log("Uploaded successfully");
                      
                        setCaption("");
                        // setImage("");
                        setImageUrl("")
                    }).catch((error) => {
                        // Handle errors
                        console.log(error);
                        alert(error.message);
                    });
                });
            }).catch((error) => {
                // Handle errors
                console.log(error);
                alert(error.message);
            });
        }
    }
};

const handleCloseModal = () => {
  setCaption("");
  // setImage(null);
  setImageUrl("");
};



  const sizes = ["xs", "sm", "md", "lg", "xl", "xl"];
  
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
                  src={user?.photoURL as string}

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
                  <Text
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
                  </Text>
                </Box>
              </Flex>
              <Textarea
                height={"60px"}
                marginTop={2}

                value={caption}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCaption(e.target.value)
                }
                placeholder={`What's in your mind, ${user?.displayName}`}
              />
              <Image
                w={"250px"}
                borderRadius={"7px"}
                src={imageUrl as string}
                alt=""
              />

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
              >
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <Center>
        <Box

          marginTop={[4, 6]}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          }
          // width={["90%", "80%", "70%", "60%", "50%"]}
          width={"auto"}
          m={[2, 3]}

          p={4}
          borderRadius={"10px"}
        >
          <Flex gap={5} p={2} borderBottom={"3px solid #e4e6eb"}>
            <Image
              src={user?.photoURL as string}

              width={["30px", "40px", "50px"]}
              height={["30px", "40px", "50px"]}

              borderRadius={"50%"}
              border={"2px solid white"}
              objectFit={"cover"}
            />
            <Button

              borderRadius={"25px"}
              bg={"#e4e6eb"}
              marginRight={"5px"}
              color={"#818285"}

              width={["auto", "100%", "100%"]}
              textAlign={"start"}
              onClick={onOpen}
            >
              {`What's in your mind, ${user?.displayName}?`}
            </Button>

          </Flex>

          <Flex justifyContent={"space-around"} p={1}>
            <Flex

              gap={[1, 2, 3]}
              p={["6px 10px", "8px 20px"]}

              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"

                width={["16px", "20px", "24px"]}
              />
              <Text
                fontSize={["12px", "14px", "16px"]}
                fontWeight={"500"}
                color={"#818285"}
              >

                Live video
              </Text>
            </Flex>

            <Flex

              gap={[1, 2, 3]}
              p={["6px 10px", "8px 20px"]}

              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"

                width={["16px", "20px", "24px"]}
              />
              <Text
                fontSize={["12px", "14px", "16px"]}
                fontWeight={"500"}
                color={"#818285"}
              >

                {" "}
                Photo/video
              </Text>
            </Flex>
            <Flex

              gap={[1, 2, 3]}
              p={["6px 10px", "8px 20px"]}

              cursor="pointer"
              _hover={{
                bg: "#e4e6eb",
              }}
            >
              <Image
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"

                width={["16px", "20px", "24px"]}
              />
              <Text
                fontSize={["12px", "14px", "16px"]}
                fontWeight={"500"}
                color={"#818285"}
              >

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
