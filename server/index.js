import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer } from 'apollo-server';
import schema from './schema/schema.js';
import colors from 'colors';
import connectDB from './config/db.js';
import { typeDefs, resolvers } from './apollo/apollo.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
// app.use('/', (req, res) => {
//   res.send('Welcome!!')
// })

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, (req, res) => {
  console.log(`Server Listening on ${port}`)
})


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({adress, family, url, port, server}) => {
  console.log(adress, family, url, port)
})