// import { Box, Center, Flex, Image, Input, Text } from "@chakra-ui/react";

// export const Feed = () => {
//   return (
//     <>
//     <Center>
//       <Box
//         marginTop={6}
//         boxShadow={
//           "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
//         }
//         width={["90%","80%","70%","60%","40%","40%"]}
//         m={3}
//       >
//         <Flex gap={5} p={2}>
//           <Image
//             src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
//             width={"40px"}
//             height={"40px"}
//             borderRadius={"50%"}
//             border={"2px solid white"}
//             objectFit={"cover"}
//           />
//           <Input
//             placeholder="What's in yopur mind, Sujeet?"
//             borderRadius={"25px"}
//             bg={"#e4e6eb"}
//             marginRight={"5px"}
//           />
//         </Flex>
//         <hr />
//         <Flex justifyContent={"space-around"} p={1}>
//           <Flex
//          gap={2}
//             p={"8px 20px"}
//             cursor="pointer"
//             _hover={{
//               bg: "#e4e6eb",
//             }}
//           >
//             <Image src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png" width={"20px"}/>
//            <Text    fontSize={"14px"}
//             fontWeight={"500"}
//             color={"#818285"}> Live video</Text>
//           </Flex>
//           {/* <Text
//             fontSize={"14px"}
//             fontWeight={"500"}
//             color={"#818285"}
//             p={"8px 20px"}
//             cursor="pointer"
//             _hover={{
//               bg: "#e4e6eb",
//             }}
//           >
//             Photo/video
//           </Text> */}
//           {/* <Text
//             fontSize={"14px"}
//             fontWeight={"500"}
//             color={"#818285"}
//             p={"8px 25px"}
//             cursor="pointer"
//             _hover={{
//               bg: "#e4e6eb",
//             }}
//           >
//             Feeling/activity
//           </Text> */}
//                <Flex
//          gap={2}
//             p={"8px 20px"}
//             cursor="pointer"
//             _hover={{
//               bg: "#e4e6eb",
//             }}
//           >
//             <Image src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png" width={"20px"}/>
//            <Text    fontSize={"14px"}
//             fontWeight={"500"}
//             color={"#818285"}> Photo/video</Text>
//           </Flex>
//           <Flex
//          gap={2}
//             p={"8px 20px"}
//             cursor="pointer"
//             _hover={{
//               bg: "#e4e6eb",
//             }}
//           >
//             <Image src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png" width={"20px"}/>
//            <Text    fontSize={"14px"}
//             fontWeight={"500"}
//             color={"#818285"}> Feeling/activity</Text>
//           </Flex>
//         </Flex>
//       </Box>
//       </Center>
//     </>
//   );
// };

import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
// import FeedModal from "../PostModals/FeedModal";
// import {storage,db} from ".."
// import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Feed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {});

  // Make sure to unsubscribe when component unmounts

  //  const user=fire
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={"center"} fontWeight={"700"} >Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody borderTop={"2px solid #e4e6eb"} >
            {/* Your modal content */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
              src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
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
              What's in your mind, Sujeet?
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
