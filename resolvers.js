const db = require("./db.json");

const resolvers = {
  Query: {
    user: (_, { id }) => {
      return db.users.find((user) => user.id === id);
    },
    users: () => {
      return db.users;
    },
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const newUser = {
        id: String(db.users.length + 1),
        name,
        email,
        posts: [],
      };
      db.users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, name, email }) => {
      const userIndex = db.users.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
      const updatedUser = {
        ...db.users[userIndex],
        name: name || db.users[userIndex].name,
        email: email || db.users[userIndex].email,
      };
      db.users[userIndex] = updatedUser;
      return updatedUser;
    },
  },
  User: {
    posts: (user) => {
      return db.posts.filter((post) => user.posts.includes(post.id));
    },
  },
  Post: {
    author: (post) => {
      return db.users.find((user) => user.id === post.author);
    },
  },
};

module.exports = resolvers;
