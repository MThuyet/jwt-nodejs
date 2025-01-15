import e from 'express';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

const handleHelloWorld = (req, res) => {
  return res.render('Home.ejs');
};

const handleUserPage = (req, res) => {
  return res.render('User.ejs');
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  connection.query(
    'INSERT INTO `users`(`email`, `password`, `username`) VALUES (?, ?, ?)',
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );

  res.send('ok');
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateUser };
