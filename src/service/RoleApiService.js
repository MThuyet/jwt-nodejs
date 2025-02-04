import { raw } from 'body-parser';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';
import { at, includes } from 'lodash';

// create new roles
const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ['url', 'description'],
      raw: true,
    });

    // compare roles request and current roles
    const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1));

    if (persists.length === 0) {
      return {
        EM: 'Nothing to create',
        EC: 0,
        DT: [],
      };
    }

    let data = await db.Role.bulkCreate(persists);

    if (!data) {
      return {
        EM: 'Create roles fail',
        EC: '1',
        Dt: [],
      };
    }

    return {
      EM: `Create ${persists.length} roles successfully`,
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

// get all roles
const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ['id', 'url', 'description'],
      raw: true,
      order: [['id', 'DESC']],
    });

    return {
      EM: 'Get data all roles successfully',
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

// delete roles
const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: {
        id,
      },
    });

    let data = await role.destroy();

    if (data) {
      return {
        EM: 'Delete roles successfully',
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: 'Delete roles fail',
        EC: '1',
        Dt: [],
      };
    }
  } catch (error) {
    return {
      EM: 'Something went wrong with server',
      EC: '1',
      DT: [],
    };
  }
};

// getRoleByGroup
const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: 'Not found any role by group',
        EC: '2',
        DT: [],
      };
    }

    let roles = await db.Group.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'name', 'description'],
      include: { model: db.Role, attributes: ['id', 'url', 'description'], through: { attributes: [] } },
    });

    if (roles) {
      return {
        EM: 'Get role by group successfully',
        EC: 0,
        DT: roles,
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

// assign role to group
const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({ where: { groupId: +data.groupId } });

    let check = await db.Group_Role.bulkCreate(data.groupRoles);
    if (check) {
      return {
        EM: 'Assign role to group successfully',
        EC: 0,
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

module.exports = { createNewRoles, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup };
