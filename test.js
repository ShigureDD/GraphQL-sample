const { ApolloServer } = require("apollo-server");
const { buildSchema } = require('graphql');
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers");

// Read the schema from the file
const typeDefs = fs.readFileSync(path.join(__dirname, "graphql_example.graphql"), "utf8");

// Build the schema
const schema = buildSchema(typeDefs);

// Helper function to test resolvers directly
const testResolver = (resolver, parent = {}, args = {}, context = {}) => {
  return resolver(parent, args, context);
};

describe("GraphQL API Tests", () => {

  test("should fetch all users", async () => {
    const users = await testResolver(resolvers.Query.users);
    
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
  });

  test("should fetch a user by ID", async () => {
    const user = await testResolver(resolvers.Query.user, {}, { id: "1" });
    
    expect(user).toBeDefined();
    expect(user.id).toBe("1");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    
    // Test posts resolver
    const posts = await testResolver(resolvers.User.posts, user);
    expect(Array.isArray(posts)).toBe(true);
  });

  test("should create a new user", async () => {
    const testUser = {
      name: "Test User",
      email: "test.user@example.com"
    };

    const newUser = await testResolver(resolvers.Mutation.createUser, {}, testUser);

    expect(newUser).toBeDefined();
    expect(newUser.name).toBe(testUser.name);
    expect(newUser.email).toBe(testUser.email);
    expect(newUser.id).toBeDefined();
  });
});
