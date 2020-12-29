import React from "react";
import Link from "next";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TopBar from '../TopBar/TopBar.component'

import {
  loginWithGithub,
  loginWithGoogle,
  loginWithFacebook,
  signInWithEmailandPassword,
  createNewUserWithEmailandPassword,
  getAuth,
  logout,
} from "../../firebaseHelpers";

import { Box, Heading, Flex, Text, Button, Avatar, Input, Icon, InputGroup, FormControl } from "@chakra-ui/core";
import { ImGoogle, ImGithub, ImFacebook } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";

export function Login(props: any) {
  const [user, loading] = useAuthState(getAuth());
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');


  const handleLoginWithGithub = async () => {
    const login = loginWithGithub()
    await login.then((res) => {
      console.log('response', res)
    })
  }


  React.useEffect(() => {
    if(user) {
      Router.push('/');
    }
  }, [user])


  const handleCreateUser = () => {
    createNewUserWithEmailandPassword(email, password, name);
  }

   return !loading && user ? (
     <Box
       display="flex"
       fontSize="xl"
       justifyContent="center"
       alignItems="center"
       mt="40px"
     >
       You are logged in!
     </Box>
   ) : (
     <Box
       display="flex"
       justifyContent="center"
       alignItems="center"
       flexDir="column"
     >
       <TopBar title="Sign In" />
       <Box
         bg="white"
         rounded="lg"
         shadow="md"
         display="flex"
         flexWrap="wrap"
         justifyContent="space-between"
         alignItems="flex-start"
         py={6}
         px={6}
       >
         <Box p={4}>
           <FormControl mb={2}>
             <Input
               value={email}
               placeholder="email@email.com"
               onChange={(e: React.FormEvent<HTMLInputElement>) =>
                 setEmail(e.currentTarget.value)
               }
             />
           </FormControl>
           <FormControl mb={2}>
             <Input
               value={name}
               placeholder="display name"
               onChange={(e: React.FormEvent<HTMLInputElement>) =>
                 setName(e.currentTarget.value)
               }
             />
           </FormControl>
           <FormControl mb={2}>
             <Input
               type="password"
               placeholder="password"
               value={password}
               onChange={(e: React.FormEvent<HTMLInputElement>) =>
                 setPassword(e.currentTarget.value)
               }
             />
           </FormControl>
           <FormControl mb={2}>
             <Input type="password" placeholder="Comfirm password" />
           </FormControl>
           <Button onClick={() => handleCreateUser()}>Create User</Button>
         </Box>
         <Box p={4}>
           <Button
             variantColor="pink"
             onClick={handleLoginWithGithub}
             display="flex"
             w="100%"
             flexWrap="wrap"
           >
             Sign In with Github{" "}
             <Icon ml={2} fontSize="lg" mt="6px" as={ImGithub} />
           </Button>
           <Button
             variantColor="pink"
             onClick={() => loginWithGoogle()}
             display="flex"
             alignItems="center"
             w="100%"
             flexWrap="wrap"
             mt={6}
           >
             Sign In with Google{" "}
             <Icon ml={2} fontSize="lg" mt="6px" as={ImGoogle} />
           </Button>
           <Button
             variantColor="pink"
             onClick={() => loginWithFacebook()}
             display="flex"
             alignItems="center"
             w="100%"
             flexWrap="wrap"
             mt={6}
           >
             Sign In with Facebook{" "}
             <Icon ml={2} fontSize="lg" mt="6px" as={ImFacebook} />
           </Button>
           <Button
             variantColor="pink"
             onClick={() =>
               signInWithEmailandPassword("whynot@gmail.com", "password")
             }
             display="flex"
             w="100%"
             flexWrap="wrap"
             mt={6}
           >
             Sign In with Email <Icon ml={2} fontSize="lg" as={HiOutlineMail} />
           </Button>
         </Box>
       </Box>
     </Box>
   );
}

export default Login;
