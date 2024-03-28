import { Box, Flex, Image, Input } from "@chakra-ui/react";

export const Feed = () => {
  return (
    <>
      <Box
        marginTop={6}
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        width={"50%"}
        m={3}
      >
        <Flex gap={5} p={5}>
          <Image
            src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
            width={"40px"}
            height={"40px"}
            borderRadius={"50%"}
            border={"3px solid white"}
            objectFit={"cover"}
          />
          <Input
            placeholder="What's in yopur mind, Sujeet?"
            borderRadius={"25px"}
          />
        </Flex>
      </Box>
    </>
  );
};
