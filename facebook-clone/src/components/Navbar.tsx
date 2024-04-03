import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Image,
  Tooltip,
  Text,
  FormControl,
  FormLabel,
  Switch,
  ColorModeScript,
  ColorModeProvider,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AvatarBadge,

  IconButton,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Drawer,
  DrawerBody,

  useColorMode,
  Skeleton,

} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import facebook_logo from "../Images/Facebook_logo.png";
import { FaSearch } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { LuStore } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useBreakpointValue } from '@chakra-ui/react';
import { TfiPencilAlt } from "react-icons/tfi";
import { IoBook } from "react-icons/io5";
import { FaFilm } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";
import { BsFillFlagFill } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";



import '../App.css';
import facebook from "../Images/Facebook.png"
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";

import Friends from "../Images/friend.png";
import Groups from "../Images/2.png";
import Market from "../Images/3.png";
import Watch from "../Images/4.png";
import Memories from "../Images/5.png";
import Events from "../Images/6.png";
import Gaming from "../Images/7.png";
import Gallery from "../Images/8.png";
import Videos from "../Images/9.png";
import Messages from "../Images/10.png";
import Tutorials from "../Images/11.png";
import Courses from "../Images/12.png";
import Fund from "../Images/13.png";

import { element } from "prop-types";
import Sidebar from "./Sidebar";
import { app, db } from "../firebase"; // Import Firebase configuration
import { QueryDocumentSnapshot, collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";


interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  fontSize: string[];
  tooltipLabel: string;
}

interface SearchResult {
  uid: string;
  displayName: string;
}
interface Notification {
  id: string;
  content: string;
}


const NavLink = (props: NavLinkProps) => {
  const { children, to, fontSize, tooltipLabel } = props;
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const defaultStyle = {
    color: 'grey'
  };

  const activeStyle = {
    color: 'blue',
    textDecoration: "underline",
    position: 'relative',
  };

  const iconStyle = isActive ? activeStyle : defaultStyle;

  return (
    <Tooltip label={tooltipLabel}>
      <Link
        to={to}
        className={isActive ? 'activeLink' : ''}
        style={{
          color: isActive ? activeStyle.color : defaultStyle.color
        }}
      >
        <Box
          as="div"
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: "underline",
            color: "blue",
          }}
          fontSize={fontSize}
          textDecoration={isActive ? 'underline' : 'none'}
          position="relative"
        >
          <Flex alignItems="center" justifyContent="center">
            {React.cloneElement(children as React.ReactElement, { style: iconStyle })}
          </Flex>
          {isActive && (
            <Box
              as="div"
              position="absolute"
              bottom="-2px"
              left="0"
              w="100%"
              h="2px"
              bg="currentColor"
            />
          )}
        </Box>
      </Link>
    </Tooltip>
  );
};


