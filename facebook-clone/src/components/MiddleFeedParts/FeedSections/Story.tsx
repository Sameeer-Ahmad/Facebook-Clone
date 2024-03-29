

import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { StoryCards } from "./StoryCards";

export const Story = () => {
  return (
    <>
   <Center>
    <Flex>
      <Box
        // border={"1px solid"}
        boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}
        width={"130px"}
        height={"220px"}
        margin={3}
        borderRadius={"10px"}
      >
        {/* <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          width={"30px"}
          height={"30px"}
          borderRadius={"50%"}
          border={"3px solid blue"}
          position={"absolute"}
          left={"25px"}
          top={"20px"}
          objectFit={"cover"}
        /> */}
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          borderRadius={"10px 10px 0 0"}
          objectFit={"cover"}
        />
        <SmallAddIcon
          fontSize={"20px"}
          borderRadius={"50%"}
          color={"white"}
          border={"2px solid"}
          width={"30px"}
          height={"30px"}
          bg={"blue"}
          position={"relative"}
          top={"-15px"}
          left={"50px"}
          objectFit={"cover"}
          
        />
        <Text
          fontSize={"sm"}
          fontWeight={500}
          textAlign={"center"}
          marginTop={1}
        >
          Create story
        </Text>
      </Box>
      <StoryCards/>
      </Flex>
      </Center>
    </>
  );
};