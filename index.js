const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth.routes");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Define REST API routes

app.use("/api/v1/auth", authRoutes);

async function startApolloServer() {
  // Start ApolloServer
  await server.start();

  // Apply ApolloServer middleware to Express app
  server.applyMiddleware({ app });

  // Start server
  const PORT = process.env.PORT || 4003;
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server:", error);
});
