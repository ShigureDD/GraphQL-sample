const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const db = require("./db.json");
const resolvers = require("./resolvers");

// Read the schema from the file
const typeDefs = fs.readFileSync(path.join(__dirname, "graphql_example.graphql"), "utf8");

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server is running, GraphQL Playground available at ${url}`);
});
