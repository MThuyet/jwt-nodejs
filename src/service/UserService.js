import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

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

const getUserList = () => {
  let users = [];
  connection.query('SELECT * FROM `users`', function (err, results, fields) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('check result', results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
