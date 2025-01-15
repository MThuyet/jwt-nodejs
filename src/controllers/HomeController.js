import express from 'express';
import UserService from '../service/UserService';

const handleHelloWorld = (req, res) => {
  return res.render('Home.ejs');
};

// get user page
const handleUserPage = async (req, res) => {
  let userList = await UserService.getUserList();
  return res.render('User.ejs', { userList });
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

module.exports = { handleHelloWorld, handleUserPage, handleCreateUser, handleDeleteUser };
