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
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM `user`');
    return rows;
  } catch (error) {
    console.log('check get list user error', error);
  }
};

// delete user
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute('DELETE FROM `user` WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.log('check delete error', error);
  }
};

// get user by id
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM `user` WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.log('check error get user', error);
  }
};

// update user
const updateUser = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute('UPDATE `user` SET email = ?, username = ? WHERE id = ?', [
      email,
      username,
      id,
    ]);
    return rows;
  } catch (error) {
    console.log('check error update', error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
