import React, { useState } from "react";
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
  Image,
  useColorMode,

} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import facebook_logo from "../Images/Facebook_logo.png";
import { FaSearch } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { LuStore } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
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


interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  fontSize: string[];
  tooltipLabel: string;
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
  const { toggleColorMode, colorMode } = useColorMode(); // Extract colorMode
  const [isMenuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // Toggle isMenuOpen state
    if (!isMenuOpen) {
      onOpen(); // Open the Drawer when the hamburger icon is clicked
    } else {
      onClose(); // Close the Drawer when the hamburger icon is clicked again
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

  const spacingSize = useBreakpointValue({ base: 'small', sm: '2px', md: 'large', lg: "lg", xl: "xl" });
  const bgColor = useColorModeValue('white', 'gray.900');
  const breakpoint = useBreakpointValue({ base: "base", sm: "sm", md: "md" });
  return (

    <>
      <ColorModeScript />
      {breakpoint === "md" && (
        <ColorModeProvider>
          <Box bg={bgColor} px={3} boxShadow={"lg"} width="100%" position="fixed" top={0} zIndex={1000}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <Flex alignItems="center">
                <Avatar
                  borderRadius="full"
                  boxSize="57px"
                  src={facebook_logo}
                />
                <Box display={{ base: "block", md: "block", lg: "none" }}>
                  <FaSearch color="gray" onClick={toggleSearch} />
                  {isSearchOpen && (
                    <InputGroup
                      w="50%"
                      position="absolute"
                      top={12}
                      zIndex={10}
                      bg="white"
                      boxShadow="lg"
                      borderRadius={20}
                      mt={2}
                    >
                      <Input
                        type="text"
                        placeholder="Search Facebook"
                        borderRadius={20}
                      />
                    </InputGroup>
                  )}
                </Box>
                <InputGroup ml={4} display={{ base: "none", md: "none", lg: "block" }}>
                  <InputLeftElement pointerEvents="none" children={<FaSearch color="gray" />} />
                  <Input type="text" placeholder="Search Facebook" bg="gray.100" borderRadius={20} />
                </InputGroup>
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
                        <Icon as={FaFacebookMessenger} boxSize={6} color="black" fontWeight="bold" />
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


                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      {/* <Avatar size="sm" src='https://bit.ly/broken-link' /> */}
                      <Avatar size="sm">
                        <AvatarBadge boxSize='1.25em' bg='green.500' />
                      </Avatar>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Flex p={4}>
                        <Center>
                          <Avatar size="sm" src='https://bit.ly/broken-link' />
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
                </Stack>
              </Flex>
            </Flex>
          </Box>

        </ColorModeProvider >
      )}
      {breakpoint === ("sm") && (
        <ColorModeProvider>
          <Box bg={bgColor} px={3} boxShadow={"lg"} width="100%" position="fixed" top={0} zIndex={1000}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} flexShrink={0}>
              <Flex alignItems="center">
                <Avatar
                  borderRadius="full"
                  boxSize="57px"
                  src={facebook_logo}
                />
                <Box display={{ base: "block", md: "block", lg: "none" }}>
                  <FaSearch color="gray" onClick={toggleSearch} />
                  {isSearchOpen && (
                    <InputGroup
                      w="50%"
                      position="absolute"
                      top={12}
                      zIndex={10}
                      bg="white"
                      boxShadow="lg"
                      borderRadius={20}
                      mt={2}
                    >
                      <Input
                        type="text"
                        placeholder="Search Facebook"
                        borderRadius={20}
                      />
                    </InputGroup>
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

              <Menu>
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
      )}




      {breakpoint === "base" && (
        <ColorModeProvider>
          <Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Image src={facebook} width={"40%"} height={"100px"} top={"0%"} />

              <Flex alignItems="center">
                <InputGroup display={{ base: "none", md: "none", lg: "block" }} w="10%"
                  position="absolute"
                  top={12}
                  left={-2920} zIndex={10}
                  bg="white"
                  boxShadow="lg"
                  borderRadius={20}
                  mt={2}>
                  <InputLeftElement pointerEvents="none" children={<FaSearch color="gray" />} />
                  <Input type="text" placeholder="Search Facebook" bg="gray.100" borderRadius={20} />
                </InputGroup>


                <Box display={{ base: "block", md: "block", lg: "none" }} borderRadius="60%" bg="gray.200" p={2} mr={2}>
                  <FaSearch color="gray" onClick={toggleSearch} size={'25px'} />
                  {isSearchOpen && (
                    <InputGroup
                      w="50%"
                      position="absolute"
                      top={12}
                      zIndex={10}
                      bg="white"
                      boxShadow="lg"
                      borderRadius={20}
                      mt={2}
                    >
                      <Input
                        type="text"
                        placeholder="Search Facebook"
                        borderRadius={20}
                      />
                    </InputGroup>
                  )}
                </Box>


                <Menu>
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


          <Flex>
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


        </ColorModeProvider>
      )}


















    </>
  )

}