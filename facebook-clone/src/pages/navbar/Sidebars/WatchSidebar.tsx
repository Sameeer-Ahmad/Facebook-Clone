"use client";

import React, { ReactNode } from "react";
import {
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
  InputLeftElement,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { MdOndemandVideo } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { TfiVideoClapper } from "react-icons/tfi";
import { RiSlideshow3Line } from "react-icons/ri";
import { BsRocketTakeoff } from "react-icons/bs";
import { BsFillSave2Fill } from "react-icons/bs";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Live", icon: RiLiveLine },
  { name: "Reels", icon: TfiVideoClapper },
  { name: "Shows", icon: RiSlideshow3Line },
  { name: "Explore", icon: BsRocketTakeoff },
  { name: "Saved videos", icon: BsFillSave2Fill },
];

export default function WatchSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "330px" }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Video
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <>
        <InputGroup borderRadius={5} size="sm" p={"0 10px 0 10px"}>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.600" marginLeft={"20px"} />}
          />
          <Input
            type="text"
            placeholder="Search videos"
            bg={"#f0f2f5"}
            borderRadius={30}
          />
        </InputGroup>
      </>
      <Box bgColor="#f0f2f5" m={"0 8px 0 8px"} borderRadius={"5px"}>
        <Flex align="center" ml="3" mt="3" p={2} mb="2">
          <Icon
            as={MdOndemandVideo}
            borderRadius="50%"
            p="1"
            fontSize="31px"
            color="white"
            bgColor="#1877f2"
          />
          <Text ml="2" fontWeight="600" mr="6">
            Home
          </Text>
        </Flex>
      </Box>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#f0f2f5",
          color: "black",
        }}
        fontWeight="600"
        {...rest}
      >
        {icon && (
          <Box bg="#e4e6eb" borderRadius="50%" p="1" mr="4">
            <Icon
              fontSize="20"
              color="black"
              _groupHover={{
                color: "black",
              }}
              as={icon}
            />
          </Box>
        )}
        {children}
      </Flex>
        
    </Box>
  );
};
