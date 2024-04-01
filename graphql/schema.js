const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int
    email: String
  }

  type Product {
    id: Int
    name: String
    description: String
    price: Float
    categoryId: Int
  }

  type Category {
    id: Int
    name: String
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createProduct(
      name: String!
      description: String!
      price: Float!
      categoryId: Int!
    ): Product!
    createCategory(name: String!): Category!
  }

  type Query {
    users: [User]
    products: [Product]
    categories: [Category]
  }
`;

module.exports = typeDefs;
