import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, db, storage } from "../firebase";
import { FC, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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

const auth = getAuth(app);

const Signup: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<{
    day: string;
    month: string;
    year: string;
  }>({ day: "", month: "", year: "" });
  const [gender, setGender] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);
 
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handleonChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleonChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleonChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@") || !e.target.value.includes(".")) {
      setEmailError("Please enter a valid email address.");
    } else if (!e.target.value.endsWith("@gmail.com")) {
      setEmailError("Please use a Gmail address.");
    } else {
      setEmailError("");
    }
  };

  const handleonChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleonChangeBirthday = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthday((prevBirthday) => ({
      ...prevBirthday,
      [name]: value,
    }));
  };

  const handleOnChangeGender = (value: string) => {
    setGender(value);
  };

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
const handleSubmitSignupUser = async (e: React.FormEvent) => {
  e.preventDefault();
setIsLoading(true);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const storageRef = ref(storage, `${res.user?.uid}`);

    const uploadTask = uploadBytesResumable(storageRef, selectedFile!);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get the progress percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        // Update your progress bar or display the progress
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        const downloadURL: string = await getDownloadURL(
          uploadTask.snapshot.ref
        );

        if (res.user) {
          await updateProfile(res.user, {
            displayName: firstName + " " + lastName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: firstName + " " + lastName,
            email,
            photoURL: downloadURL,
            birthday,
            gender,
            bio: "",
          });
          navigate("/login");
        } else {
          console.log("current user is null");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
setIsLoading(false)
};


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
      <Box display={"flex"} justifyContent={"space-between"} flexDirection={"column"} mt={-4}>
        <Box>
          <Text fontSize={"32px"} fontWeight={"600"}>
            Sign Up
          </Text>
          <Text fontSize={"15px"} fontWeight={"400"} mb={2}>
            It's quick and easy.
          </Text>
        </Box> <hr />
        <Box display={"flex"}dir="column">
          <Input
            size={"sm"}
            type="file"
            border={"none"}
            accept="image/*"
            onChange={handleOnChangeFile}
            ml={-3} mt={4}
          />
        </Box>
      </Box>
     
      <Box as="form" onSubmit={handleSubmitSignupUser}>
        <Box display={"flex"} gap={4}>
          <Input
            bg={"rgb(245,246,247)"}
            placeholder="First name"
            type="text"
            value={firstName}
            mt={4}
            isRequired
            onChange={handleonChangeFirstName}
          />
          <Input
            bg={"rgb(245,246,247)"}
            value={lastName}
            type="text"
            placeholder="Surname"
            mt={4}
            onChange={handleonChangeLastName}
          />
        </Box>
        <Input
          bg={"rgb(245,246,247)"}
          type="email"
          value={email}
          placeholder="Email address"
          mt={4}
          onChange={handleonChangeEmail}
          isInvalid={!!emailError}
        />
        {emailError && (
          <Text color="red" fontSize="sm">
            {emailError}
          </Text>
        )}
        <Input
          bg={"rgb(245,246,247)"}
          type="password"
          value={password}
          placeholder="New password"
          mt={4}
          onChange={handleonChangePassword}
          isInvalid={!!passwordError}
        />
        {passwordError && (
          <Text color="red" fontSize="sm">
            {passwordError}
          </Text>
        )}

        <Text fontSize={"13px"} mt={4}>
          Date of birth
        </Text>
        <Box display={"flex"} gap={4} mt={1}>
          <Select h={"35px"} name="day" onChange={handleonChangeBirthday}>
            {Days.map((days) => (
              <option key={days} value={days}>
                {days}
              </option>
            ))}
          </Select>

          <Select h={"35px"} name="month" onChange={handleonChangeBirthday}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </Select>

          <Select h={"35px"} name="year" onChange={handleonChangeBirthday}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Box>
        <Text fontSize={"13px"} mt={4}>
          Gender
        </Text>
        <RadioGroup
          onChange={handleOnChangeGender}
          value={gender}
          display={"flex"}
        >
          <Flex
            border="1px solid gray"
            borderRadius="md"
            p={1}
            mr={2}
            mb={2}
            flexDirection="row"
            w={"33%"}
            h={"35px"}
          >
           <label htmlFor="female" style={{ cursor: "pointer" }}>
    Female
  </label>
            <Radio
            id="female"
              value="female"
              ml={["20%", "50%", "52%", "68%", "44%", "75%"]}
            ></Radio>
          </Flex>
          <Flex
            border="1px solid gray"
            borderRadius="md"
            p={1}
            mr={2}
            mb={2}
            w={"33%"}
            flexDirection="row"
            h={"35px"}
          >
          <label htmlFor="male" style={{ cursor: "pointer" }}>
    Male
  </label>
            <Radio
            id="male"
              value="male"
              ml={["38%", "62%", "64%", "75z%", "57%", "80%"]}
            ></Radio>
          </Flex>

          <Flex 
            border="1px solid gray"
            borderRadius="md"
            p={1}
            mr={2}
            mb={2}
            flexDirection="row"
            w={"33%"}
            h={"35px"}
          >
            <label htmlFor="custom" style={{ cursor: "pointer" }}>
    Custom
  </label>
            <Radio id="custom"
              value="custom"
              ml={["14%", "46%", "50%", "65%", "40%", "75%"]}
              borderWidth="2px"
            ></Radio>
          </Flex>
        </RadioGroup>
        <Box>
          <Text fontSize={"13px"} color={"gray"} mb={4}>
            Privacy who use our service may have uploaded your contact
            information to Facebook.{" "}
            <Text
              color={"rgb(48,89,127)"}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              as={"span"}
            >
              Learn more
            </Text>
          </Text>

          <Text fontSize={"13px"} color={"gray"}>
            By clicking Sign Up, you agree to our{" "}
            <Text
              color={"rgb(48,89,127)"}
              as={"span"}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Terms,
            </Text>{" "}
            <Text
              color={"rgb(48,89,127)"}
              as={"span"}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {" "}
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text
              color={"rgb(48,89,127)"}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              as={"span"}
            >
              Cookies Policy.
            </Text>{" "}
            you may receive SMS notifications from us and can opt out at any
            time.
          </Text>
        </Box>
        <Flex justifyContent="center" mt={4}>
            <Button
              type="submit"
              bg={"rgb(0,164,0)"}
              w={"50%"}
              color={"white"}
              fontSize={"18px"}
              lineHeight={"23px"}
              fontWeight={"600"}
              _hover={{
                bgGradient:
                  "linear(green.500 0%, green.600 25%, green.600 50%)",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </Flex>
      </Box>
    </Box>
  </Box>
);

};

export default Signup;
