import { raw } from 'body-parser';
import db from '../models/index';

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

module.exports = { createNewRoles };
