import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetToDos {
    getToDos {
      _id
      title
      description
      status
    }
  }
`;