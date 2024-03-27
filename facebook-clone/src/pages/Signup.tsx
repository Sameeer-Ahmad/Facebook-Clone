import { Box, Heading, Image, Input, Text } from "@chakra-ui/react"

const Signup=()=>{
    return (
       <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={"10"} gap={6}>
        <Image w={["25%","25%","25%","25%","25%","25%"]}  src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1280px-Facebook_Logo_%282019%29.svg.png'/>

         <Box p={4} boxShadow={'md'} borderRadius={"10px"} w={['90%','80%','70%','60%','40%']} bg={'white'} >
        <Box  >
        <Text fontSize={"32px"} fontWeight={"600"}>Sign Up</Text>
         <Text fontSize={"15px"} fontWeight={"400"}>It's quick and easy.</Text>
        </Box>
         <hr />
         <Box as="form">
          <Box display={"flex"} gap={4}> 
          <Input bg={'rgb(245,246,247)'} placeholder='First name'  mt={4} />
           <Input bg={'rgb(245,246,247)'} placeholder='Surname' mt={4} /></Box>
           <Input bg={'rgb(245,246,247)'} placeholder='Email address' mt={4} />
           <Input bg={'rgb(245,246,247)'} placeholder='New password' mt={4} />
           <Text fontSize={"13px"} fontWeight={"400"}>Birthday</Text>


         </Box>
       </Box>
         </Box>
       
    )
}
export default Signup