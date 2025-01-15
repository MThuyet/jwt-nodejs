import e from 'express';
import UserService from '../service/UserService';

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

  // UserService.createNewUser(email, password, username);
  UserService.getUserList();

  return res.send('ok');
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateUser };
