import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTAction';
require('dotenv').config();

// function check email exist
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }

  return false;
};

// function check phone exist
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }

  return false;
};

// function hash password
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// register new user
const registerNewUser = async (rawUserData) => {
  try {
    // check email exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: 'Email already exist',
        EC: '1',
      };
    }

    // check phone exist
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: 'Phone number already exist',
        EC: '1',
      };
    }

    // hash password
    let hashUserPassword = hashPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      password: hashUserPassword,
      username: rawUserData.username,
      phone: rawUserData.phone,
      groupId: 4,
    });

    return {
      EM: 'Create a new user successfully',
      EC: '0',
    };
  } catch (error) {
    console.log('check create user error', error);
    return {
      EM: 'Something went wrong from server',
      EC: '-2',
    };
  }
};

// check password
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

// handle login
const handleUserLogin = async (rawData) => {
  try {
    // check user
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      // check password
      let isCorrectPassword = checkPassword(rawData.password, user.password);

      if (isCorrectPassword === true) {
        // test role
        let groupWithRoles = await getGroupWithRoles(user);

        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        // create token
        let token = createJWT(payload);

        return {
          EM: 'Login successfully',
          EC: '0',
          DT: { access_token: token, groupWithRoles },
        };
      }
    }

    console.log('Not found user with email/phone: ', rawData.valueLogin, 'Password: ', rawData.password);
    return {
      EM: 'Your email/phone or password is incorrect',
      EC: '1',
      DT: '',
    };

    console.log('check password', isCorrectPassword);
  } catch (error) {
    console.log('check create user error', error);
    return {
      EM: 'Something went wrong from server',
      EC: '-2',
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  checkEmailExist,
  checkPhoneExist,
  hashPassword,
};
