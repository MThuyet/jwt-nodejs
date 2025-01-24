import { where } from 'sequelize/lib/sequelize';
import db from '../models/index';

const createNewUser = async (data) => {
  try {
    await db.User.create({});
  } catch (error) {
    console.log(error);
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
      include: { model: db.Group, attributes: ['name', 'description'] },
      offset,
      limit,
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
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      // update
      await db.User.save({});
    } else {
      // not found
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
