import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { StoryCards } from "./StoryCards";
import { getAuth } from "@firebase/auth";
const auth=getAuth();
const user=auth.currentUser;
export const Story = () => {
  return (
    <>
      <Center>
        <Flex>
          <Box
            // border={"1px solid"}
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            }
            width={["100%", "130px"]}
            height={["180px", "220px"]}
            margin={3}
            borderRadius={"10px"}
          >
            <Image
              src={user?.photoURL as string}
              borderRadius={"10px 10px 0 0"}
              objectFit={"cover"}
              width="100%"
              height="70%"
            />

            <SmallAddIcon
              fontSize={["16px", "20px", "24px"]}
              borderRadius={"50%"}
              color={"white"}
              border={"2px solid"}
              width={["24px", "30px", "36px"]}
              height={["24px", "30px", "36px"]}
              bg={"blue"}
              position={"relative"}
              top={["-15px", "-15px", "-20px"]}
              left={["40px", "40px", "50px"]}
              objectFit={"cover"}
            />

            <Text
              fontSize={["10px", "sm", "sm", "md", "md", "md"]}
              fontWeight={500}
              textAlign={"center"}
              // marginTop={1}
            >
              Create story
            </Text>
          </Box>
          {/* <StoryCards/> */}
          <Box
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
            }
            width={["100%", "130px"]}
            height={["180px", "220px"]}
            margin={3}
            borderRadius={"10px"}
          >
     
            <Image
              src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
              borderRadius={"10px"}
              height={["180px", "220px"]}
              marginTop={["0", "0px"]}
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight={500}
              textAlign={"center"}
              marginTop={6}
              position={"relative"}
              bottom={"50px"}
              left={"-5px"}
              color={"white"}
            >
              Sujeet Kumar
            </Text>
          </Box>
          <Box
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
            }
            width={["100%", "130px"]}
            height={["180px", "220px"]}
            margin={3}
            borderRadius={"10px"}
          >
    
            <Image
              src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
              borderRadius={"10px"}
              height={["180px", "220px"]}
              marginTop={["0", "0px"]}
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight={500}
              textAlign={"center"}
              marginTop={6}
              position={"relative"}
              bottom={"50px"}
              left={"-5px"}
              color={"white"}
            >
              Sujeet Kumar
            </Text>
          </Box>
          <Box
          display={["none", "block"]}
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
            }
            width={["100%", "130px"]}
            height={["150px", "220px"]}
            margin={3}
            borderRadius={"10px"}
          >
           
            <Image
              src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
              borderRadius={"10px"}
              height={["200px", "220px"]}
              marginTop={["0", "0px"]}
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight={500}
              textAlign={"center"}
              marginTop={6}
              position={"relative"}
              bottom={"50px"}
              left={"-10px"}
              color={"white"}
            >
              Sujeet Kumar
            </Text>
          </Box>
        </Flex>
      </Center>
    </>
  );
};
