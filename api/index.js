import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import express from "express";
import { loadFiles } from "@graphql-tools/load-files";
import path from "path";
import resolvers from "../src/resolvers";
import { config } from "dotenv";
import mongoose from "mongoose";
import AuthenticateUser from "../src/utils/authenticateUser";

config("../.env");

const app = express();

async function startServer() {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to MongoDB");
  });

  const server = new ApolloServer({
    typeDefs: await loadFiles(path.join(__dirname, "../src/schema.gql")),
    resolvers,
  });
  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.token;

        if (!token) return { user: null };

        
          const user = await AuthenticateUser(token);
          return { user };
        } catch (error) {
          return { user: null, error: error.message };
        }
      },
    })
  );
}

startServer();

export default app;
