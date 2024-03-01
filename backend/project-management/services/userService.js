require("dotenv").config();

const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function createUser(userDetails) {
  try {
    const hashedPassword = await bcrypt.hash(userDetails?.password, 10);
    const newUser = { ...userDetails, password: hashedPassword };
    const user = await User.create(newUser);
    return user;
  } catch (error) {
    throw error;
  }
}

async function login({ username, password }) {
  const user = await User.findOne({ where: { rollNo: username } });
  if (!user) {
    throw new Error('Username or password is incorrect');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Username or password is incorrect');
  }
  const token = jwt.sign({ userId: user.rollNo }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  const metaData = { role: user.role, username: user.name };
  return [metaData, token];
}

async function getUserByEmail(userEmail) {
  try {
    const user = await User.findOne({ where: { userEmail } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByRollNo(rollNo) {
  try {
    const user = await User.findOne({ where: { rollNo } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(rollNo, userDetails) {
  try {
    const user = await User.findOne({ where: { rollNo } });
    if (!user) {
      throw new Error('User not found');
    }
    user.email = userDetails?.email;
    const hashedPassword = await bcrypt.hash(userDetails?.password, 10);
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}


async function deleteUser(rollNo) {
  try {
    const user = await User.findOne({ where: { rollNo } });
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserByRollNo,
  getUsers,
  login
};
