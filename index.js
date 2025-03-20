const express = require("express");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
} = require("graphql");
const { graphqlHTTP } = require(express - graphql);
const locationData = require("./MOCK_DATA.json");
const app = express();
const PORT = 4000;

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => {
    id: {
      type: GraphQLInt;
    }
    name: {
      type: GraphQLString;
    }
    address: {
      type: GraphQLString;
    }
    coordinates: {
      type: GraphQLInputObjectType;
    }
  },
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});
const Mutation = "mutation";

// create graphql server
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
  "./graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
