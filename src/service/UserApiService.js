import { where } from 'sequelize/lib/sequelize';
import db from '../models/index';
import { checkEmailExist, checkPhoneExist, hashPassword } from './LoginRegisterService';

const createNewUser = async (data) => {
  try {
    // check email exist
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: 'Email already exist',
        EC: '1',
        DT: 'email',
      };
    }

    // check phone exist
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: 'Phone number already exist',
        EC: '1',
        DT: 'phone',
      };
    }

    // hash password
    let hashUserPassword = hashPassword(data.password);

    // create new user
    await db.User.create({ ...data, password: hashUserPassword });
    return {
      EM: 'Create user successfully',
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ['id', 'email', 'username', 'phone', 'sex', 'address'],
      include: { model: db.Group, attributes: ['name', 'description'] },
    });
    if (users) {
      return {
        EM: 'Get data successfully',
        EC: '0',
        DT: users,
      };
    } else {
      return {
        EM: 'Something went wrong with server',
        EC: '1',
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      attributes: ['id', 'email', 'username', 'phone', 'sex', 'address'],
      include: { model: db.Group, attributes: ['id', 'name', 'description'] },
      offset,
      limit,
      order: [['id', 'DESC']],
    });

    let totalPage = Math.ceil(count / limit);

    let data = {
      totalRow: count,
      totalPage,
      users: rows,
    };

    return {
      EM: 'Get data successfully',
      EC: '0',
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: 'Empty GroupId',
        EC: 1,
        DT: ['groupId'],
      };
    }

    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      // update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });

      return {
        EM: 'Update user successfully',
        EC: 0,
        DT: [],
      };
    } else {
      // not found
      return {
        EM: 'User not found',
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    let userDelete = await db.User.findOne({
      where: { id },
    });

    if (userDelete) {
      await userDelete.destroy();

      return {
        EM: 'Delete user successfully',
        EC: '0',
        DT: [],
      };
    } else {
      return {
        EM: 'User not exist',
        EC: '2',
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
