import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddToDo($title: String!, $description: String) {
    addToDo(title: $title, description: $description) {
      _id
      title
      description
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateToDo(
    $id: ID!
    $title: String
    $description: String
    $status: Boolean
  ) {
    updateToDo(
      _id: $id
      title: $title
      description: $description
      status: $status
    ) {
      message
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteToDo($id: ID!) {
    deleteToDo(_id: $id) {
      message
    }
  }
`;
