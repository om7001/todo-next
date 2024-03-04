import { gql } from 'apollo-server';

const typeDefs = gql`
    type ToDo {
        _id: ID
        title: String
        description: String
        status: String
    }    

    type status{
        message: String
    }

    type Query {
        getToDos: [ToDo]!
    }

    type Mutation {
        addToDo(title: String!, description: String): ToDo
        updateToDo(_id: ID!, title: String, description: String, status: Boolean): status
        deleteToDo(_id: ID!): status
    }
`

export default typeDefs