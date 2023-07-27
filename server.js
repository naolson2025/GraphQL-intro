const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;

const app = express();

// all requests for graphql will go through this middleware
app.use('/graphql', expressGraphQL({
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening on port 4000');
})
