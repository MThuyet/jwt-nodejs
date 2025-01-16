import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';

// function hash password
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// create new user
const createNewUser = async (email, password, username) => {
  let hashUserPassword = hashPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashUserPassword,
      username: username,
    });
  } catch (error) {
    console.log('check create user error', error);
  }
};

// get user list
const getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;
};

// delete user
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
};

// get user by id
const getUserById = async (userId) => {
  let user = await db.User.findOne({
    where: {
      id: userId,
    },
  });

  return user;
};

// update user
const updateUser = async (email, username, id) => {
  await db.User.update(
    {
      email,
      username,
    },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
