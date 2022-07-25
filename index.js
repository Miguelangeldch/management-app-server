const express = require('express');
const colors = require('colors');
const cors = require('cors')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db')
const port = process.env.PORT || 4000;

const app = express();

// Connect to database
connectDB();

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development', // Enable graphi enviroment to test querys
  })
);

app.listen(port, console.log(`server running on ${port}`));