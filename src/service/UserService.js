import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// function hash password
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// create new user
const createNewUser = async (email, password, username) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  let hashUserPassword = hashPassword(password);

  try {
    const [rows, fields] = await connection.execute(
      'INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',
      [email, hashUserPassword, username]
    );
    return rows;
  } catch (error) {
    console.log('check error', error);
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
    const [rows, fields] = await connection.execute('SELECT * FROM `users`');
    return rows;
  } catch (error) {
    console.log('check error', error);
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
    const [rows, fields] = await connection.execute('DELETE FROM `users` WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.log('check error', error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
};
