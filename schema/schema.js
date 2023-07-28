// This file is to tell GraphQL what our data looks like
const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  },
})

// root query is how we initially jump into the graph
// giving GraphQL a starting point
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      // if you provide the id, it will return the user with that id
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        // going through our users array and finding the user with the id
        // this is a synchronous example
        // return _.find(users, { id: args.id });

        // this is an asynchronous example
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})