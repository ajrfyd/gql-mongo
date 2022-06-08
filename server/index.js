// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema/schema');
// const port = process.env.PORT || 5000;

// const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: process.env.NODE_ENV === 'development'
// }))

// app.listen(port, (req, res) => {
//   console.log(`Listening on ${port}`)
// })


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer, gql } from 'apollo-server';
import schema from './schema/schema.js';
import colors from 'colors';
import connectDB from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
// app.use('/', (req, res) => {
//   res.send('Welcome!!')
// })

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, (req, res) => {
  console.log(`Server Listening on ${port}`)
})