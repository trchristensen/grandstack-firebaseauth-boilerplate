import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query {
    User {
      id
      userId
      name
      email
      avatar
      isAdmin
      _id
    }
  }
`;
