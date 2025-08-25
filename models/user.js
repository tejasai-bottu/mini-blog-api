let users = [];
let nextUserId = 1;

const createUser = (userData) => {
  const user = {
    id: nextUserId++,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    createdAt: new Date()
  };
  
  users.push(user);
  return user;
};

const findUserById = (id) => {
  return users.find(user => user.id === id);
};

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

const getAllUsers = () => {
  return users.map(({ password, ...user }) => user); // Exclude passwords
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  getAllUsers
};
