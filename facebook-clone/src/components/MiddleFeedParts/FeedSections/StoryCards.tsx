import { Box, Image, Text } from "@chakra-ui/react";

export const StoryCards = () => {
  return (
    <>
      <Box
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        }
        width={["100%", "130px"]}
        height={["200px", "220px"]}
        margin={3}
        borderRadius={"10px"}
      >
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          width={"30px"}
          height={"30px"}
          borderRadius={"50%"}
          border={"3px solid blue"}
          // display={"flex"}
          position={"relative"}
          left={["10px", "20px"]} 
          top={"8px"}
          objectFit={"cover"}
        />
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          borderRadius={"10px"}
          height={["180px", "220px"]}
          marginTop={["0", "-30px"]}
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
      <Box
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        }
        width={["100%", "130px"]}
        height={["200px", "220px"]}
        margin={3}
        borderRadius={"10px"}
      >
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          width={"30px"}
          height={"30px"}
          borderRadius={"50%"}
          border={"3px solid blue"}
          // display={"flex"}
          position={"relative"}
          left={"10px"}
          top={"8px"}
          objectFit={"cover"}
        />
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          borderRadius={"10px"}
          height={["180px", "220px"]}
          marginTop={["0", "-30px"]}
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
      {/* <Box
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        }
        width={"130px"}
        // display={"flex"}
        height={"220px"}
        margin={3}
        borderRadius={"10px"}
      >
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          width={"30px"}
          height={"30px"}
          borderRadius={"50%"}
          border={"3px solid blue"}
          // display={"flex"}
          position={"relative"}
          left={"10px"}
          top={"8px"}
          objectFit={"cover"}
        />
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          borderRadius={"10px"}
          height={"220px"}
          // marginBottom={"20px"}
          marginTop={"-30px"}
        />
        <Text
          fontSize={"sm"}
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
      <Box
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        }
        width={"130px"}
        // display={"flex"}
        height={"220px"}
        margin={3}
        borderRadius={"10px"}
      >
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          width={"30px"}
          height={"30px"}
          borderRadius={"50%"}
          border={"3px solid blue"}
          // display={"flex"}
          position={"relative"}
          left={"10px"}
          top={"8px"}
          objectFit={"cover"}
        />
        <Image
          src="https://imgs.search.brave.com/W0m65Ec8YpeLX-lOk5PobJNCAWt8p0U5UHz_3AwrS0A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFmL2Yz/L2MzLzFmZjNjMzVh/MzVjZTNmZjAzZWYx/OTAyMTJiZTIwZmU4/LmpwZw"
          borderRadius={"10px"}
          height={"220px"}
          // marginBottom={"20px"}
          marginTop={"-30px"}
        />
        <Text
          fontSize={"sm"}
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
      </Box> */}
    </>
  );
};
