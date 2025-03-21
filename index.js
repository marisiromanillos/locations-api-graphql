const express = require("express");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const locationData = require("./MOCK_DATA.json");
const app = express();
const PORT = 4000;

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllLocations: {
      type: new GraphQLList(LocationType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return locationData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createLocation: {
      type: LocationType,
      args: {
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) },
      },
      resolve(parent, args) {
        locationData.push({
          id: locationData.length + 1,
          name: args.name,
          address: args.address,
          coordinates: args.coordinates,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
