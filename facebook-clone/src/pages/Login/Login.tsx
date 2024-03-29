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
    <Center  py={2} >
      <Flex flexDir={["column", "column", "row", "row", "row"]} alignItems={"center"}  justify={"center"} >
        <Box width={[ "100%","80%","70%","50%", "50%"]} padding={"50px"} >
    <Image width={"300px"} src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg'/>
      <Text paddingLeft={"10px"} fontSize={"25px"}>Facebook helps you connect and share with the people in your life.</Text>
      </Box>
     <Box width={["100%","80%","70%","50%", "50%"]} padding={"40px"} >
     <Flex  flexDir={"column"} alignItems={"center"} justifyContent={"center"} padding={"30px"} borderRadius={"5px"} gap={"15px"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
      <Input type='email' placeholder='Email address' />
      <Input type='password' placeholder='Password' />
      <Button colorScheme={"blue"} width={"100%"}>Log in</Button>
      <Text >Forgot Password</Text>
      <Divider />
      <Button background={"#42B72A"}color={"white"} _hover={{background:"green"}} >Create New Account</Button>
      </Flex>
     </Box>
      </Flex>
      
    </Center>
    <Loginfooter/>
    </>
    
   
  )
}