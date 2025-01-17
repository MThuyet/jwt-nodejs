import express from 'express';
import UserService from '../service/UserService';

const handleHelloWorld = (req, res) => {
  return res.render('Home.ejs');
};

// get user page
const handleUserPage = async (req, res) => {
  await UserService.getUserList();
  // return res.render('User.ejs', { userList });
  return res.send('User page');
};

// create new user
const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  UserService.createNewUser(email, password, username);

  return res.redirect('/user');
};

// delete user
const handleDeleteUser = async (req, res) => {
  await UserService.deleteUser(req.params.id);
  return res.redirect('/user');
};

// get update user
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await UserService.getUserById(id);
  let userData = user;

  return res.render('User-update.ejs', { userData });
};

// handle update user
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await UserService.updateUser(email, username, id);

  return res.redirect('/user');
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
