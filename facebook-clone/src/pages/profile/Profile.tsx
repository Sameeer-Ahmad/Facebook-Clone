import React from "react";
import {
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

function Profile() {
  return (
    <Center>
      <Box
        //   maxW={'270px'}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
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
  );
}

export default Profile;
