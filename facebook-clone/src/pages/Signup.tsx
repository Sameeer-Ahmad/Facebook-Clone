import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const Days: number[] = [];
for (let day = 1; day <= 31; day++) {
  Days.push(day);
}

const months = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

const years: number[] = [];
for (let year = 2024; year >= 1905; year--) {
  years.push(year);
}
const Signup = () => {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={4}
      gap={4}
    >
      <Image
        w={["25%", "25%", "25%", "24%", "15%", "14%"]}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1280px-Facebook_Logo_%282019%29.svg.png"
      />

      <Box
        p={4}
        boxShadow={"md"}
        borderRadius={"10px"}
        w={["90%", "80%", "70%", "60%", "35%"]}
        bg={"white"}
      >
        <Box mt={-4}>
          <Text fontSize={"32px"} fontWeight={"600"}>
            Sign Up
          </Text>
          <Text fontSize={"15px"} fontWeight={"400"} mb={2}>
            It's quick and easy.
          </Text>
        </Box>
        <hr />
        <Box as="form">
          <Box display={"flex"} gap={4}>
            <Input bg={"rgb(245,246,247)"} placeholder="First name" mt={4} isRequired />
            <Input bg={"rgb(245,246,247)"} placeholder="Surname" mt={4} />
          </Box>
          <Input bg={"rgb(245,246,247)"} placeholder="Email address" mt={4} />
          <Input bg={"rgb(245,246,247)"} placeholder="New password" mt={4} />

          <Text fontSize={"13px"} mt={4}>Date of birth</Text>
          <Box display={"flex"} gap={4} mt={1}>
            <Select h={'35px'}>
              {Days.map((days) => (
                <option key={days} value="day">
                  {days}
                </option>
              ))}
            </Select>

            <Select h={'35px'}>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>

            <Select h={'35px'}>
              {years.map((year) => (
                <option key={year} value="year">
                  {year}
                </option>
              ))}
            </Select>
          </Box>
          <Text fontSize={"13px"} mt={4}>Gender</Text>
          <RadioGroup display={'flex'}  defaultValue="male" >
          <Flex border="1px solid gray" borderRadius="md" p={1} mr={2}  mb={2} flexDirection="row" w={'33%'} h={'35px'}>
          <span>Female</span>
        <Radio  value="female" ml={['20%','50%','52%','68%','44%','75%']} >
        
        </Radio>
    
      </Flex>
      <Flex border="1px solid gray" borderRadius="md" p={1} mr={2} mb={2} w={'33%'} flexDirection="row" h={'35px'}>
      <span>Male</span>
        <Radio  value="male" ml={['38%','62%','64%','75z%','57%','80%']} >
        
        </Radio>
      
      </Flex>
  
      <Flex border="1px solid gray" borderRadius="md" p={1} mr={2} mb={2}  flexDirection="row" w={'33%'} h={'35px'}>
      <span>Custom</span>
        <Radio value="custom" ml={['14%','46%','50%','65%','40%','75%']} borderWidth="2px">
        </Radio>
        
      </Flex>
    </RadioGroup>
    <Box>
      <Text fontSize={"13px"} color={'gray'} mb={4}>Privacy who use our service may have uploaded your contact information to Facebook.      <Text color={'rgb(48,89,127)'
} _hover={{cursor:"pointer", textDecoration:"underline"}} as={'span'}>Learn more</Text></Text>

      <Text fontSize={"13px"} color={'gray'}>By clicking Sign Up, you agree to our <Text color={'rgb(48,89,127)'
} as={'span'}  _hover={{cursor:"pointer", textDecoration:"underline"}}>Terms,</Text> <Text color={'rgb(48,89,127)'
} as={'span'}  _hover={{cursor:"pointer", textDecoration:"underline"}}> Privacy Policy</Text> and <Text color={'rgb(48,89,127)'
}  _hover={{cursor:"pointer", textDecoration:"underline"}} as={'span'}>Cookies Policy.</Text> you may receive SMS notifications from us and can opt out at any time.</Text>
    </Box>
    <Flex justifyContent="center">
      <Button bg={'rgb(0,164,0)'} w={'50%'} color={'white'} fontSize={"18px"} lineHeight={"23px"} fontWeight={"600"} mt={2} >
        Sign Up
      </Button>
    </Flex>
        </Box>
       
      </Box>
    </Box>
  );
};
export default Signup;
