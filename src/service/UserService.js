import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashUserPassword = hashPassword(password);

  connection.query(
    'INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',
    [email, hashUserPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });

  let users = [];

  // connection.query('SELECT * FROM `users`', function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //     return users;
  //   }
  //   users = results;
  //   console.log('run get users', users);
  //   return users;
  // });

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM `users`');
    return rows;
  } catch (error) {
    console.log('check error', error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
