'use client'

import React, { ReactNode } from 'react'
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    InputRightAddon,
    InputLeftElement,
    InputGroup,
    Input,
    Button,
    Center,
    Divider,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import { RiHome3Fill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { HiShoppingBag } from "react-icons/hi2";
import { MdSell } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { AiFillPropertySafety } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { ImVideoCamera } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { TfiInkPen } from "react-icons/tfi";
import { TiSpanner } from "react-icons/ti";
import { FaGuitar } from "react-icons/fa";
import { PiPawPrintFill } from "react-icons/pi";
import { FaGamepad } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { FaRunning } from "react-icons/fa";


interface LinkItemProps {
    name: string
    icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Notifications', icon: IoMdNotifications },
    { name: 'Inbox', icon: HiOutlineInboxStack },
    { name: 'Buying', icon: HiShoppingBag },
    { name: 'Selling', icon: MdSell },
]
const LinkItems2: Array<LinkItemProps> = [
    { name: 'Vehicles', icon: FaCarAlt },
    { name: 'Property for rent', icon: AiFillPropertySafety },
    { name: 'Classified', icon: MdSell },
    { name: 'Clothing', icon: FaTshirt },
    { name: 'Electronics', icon: FaMobileAlt },
    { name: 'Entertainment', icon: ImVideoCamera },
    { name: 'Family', icon: FaHeart },
    { name: 'Home improvement supplies', icon: TiSpanner },
    { name: 'Free stuff', icon: MdOutlineSell },
    { name: 'Musical instruments', icon: FaGuitar },
    { name: 'Hobbies', icon: TfiInkPen },
    { name: 'Pet supplies', icon: PiPawPrintFill },
    { name: 'Toy and Games', icon: FaGamepad },
    { name: 'Sporting goods', icon: FaRunning },
    { name: 'Buy-and-sell groups', icon: HiUserGroup },
]


export default function SimplSidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <Box ml={{ base: 0, md: 60 }} p="4">
                {/* Content */}
            </Box>
        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: "330px" }}
            pos="fixed"
            h="full"
            overflowY="auto"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontWeight="bold">
                    Marketplace
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <>
                <InputGroup borderRadius={5} size="sm">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.600" />}
                    />
                    <Input type="text" placeholder="Search Marketplace" border="1px solid #949494" borderRadius={30} />
                    <InputRightAddon
                        p={0}
                        border="none"
                    >
                        <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" borderRadius={10}>
                            Search
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </>
            <Box bgColor="#f0f2f5" borderRadius={50} >
                <Flex align="center" ml="6" mt="3" p={1} mb="2">
                    <Icon
                        as={RiHome3Fill} // Using the RiHome3Fill icon
                        borderRadius="50%" // Rounded corners for circular shape
                        p="2" // Padding to create some space around the icon
                        fontSize="31px" // Increased font size of the icon
                        color="white" // Color of the icon
                        bgColor="#1877f2"

                    />
                    <Text ml="2" fontWeight="600" mr="6">Browse all</Text>
                </Flex>
            </Box>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
            <Box bgColor="#ebf5ff" borderRadius={50} mb={3} >
                <Flex align="center" ml="6" mt="3" p={1}>
                    <Icon
                        as={FaPlus}
                        borderRadius="30%"
                        p="2"
                        fontSize="31px"
                        color="#0c6bd3"
                    />
                    <Text ml="2" fontWeight="600" mr="6" color="#0c6bd3">Create new listing</Text>
                </Flex>
            </Box>
            <Divider borderWidth="1px" color={"black"} />
            <Text ml={6} fontSize={19} fontWeight={"500"} mb={2}>Filters</Text>
            <Text color={"#1877f2"} fontWeight={"500"} ml={6} mb={3}>Mangalore . within 65 kilometers</Text>
            <Divider borderWidth="2px" />
            {LinkItems2.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Box
            as="a"
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="2"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"


                _hover={{
                    bg: "#f0f2f5",
                    color: 'black',
                }}
                fontWeight="600"
                {...rest}>
                {icon && (
                    <Box
                        bg="#e4e6eb"
                        borderRadius="50%"

                        p="1"
                        mr="4"
                    >
                        <Icon
                            fontSize="20"
                            color="black"
                            _groupHover={{
                                color: 'black',
                            }}
                            as={icon}
                        />
                    </Box>
                )}
                {children}
            </Flex>
        </Box>
    )
}

