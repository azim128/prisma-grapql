const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    products: async () => {
      return await prisma.product.findMany();
    },
    categories: async () => {
      return await prisma.category.findMany();
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      return await prisma.user.create({
        data: {
          email,
          password,
        },
      });
    },
    createProduct: async (_, { name, description, price, categoryId }) => {
      return await prisma.product.create({
        data: {
          name,
          description,
          price,
          categoryId
        },
      });
    },
    createCategory: async (_, { name }) => {
      return await prisma.category.create({
        data: {
          name,
        },
      });
    },
  },
};

module.exports = resolvers;
