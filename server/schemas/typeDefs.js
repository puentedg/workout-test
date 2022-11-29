const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Food {
    foods: [Foods]
    description: String
    cuisine_name: String!
  }

  type Workout {
    exercises: [Exercise]
    time: String
    muscle_group: String!
  }

  type Foods {
    food_name: String!
    source: String
  }

  type Exercise {
    exercise_name: String!
    source: String
    description: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    positives: [Positive]!
  }

  type Query {
    food: [Food]
    workout: [Workout]
    users: [User]
    user(username: String!): User
    positives(username: String): [Positive]
    positive(positiveId: ID!): Positive
  }

  type Auth {
    token: ID!
    user: User
  }
  type Positive {
    _id:ID
    positiveText: String
    positiveAuthor: String
    createdAt: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addPositive(positiveText: String!, positiveAuthor: String!): Positive
    removePositive(positiveId: ID!): Positive
  }
`;

module.exports = typeDefs;
