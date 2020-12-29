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

import Header from '../components/Header/Header.component'

const MainLayout = ({ children }: any) => {
  const [user, loading] = useAuthState(getAuth());
  return (
    <Box>
      <Header />
      <Box mt={4}>
        <Container maxW="3xl">{children}</Container>
      </Box>
    </Box>
  );};

export default MainLayout;
