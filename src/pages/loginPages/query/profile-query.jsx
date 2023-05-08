import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query Profile {
    profile {
      username
      password
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation MutationCRUD($object: profile_insert_input = {}) {
    insert_profile_one(object: $object) {
      uuid
      username
    }
  }
`;
