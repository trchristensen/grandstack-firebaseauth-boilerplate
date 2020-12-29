import React from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Icon,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  MenuList,
  MenuGroup,
  useDisclosure,
  Input,
} from "@chakra-ui/core";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  background,
} from "@chakra-ui/react";

import { BiChevronDown, BiLogOut, BiMenu, BiUser } from "react-icons/bi";
import {
  getAuth,
  logout,
} from "../../../client/firebaseHelpers";
import { useAuthState } from "react-firebase-hooks/auth";

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props: any) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const [user, loading] = useAuthState(getAuth());

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px="1.5rem"
      py=".2rem"
      // bg="gray.700"
      bg="spaceGray"
      color="white"
      {...props}
    >
      <Flex align="center">
        <Box mr={4} display={{ base: "block" }} ref={btnRef} onClick={onOpen}>
          <Icon as={BiMenu} fontSize="3xl" cursor="pointer" />
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent maxW="300px" bg="spaceGrayDark" color="white">
              <Box
                d="flex"
                alignItems="center"
                flexDirection="row"
                w="full"
                p=".75rem 1.5rem"
              >
                <Icon
                  as={BiMenu}
                  fontSize="3xl"
                  cursor="pointer"
                  onClick={onClose}
                />
                <Flex align="center" ml={5}>
                  <Heading
                    as="span"
                    size="lg"
                    letterSpacing={"-.1rem"}
                    lineHeight="1"
                  >
                    {process.env.APP_NAME}
                  </Heading>
                </Flex>
              </Box>
              <DrawerBody mt={4}>
                <Box py={2}>
                  <Link href="/users">
                    <a
                      style={{
                        display: "block",
                        padding: ".5rem .75rem",
                      }}
                      onClick={onClose}
                    >
                        Users
                    </a>
                  </Link>
                </Box>
                <Box>
                  <Link href="/about">
                    <a
                      style={{
                        display: "block",
                        padding: ".5rem .75rem",
                      }}
                      onClick={onClose}
                    >
                      About
                    </a>
                  </Link>
                </Box>
              </DrawerBody>

              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"} lineHeight="1">
            {process.env.APP_NAME}
          </Heading>
        </Flex>
      </Flex>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      ></Box>
      {!loading && user ? (
        <Box display="flex">
          <Box display="flex" alignItems="center">
            <Menu>
              <MenuButton
                // px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                // _hover={{ bg: "gray.100" }}
                _focus={{ outline: 0, boxShadow: "outline" }}
                bg="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  marginRight={2}
                  width="32px"
                  height="auto"
                  name={`${user.displayName}`}
                  src={`${user.photoURL}`}
                />
                {/* <Text>{user.displayName}</Text> */}
                <Icon as={BiChevronDown} />
              </MenuButton>
              <MenuList color="gray.500">
                <Box d="flex" flexDirection="row" alignItems="center" p={2}>
                  <Avatar
                    marginRight={2}
                    width="32px"
                    height="auto"
                    name={`${user.displayName}`}
                    src={`${user.photoURL}`}
                  />
                  <Box>
                    <Text>{user.displayName}</Text>
                    <Text>{user.email}</Text>
                  </Box>
                </Box>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem>
                    <Link href="/dashboard">
                      <a>
                        <Icon as={BiUser} mr={2} />
                        Dashboard
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>
                    <Icon as={BiLogOut} mr={2} /> Logout
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      ) : (
        <Box>
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
