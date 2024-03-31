import '../App.css';
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
  useColorMode,
} from '@chakra-ui/react';
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

  const spacingSize = useBreakpointValue({ base: 'small', sm: 'medium', md: 'large' });

  return (
    <>
    
      <ColorModeScript />
      <ColorModeProvider>
        <Box bg={useColorModeValue('white', 'gray.900')} px={3} boxShadow={"lg"} maxWidth="auto">
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
                    <Divider borderColor="gray" borderWidth="1px"/>
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
      </ColorModeProvider>
      
    </>
  );
}



