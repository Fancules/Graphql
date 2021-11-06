import graphql from "graphql";

export default graphql.buildSchema(`
type People {
    name: String!,
    age: Int!
}

type Team {
    club: String!,
    manager: People!,
    estDate: Int!,
    players: [String!]!
}

input TodoInput {
    title: String!
}

type Mutation {
    addPlayer (name: String!): [String!]!
    addTodo(todo: TodoInput!): Todo!
    completeTodo(id: ID!): Todo!
    removeTodo(id: ID!): Boolean
}

type Todo {
    id: ID!
    done: Boolean!
    title: String!
    createdAt: String
    updatedAt: String
}

type Query {
        test : String!
        num: Int!
        team: Team!
        getTodos: [Todo!]
    }
`)