const Spacer = ({ size }: { size: string }) => {
  const spacing = size === "medium" || size === "small" ? "10px" : "40px";

  return <Box marginX={spacing} />;
};

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  //  const { toggleColorMode, colorMode } = useColorMode(); // Extract colorMode
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isntMenuOpen, setIsMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  // ----logout-------
  const navigate = useNavigate();
  const auth = getAuth(app);


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to login page after successful logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // ------logout ends------------


  // search starts------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);



  useEffect(() => {
    const searchFirebase = async () => {
      setSearching(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const results: SearchResult[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.displayName.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({ uid: doc.id, displayName: userData.displayName });
          }
        });
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching Firestore:", error);
      } finally {
        setSearching(false);
      }
    };

    if (searchTerm) {
      searchFirebase();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // search functionality ends----------------


  // ---------notification functionality starts here-------


  // const [notifications, setNotifications] = useState<Notification[]>([]);


  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'notifications'));
  //       const fetchedNotifications: Notification[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
  //         id: doc.id,
  //         content: doc.data().content // Assuming content is a field in your notification document
  //       }));
  //       setNotifications(fetchedNotifications);
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);


  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const fetchedNotifications: Notification[] = [];
      snapshot.forEach((doc) => {
        fetchedNotifications.push({ id: doc.id, content: doc.data().content });
      });
      setNotifications(fetchedNotifications);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);








  // -notification functionality ends here-------------------



  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      onOpen();
    } else {
      onClose();
    }
  };



  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const link = [
    {
      to: "/",
      display: <BiHomeAlt />,
      tooltipLabel: "Home"
    },
    {
      to: "/friends",
      display: <FaUserFriends />,
      tooltipLabel: "Friends"
    },
    {
      to: "/watch",
      display: <MdOutlineOndemandVideo />,
      tooltipLabel: "Watch"
    },
    {
      to: "/marketplace",
      display: <LuStore />,
      tooltipLabel: "Marketplace"
    },
    {
      to: "/groups",
      display: <HiOutlineUserGroup />,
      tooltipLabel: "Groups"
    },
  ];

  const Midlink = [
    {
      to: "/",
      display: <BiHomeAlt />,
      tooltipLabel: "Home"
    },
    {
      to: "/friends",
      display: <FaUserFriends />,
      tooltipLabel: "Friends"
    },
    {
      to: "/watch",
      display: <MdOutlineOndemandVideo />,
      tooltipLabel: "Watch"
    },
    {
      to: "/marketplace",
      display: <LuStore />,
      tooltipLabel: "Marketplace"
    }
  ];

  const handleToggleColorMode = () => {
    if (colorMode === 'light') {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = "white";
      toggleColorMode();
    } else {
      document.body.style.backgroundColor = 'rgb(240,242,245)';
      document.body.style.color = "black";
      toggleColorMode();
    }
  };





  const spacingSize = useBreakpointValue({ base: 'small', sm: '2px', md: 'large', lg: "lg", xl: "xl" });
  const bgColor = useColorModeValue('white', 'gray.900');
  const searchBgColor = useColorModeValue("white", "gray.800");
  const searchInputColor = useColorModeValue("gray.100", "gray.700");
  const searchTextColor = useColorModeValue("gray.900", "white");


  const breakpoint = useBreakpointValue({ base: "base", sm: "sm", md: "md" });
  const buttonText = colorMode === 'light' ? 'Light Mode' : 'Dark Mode';
  // const auth = getAuth();
  // const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {});
  const user = auth.currentUser;
  return (

    <>

      <ColorModeScript />
      {breakpoint === "md" && (
        <ColorModeProvider>
          <Box bg={bgColor} px={3} boxShadow={"lg"} width="100%" top={0} zIndex={1000} position={"sticky"} >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <Flex alignItems="center">
                <Avatar
                  borderRadius="full"
                  boxSize="57px"
                  src={facebook_logo}
                />
                {/* ------------------------------ -------------------------------*/}
                <Box display={{ base: "block", md: "block", lg: "none" }}>
                  <FaSearch color="gray" onClick={toggleSearch} />
                  {isSearchOpen && (
                    <>
                      <InputGroup
                        w="50%"
                        position="absolute"
                        top={12}
                        zIndex={10}
                        bg="white"
                        boxShadow="lg"
                        color="gray"
                        borderRadius={20}
                        mt={2}
                      >
                        <Input
                          type="text"
                          placeholder="Search Facebook"
                          borderRadius={20}
                          color="gray"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          width="200px"
                        />
                      </InputGroup>
                      <Box
                        position="absolute"
                        top="calc(100% + 10px)"
                        left="0"
                        right="0"
                        zIndex="999"
                        bg="white"
                        boxShadow="lg"
                        borderRadius="md"
                        width="200px" // Adjust the width as needed
                      >
                        {searching ? (
                          <Text>Loading...</Text>
                        ) : searchResults.length === 0 ? (
                          <Text>No results found</Text>
                        ) : (
                          searchResults.map((result, index) => (
                            <Link key={index} to={`/profile/${result.uid}`} onClick={clearSearch}>
                              <Box p={3} borderBottomWidth="1px">
                                <Text>{result.displayName}</Text>
                              </Box>
                            </Link>
                          ))
                        )}
                      </Box>
                    </>
                  )}
                </Box>

                <Box position="relative">
                  <InputGroup ml={4} display={{ base: "none", md: "none", lg: "block" }}>
                    <InputLeftElement pointerEvents="none" children={<FaSearch color="gray" />} />
                    <Input type="text" placeholder="Search Facebook" bg="gray.100" color="gray" borderRadius={20} value={searchTerm} onChange={handleSearchChange} width="200px" />
                  </InputGroup>
                  {searchTerm && (
                    <Box
                      position="absolute"
                      top="calc(100% + 10px)"
                      left="0"
                      right="0"
                      zIndex="999"
                      
                      bg={searchBgColor}
                      boxShadow="lg"
                      borderRadius="md"
                      overflowY="auto"
                      maxHeight="300px" 
                    >
                      {searching ? (
                         <Stack spacing={2} p={2}>
                         <Skeleton height='20px' />
                         <Skeleton height='20px' />
                         <Skeleton height='20px' />
                       </Stack>
                      ) : searchResults.length === 0 ? (
                        <Text>No results found</Text>
                      ) : (
                        searchResults.map((result, index) => (
                          <Link key={index} to={`/profile/${result.uid}`} onClick={clearSearch} color="gray">
                            <Box p={3} borderBottomWidth="1px" color="gray">
                              <Text>{result.displayName}</Text>
                            </Box>
                          </Link>
                        ))
                      )}
                    </Box>
                  )}
                </Box>
              </Flex>

              <Flex>
                {link.map((ele, index) => (
                  <React.Fragment key={index}>
                    <Box color="grey" fontWeight="100">
                      <NavLink
                        to={ele.to}
                        fontSize={['large', 'medium', 'xx-large']}
                        tooltipLabel={ele.tooltipLabel}
                      >
                        {ele.display}
                      </NavLink>
                    </Box>
                    {index !== link.length - 1 && <Spacer size={spacingSize || 'small'} />} {/* Add Spacer component between links */}
                  </React.Fragment>
                ))}
              </Flex>
              {/* ------------------------------------------ */}
              <Flex alignItems={'center'} ml={1}>
                <Stack direction={'row'} spacing={7}>


                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Box borderRadius="40%" bg="gray.200" p={1}>
                        <Icon as={CgMenuGridO} boxSize={6} color="black" fontWeight="bold" />
                      </Box>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Center>
                        <Tooltip label='Menu' >
                          <p >Menu</p>
                        </Tooltip>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={TfiPencilAlt} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Post</Box>
                      </MenuItem>
                      {/* <Divider /> */}
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={IoBook} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Story</Box>
                      </MenuItem>
                      {/* <Divider /> */}
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={FaFilm} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Reels</Box>
                      </MenuItem>
                      {/* <Divider /> */}
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={MdOutlineStar} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Life Event</Box>
                      </MenuItem>
                      <Divider borderColor="gray" borderWidth="1px" />
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={BsFillFlagFill} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Page</Box>
                      </MenuItem>

                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={HiSpeakerphone} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Ad</Box>
                      </MenuItem>

                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={MdGroups} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Group</Box>
                      </MenuItem>

                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={MdOutlineEventAvailable} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Story</Box>
                      </MenuItem>

                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={HiShoppingBag} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box fontWeight={"bold"} p={3}>Marketplace Listing</Box>
                      </MenuItem>
                    </MenuList>
                  </Menu>


                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Box borderRadius="50%" bg="gray.200" p={1}>
                        <Icon as={FaFacebookMessenger} boxSize={7} color="black" fontWeight="bold" />
                      </Box>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Center>
                        <Tooltip label='Chats'>
                          <p >Chats</p>
                        </Tooltip>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </Menu>


                  <Box >
                    <Menu isOpen={isntMenuOpen} onClose={() => setIsMenuOpen(false)}>
                      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} onClick={() => setIsMenuOpen(!isntMenuOpen)}>
                        <Box borderRadius="50%" bg="gray.100" p={1}>
                          <Icon as={IoNotificationsOutline} boxSize={8} color={isntMenuOpen ? "blue" : "grey"} fontWeight="bold" />
                        </Box>
                      </MenuButton>
                      <MenuList alignItems={'center'}>
                        <Center>
                          <Tooltip label='Notifications'>
                            <p>Notifications</p>
                          </Tooltip>
                        </Center>
                        <br />
                        <MenuDivider />
                        {notifications.length === 0 ? (
                          <MenuItem>No notification yet</MenuItem>
                        ) : (
                          notifications.map(notification => (
                            <MenuItem key={notification.id}>{notification.content}</MenuItem>
                          ))
                        )}

                      </MenuList>
                    </Menu>
                  </Box>


                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >

                      {/* <Avatar size="sm" src='https://bit.ly/broken-link' /> */}

                      <Avatar size="sm" src={user?.photoURL as string}>
                        <AvatarBadge boxSize='1.25em' bg='green.500' />
                      </Avatar>

                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Flex p={4}>
                        <Center>
                          <Avatar size="sm" src={user?.photoURL as string} />
                        </Center>
                        <Center p={2}>
                          <Link to={`/profile/${user?.uid}`}>
                            <p>{user?.displayName}</p>
                          </Link>
                        </Center>
                      </Flex>
                      <MenuDivider />
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={IoIosSettings} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box p={3}>Setting & privacy</Box>
                      </MenuItem>

                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={IoMdHelpCircle} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box p={3}>Help & support</Box>
                      </MenuItem>
                      <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box borderRadius="50%" bg="gray.200" p={2}>
                                <Icon as={IoMdMoon} boxSize={5} color="black" fontWeight="bold" />

                              </Box>
                              <Box as="span" flex='1' textAlign='left' ml={1}>

                                Display
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <FormControl display='flex' alignItems='center'>
                              <FormLabel htmlFor='dark-mode' mb='0'>
                                {buttonText}
                              </FormLabel>
                              <Switch id='dark-mode' isChecked={colorMode === 'dark'} onChange={handleToggleColorMode} />
                            </FormControl>
                          </AccordionPanel>
                          <Divider />

                        </AccordionItem>
                      </Accordion>
                      <MenuItem>
                        <Box borderRadius="50%" bg="gray.200" p={2}>
                          <Icon as={RiFeedbackFill} boxSize={5} color="black" fontWeight="bold" />

                        </Box>
                        <Box p={3}>Give feedback</Box>
                      </MenuItem>

                      <MenuItem fontWeight={"bold"} onClick={handleLogout}>Log out</MenuItem>
                    </MenuList>

                  </Menu>
                </Stack>
              </Flex>
            </Flex>
          </Box>

        </ColorModeProvider >
      )
      }
      {
        breakpoint === ("sm") && (
          <ColorModeProvider>
            <Box bg={bgColor} px={3} boxShadow={"lg"} width="100%" position="sticky" top={0} zIndex={1000}>
              <Flex h={16} alignItems={'center'} justifyContent={'space-between'} flexShrink={0}>
                <Flex alignItems="center">
                  <Avatar
                    borderRadius="full"
                    boxSize="57px"
                    src={facebook_logo}
                  />


                  <Box >
                    {/* Search Icon */}
                    <FaSearch color="gray" onClick={toggleSearch} />

                    {/* Search Input Field */}
                    {isSearchOpen && (
                      <InputGroup
                        position="absolute"
                        top={10}
                        zIndex={10}
                        bg="white"
                        boxShadow="lg"
                        borderRadius={20}
                        mt={2}
                        width="200px" // Adjust width as needed
                      >
                        <Input
                          type="text"
                          placeholder="Search Facebook"
                          borderRadius={20}
                          value={searchTerm}
                          onChange={handleSearchChange}
                        // position="relative"

                        />
                      </InputGroup>
                    )}

                    {/* Search Results */}
                    {searchTerm && (
                      <Box
                        position="absolute"
                        top="calc(80% + 40px)"
                        left="20"
                        // top="35"
                        right="0"
                        zIndex="999"
                        bg="white"
                        boxShadow="lg"
                        borderRadius="md"
                        width="200px" // Adjust width as needed
                      >
                        {searching ? (
                          <Text>Loading...</Text>
                        ) : searchResults.length === 0 ? (
                          <Text>No results found</Text>
                        ) : (
                          searchResults.map((result, index) => (
                            <Link key={index} to={`/profile/${result.uid}`} onClick={clearSearch}>
                              <Box p={3} borderBottomWidth="1px">
                                <Text>{result.displayName}</Text>
                              </Box>
                            </Link>
                          ))
                        )}
                      </Box>
                    )}
                  </Box>

                  <InputGroup ml={4} display={{ base: "none", md: "none", lg: "block" }}>
                    <InputLeftElement pointerEvents="none" children={<FaSearch color="gray" />} />
                    <Input type="text" placeholder="Search Facebook" bg="gray.100" borderRadius={20} />
                  </InputGroup>
                </Flex>

                <Flex>
                  {Midlink.map((ele, index) => (
                    <React.Fragment key={index}>
                      <Box color="grey" fontWeight="100">
                        <Center>
                          <NavLink
                            to={ele.to}
                            fontSize={['large', '30px', 'xx-large']}
                            tooltipLabel={ele.tooltipLabel}
                          >
                            {ele.display}
                          </NavLink>
                        </Center>
                      </Box>
                      {index !== link.length - 1 && <Spacer size={spacingSize || 'small'} />}
                    </React.Fragment>
                  ))}
                </Flex>

                {/* Hamburger icon with dropdown menu */}

                <Menu placement="left-start">
                  <MenuButton
                    as={IconButton}
                    icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Toggle menu"
                    display={{ base: "block", md: "none" }}
                    variant="ghost"
                    onClick={toggleMenu}
                  />
                  <Flex alignItems="center">

                    <MenuList>
                      <MenuItem>
                        <Link to="/groups">{<HiOutlineUserGroup fontSize={"30px"} />}</Link>
                      </MenuItem>


                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Friends} alt="" />
                            <span>Friends</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Groups} alt="" />
                            <span>Groups</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Market} alt="" />
                            <span>Marketplace</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Watch} alt="" />
                            <span>Watch</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Memories} alt="" />
                            <span>Memories</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <hr />
                      <MenuItem>
                        <span>Your shortcuts</span>
                      </MenuItem>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Events} alt="" />
                            <span>Events</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Gaming} alt="" />
                            <span>Gaming</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Gallery} alt="" />
                            <span>Gallery</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Videos} alt="" />
                            <span>Videos</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                      <MenuItem>
                        <div className="item">
                          <img src={Messages} alt="" />
                          <span>Messages</span>
                        </div>
                      </MenuItem>
                      <hr />
                      <MenuItem>
                        <span>Others</span>
                      </MenuItem>
                      <MenuItem>
                        <div className="item">
                          <img src={Fund} alt="" />
                          <span>Fundraiser</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="item">
                          <img src={Tutorials} alt="" />
                          <span>Tutorials</span>
                        </div>
                      </MenuItem>


                      <MenuItem>
                        <div className="item">
                          <img src={Courses} alt="" />
                          <span>Courses</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Flex>
                </Menu>
                <Box>
                  <Menu>


                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Box borderRadius="50%" bg="gray.200" p={1}>
                        <Icon as={IoNotifications} boxSize={6} color="black" fontWeight="bold" />
                      </Box>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Center>
                        <Tooltip label='Notifications'>
                          <p >Notifications</p>
                        </Tooltip>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </Menu>

                  <Menu >
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      {/* <Avatar size="sm" src='https://bit.ly/broken-link' /> */}
                      <Avatar boxSize='15px'>
                        <AvatarBadge boxSize='1.00em' bg='green.500' />
                      </Avatar>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Flex p={4}>
                        <Center>
                          <Avatar boxSize='15px' src='https://bit.ly/broken-link' />
                        </Center>
                        <Center p={2}>
                          <p>Username</p>
                        </Center>
                      </Flex>
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex='1' textAlign='left'>
                                Account Settings
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <FormControl display='flex' alignItems='center'>
                              <FormLabel htmlFor='dark-mode' mb='0'>
                                Dark mode
                              </FormLabel>
                              <Switch id='dark-mode' isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                            </FormControl>
                          </AccordionPanel>
                          <Divider />
                          <AccordionPanel pb={4}>
                            <FormControl display='flex' alignItems='center'>
                              <FormLabel htmlFor='light-mode' mb='0'>
                                Light mode
                              </FormLabel>
                              <Switch id='light-mode' isChecked={colorMode === 'light'} onChange={toggleColorMode} />
                            </FormControl>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </Box>
          </ColorModeProvider>
        )
      }




      {
        breakpoint === "base" && (
          <ColorModeProvider>
            <Box bg={bgColor} px={3} boxShadow={"lg"} width="100%" top={0} zIndex={1000} position={"sticky"}>
              <Flex alignItems="center" justifyContent="space-between">
                <Image src={facebook} width={"40%"} height={"100px"} top={"0%"} />

                <Flex alignItems="center" position="relative">
                  {/* Search Icon */}
                  <FaSearch color="gray" onClick={toggleSearch} />

                  {/* Search Input Field */}
                  {isSearchOpen && (
                    <Box
                      position="absolute"
                      top={7}
                      right={34}
                      zIndex={10}
                      bg="white"
                      boxShadow="lg"
                      borderRadius={20}
                      mt={2}
                      width="200px" // Adjust width as needed
                    >
                      <Input
                        type="text"
                        placeholder="Search Facebook"
                        borderRadius={20}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        position={"absolute"}
                      />
                    </Box>
                  )}

                  {/* Search Results */}
                  {searchTerm && (
                    <Box
                      position="absolute"
                      top="calc(100% + 40px)"
                      left={0}
                      right={100}
                      zIndex={999}
                      bg="white"
                      boxShadow="lg"
                      borderRadius="md"
                      width="200px" // Adjust width as needed
                    >
                      {searching ? (
                        <Text></Text>
                      ) : searchResults.length === 0 ? (
                        <Text>No results found</Text>
                      ) : (
                        searchResults.map((result, index) => (
                          <Link key={index} to={`/profile/${result.uid}`} onClick={clearSearch}>
                            <Box p={3} borderBottomWidth="1px">
                              <Text>{result.displayName}</Text>
                            </Box>
                          </Link>
                        ))
                      )}
                    </Box>
                  )}
                  {/* </Flex> */}

                  <Menu
                    placement="left-start"  >
                    <MenuButton
                      as={IconButton}
                      icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                      aria-label="Toggle menu"
                      borderRadius="50%" bg="gray.200"
                      display={{ base: "block", md: "none" }}
                      variant="ghost"
                      onClick={toggleMenu}
                    />
                    <Flex alignItems="center">
                      <MenuList>
                        <MenuItem>
                          <div className="item">
                            <img src={Friends} alt="" />
                            <span>Friends</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Groups} alt="" />
                            <span>Groups</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Market} alt="" />
                            <span>Marketplace</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Watch} alt="" />
                            <span>Watch</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Memories} alt="" />
                            <span>Memories</span>
                          </div>
                        </MenuItem>
                        <hr />
                        <MenuItem>
                          <span>Your shortcuts</span>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Events} alt="" />
                            <span>Events</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Gaming} alt="" />
                            <span>Gaming</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Gallery} alt="" />
                            <span>Gallery</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Videos} alt="" />
                            <span>Videos</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Messages} alt="" />
                            <span>Messages</span>
                          </div>
                        </MenuItem>
                        <hr />
                        <MenuItem>
                          <span>Others</span>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Fund} alt="" />
                            <span>Fundraiser</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Tutorials} alt="" />
                            <span>Tutorials</span>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="item">
                            <img src={Courses} alt="" />
                            <span>Courses</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </Flex>
                  </Menu>
                </Flex>
              </Flex>
            </Box>
            <Divider borderWidth="2px" color={'grey'} />


            <Flex  bg={bgColor} px={3} boxShadow={"lg"} width="100%" top={20} zIndex={1000} position={"sticky"}>
              <Center>
                {Midlink.map((ele, index) => (
                  <React.Fragment key={index}>
                    <Box color="grey" fontWeight="100" ml={1}>
                      <Center>
                        <NavLink
                          to={ele.to}
                          fontSize={["30px", 'large', '30px', 'xx-large']}
                          tooltipLabel={ele.tooltipLabel}
                        >
                          {ele.display}
                        </NavLink>
                      </Center>
                    </Box>
                    {index !== link.length - 1 && <Spacer size={spacingSize || 'small'} />}
                  </React.Fragment>
                ))}
              </Center>
              <Box ml={2} mt={2}>
                <Menu >


                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Box >
                      <Icon as={IoNotificationsOutline} boxSize={8} color="grey" fontWeight="bold" />
                    </Box>
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                      <Tooltip label='Notifications'>
                        <p >Notifications</p>
                      </Tooltip>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box ml={3} mt={2} >
                <Menu>

                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Box >
                      <Icon as={RiMessengerLine} boxSize={7} color="grey" fontWeight="bold" />
                    </Box>
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                      <Tooltip label='Chats'>
                        <p >Chats</p>
                      </Tooltip>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
            <Divider borderWidth="1px" color={'black'} />


          </ColorModeProvider >
        )
      }


















    </>
  )

}