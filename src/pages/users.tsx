import React from 'react';
import { Avatar, Box } from '@chakra-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from '../client/gql/users';
import TopBar from '../client/components/TopBar/TopBar.component'

const Users = () => {
  const {data, loading, error} = useQuery(USERS_QUERY);

  return (
    <Box>
      <TopBar title="Users" />
      {loading && (
        <Box>Loading Users</Box>
      )}
      {error && (<Box>Error: {error}</Box>)}
      {!loading &&
        data &&
        data.User.map((user:any) => (
          <Box>    
            <ul style={{listStyleType: 'none', marginTop: '20px'}}>
              <li><Avatar src={user.avatar} /></li>
              <li>{user.id}</li>
              <li>{user.name}</li>
              <li>{user.email}</li>
            </ul>
          </Box>
        ))}
    </Box>
  );
};

export default Users;
