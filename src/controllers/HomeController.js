import express from 'express';
import UserService from '../service/UserService';

const handleHelloWorld = (req, res) => {
  return res.render('Home.ejs');
};

const handleUserPage = async (req, res) => {
  let userList = await UserService.getUserList();
  return res.render('User.ejs', { userList });
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  // UserService.createNewUser(email, password, username);

  return res.send('ok');
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateUser };
