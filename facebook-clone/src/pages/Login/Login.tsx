'use client'

import {
  Box,
  Center,
  Image,
  Flex,
  Text,
  Button, 
  Input,
  Divider,
} from '@chakra-ui/react'
import Loginfooter from './Loginfooter'

export default function Login() {
  return (
    <>
    <Center height={"80vh"} py={2} >
      <Box width={"50%"} padding={"50px"}>
    <Image width={"300px"} src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg'/>
      <Text paddingLeft={"10px"} fontSize={"25px"}>Facebook helps you connect and share with the people in your life.</Text>
      </Box>
     <Box width={"50%"} padding={"40px"}>
     <Flex width={"70%"} flexDir={"column"} alignItems={"center"} justifyContent={"space-evenly"} padding={"30px"} borderRadius={"5px"} gap={"15px"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
      <Input type='text' placeholder='Email address or Phone number' />
      <Input type='password' placeholder='Password' />
      <Button colorScheme={"blue"} width={"100%"}>Log in</Button>
      <Text >Forgot Password</Text>
      <Divider />
      <Button background={"#42B72A"} color={"white"} >Create New Account</Button>
      </Flex>
     </Box>
      
    </Center>
    <Loginfooter/>
    </>
    
   
  )
}