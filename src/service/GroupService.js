import db from '../models/index';

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [['name', 'ASC']],
    });

    if (data) {
      return {
        EM: 'Get groups successfully',
        EC: '0',
        DT: data,
      };
    } else {
      return {
        EM: 'Get groups fail',
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

module.exports = {
  getGroups,
};
