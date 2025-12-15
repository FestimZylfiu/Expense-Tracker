import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer} from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";


import { buildContext } from "graphql-passport";
import {connectDB} from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: "sessions",
});

store.on("error", (err) => console.log(err));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, 
		saveUninitialized: false, 
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true, 
		},
		store: store,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
     typeDefs: mergedTypeDefs,
     resolvers: mergedResolvers,
});

await server.start();

app.use(
     '/',
     cors({
		origin: ["http://localhost:3000", "http://localhost:3001"],
		credentials: true,
	}),
     express.json(),
    expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	})
);
await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));
const url = `http://localhost:4000/`;
await connectDB();

console.log(`Server is running at: ${url}`);
