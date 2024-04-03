import {
  Stack,
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Divider,
  Center,
} from "@chakra-ui/react";
import React from "react";

const Loginfooter = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Center as={Stack} maxW={"100%"} py={10}>
        <Flex gap={"15px"} flexWrap={"wrap"}>
          <span>English(UK)</span>
          <span>ଓଡ଼ିଆ</span>
          <span>हिन्दी</span>
          <span>తెలుగు</span>
          <span>اردو</span>
          <span>বাংলা</span>
          <span> தமிழ்</span>
          <span>मराठी</span>
          <span>ગુજરાતી</span>
        </Flex>
        <Divider />
        <SimpleGrid gap={"10px"}>
          <Stack>
            <Flex gap={"15px"} justify={"center"} flexWrap={"wrap"} p={"6px"}>
              <span>Sign </span>
              <span>Login</span>
              <span>inMessengerFacebook</span>
              <span>Lite</span>
              <span>Video</span>
              <span>placess</span>
              <span>games</span>
              <span>Marcketplace</span>
              <span>Meta</span>
              <span>paymeta</span>
              <span>storemeta</span>
              <span>meta</span>
              <span>with meta</span>
              <span>uplog</span>
              <span>Threds</span>
              <span>insta</span>
              <span>reels</span>
              <span>short</span>
              <span>Cookies</span>
              <span>Information</span>
            </Flex>
          </Stack>
          <Stack>
            <Flex gap={"15px"} justify={"center"} flexWrap={"wrap"} p={"6px"}>
              <span>CentrePrivacy </span>
              <span>AIInstagram</span>
              <span>Privacy policy</span>
              <span>Voting</span>
              <span>Video</span>
              <span>placess</span>
              <span>games</span>
              <span>Marcketplace</span>
              <span>Meta</span>
              <span>paymeta</span>
              <span>storemeta</span>
              <span>meta</span>
              <span>with meta</span>
              <span>uplog</span>
              <span>Threds</span>
              <span>insta</span>
              <span>reels</span>
              <span>short</span>
              <span>videos</span>
              <span>Cookies</span>
            </Flex>
          </Stack>
          <Stack>
            <Flex gap={"15px"} justify={"center"} flexWrap={"wrap"} p={"6px"}>
              <span>security </span>
              <span>adCreate </span>
              <span>inMessengerFacebook</span>
              <span>Lite</span>
              <span>Video</span>
              <span>placess</span>
              <span>games</span>
              <span>Marcketplace</span>
              <span>Meta</span>
              <span>paymeta</span>
              <span>storemeta</span>
              <span>meta</span>
              <span>with meta</span>
              <span>uplog</span>
              <span>Threds</span>
              <span>insta</span>
              <span>Cookies</span>
              <span>short</span>
              <span>videos</span>
              <span>uplog</span>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Center>
      <Text ml={"30px"} fontSize={"18px"}>
        {" "}
        Meta © 2024
      </Text>
    </Box>
  );
};

export default Loginfooter;
