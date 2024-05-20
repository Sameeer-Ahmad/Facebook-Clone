import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { StoryCards } from "./StoryCards";
import { getAuth } from "@firebase/auth";


export const Story = () => {
  const auth = getAuth();
const user = auth.currentUser;


  return (
    <>
      <Center>
        <Flex  >
          <Box
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            }
            width={["100%", "130px"]}
            height={["180px", "220px"]}
            margin={3}
            borderRadius={"10px"}
          >
            <Image
            key={user?.photoURL} 
              src={user?.photoURL as any } 
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
            >
              Create story
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
              src="https://imgs.search.brave.com/hbmdnaefoN4Vh-Scm9h_klkMZx2yp67yKPfaYBjUfqw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY3LzFl/LzcwLzY3MWU3MDQ4/Yzg1ODgzZmJjZmIz/YWZmNzAyODJlMDk0/LmpwZw"
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
             Anna
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
              src="https://imgs.search.brave.com/TwXHm7rtO_10TYl34suFB86pE7EtN28j2E4GQDGoL-o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E0L2Vm/L2Y0L2E0ZWZmNDJi/NjNjMWUxMTdmMDk2/MjMwMWJlYTcyMzQx/LmpwZw"
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
              Jenny 
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
              src="https://imgs.search.brave.com/V3LMK5GhGaX1tKgpY7euvvtfHTXKxaD_Gcinp2ZyYCU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YW5kc2NhcGUtd2l0/aC1waW5lLWZvcmVz/dHMtbW91bnRhaW5z/XzY2MTIwOS0xODMu/anBnP3NpemU9NjI2/JmV4dD1qcGc"
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
              Alan Walker
            </Text>
          </Box>
        </Flex>
      </Center>
    </>
  );
};
