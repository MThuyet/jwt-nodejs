import UserApiService from '../service/UserApiService';

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await UserApiService.getUserWithPagination(+page, +limit);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await UserApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data = await UserApiService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await UserApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await UserApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: 'Get user account successfully',
    EC: 0,
    DT: { access_token: req.token, groupWithRoles: req.user.groupWithRoles, email: req.user.email, username: req.user.username },
  });
};

module.exports = { readFunc, createFunc, updateFunc, deleteFunc, getUserAccount };
