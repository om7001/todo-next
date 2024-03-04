import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { connectDBHandler } from "../../apollo/server/db";
import typeDefs from "../../apollo/server/typeDefs/todoType";
import resolvers from "../../apollo/server/resolvers/todoResolver";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')
      .replace('Context creation failed: ', '')
      .replace('Unexpected error value: ', '');
    return { ...error, message };
  },
});

const handler = connectDBHandler(startServerAndCreateNextHandler(apolloServer));

export { handler as GET, handler as POST };

// Add some logging
console.log("Server setup completed");