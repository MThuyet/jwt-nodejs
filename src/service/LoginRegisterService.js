import db from '../models/index';
import bcrypt from 'bcryptjs';

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
    // check email or phone exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: 'Email already exist',
        EC: '1',
      };
    }

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

module.exports = {
  registerNewUser,
};
