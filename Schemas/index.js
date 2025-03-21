const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const LocationType = require("./TypeDefinitions/LocationType");
const locationData = require("../MOCK_DATA.json");
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

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
