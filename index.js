const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const path = require('path');
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP(async (req, res, graphQLParams) => {
    return {
      schema,
      graphiql: process.env.NODE_ENV === 'development', // Enable graphi enviroment to test querys
      context: console.log(req.headers.authorization)
      
    };
  })
);

// to deploy

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, console.log(`server running on ${port}`));
