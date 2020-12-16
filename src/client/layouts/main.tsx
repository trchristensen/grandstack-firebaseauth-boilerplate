import React from 'react'
// import { GetServerSideProps } from "next";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../firebaseHelpers";

import {
  Avatar,
  Box,
  Text,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Heading,
} from "@chakra-ui/core";
import {
  BiChevronDown,
  BiLogOut,
  BiLogIn,
} from "react-icons/bi";
import { Container } from '@chakra-ui/layout'

const MainLayout = ({ children }: any) => {
  const [user, loading] = useAuthState(getAuth());
  return (
    <Box>
      <Box
        id="header"
        bg="gray.400"
        minH="55px"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container>
          <Box w="full" d="flex" justifyContent="space-between">
            <Box d="flex" justifyContent="center" alignItems="center">
              <Heading
                as="h1"
                fontSize="2xl"
                fontWeight="bold"
                margin={0}
                lineHeight="none"
              >
                {process.env.APP_NAME}
              </Heading>
            </Box>
            {!loading && user && (
              <Box display="flex">
                <Box display="flex" alignItems="center">
                  <Menu>
                    <MenuButton
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
                        size="sm"
                        src={`${user.photoURL}`}
                        name={`${user.displayName}`}
                      />

                      <Icon as={BiChevronDown} />
                    </MenuButton>
                    <MenuList color="gray.500">
                      <MenuItem onClick={() => logout()}>
                        <Icon as={BiLogOut} mr={1} />
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            )}
            {!loading && !user && (
              <Box>
                <Link href="/login">
                  <Button variant="unstyled">
                    <a>
                      <Icon as={BiLogIn} mr={1} />
                      Login
                    </a>
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>{children}</Container>
      </Box>
    </Box>
  );};

export default MainLayout;
