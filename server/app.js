const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin requests
app.use(cors());

// connect to Atlas cluster
mongoose.connect('mongodb+srv://testuser:testing123@cluster0-rcmfl.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log("Connected to Atlas cluster.");
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000.");
});