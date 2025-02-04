import UserApiService from '../service/UserApiService';
import RoleApiService from '../service/RoleApiService';

const readFunc = async (req, res) => {
  try {
    let data = await RoleApiService.getAllRoles();

    if (data && +data.EC === 0) {
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
    let data = await RoleApiService.createNewRoles(req.body);
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

// todo
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
    let data = await RoleApiService.deleteRole(req.body.id);
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

// get role by group
const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await RoleApiService.getRoleByGroup(id);
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

const assignRoleToGroup = async (req, res) => {
  try {
    let data = await RoleApiService.assignRoleToGroup(req.body);
    if (data && +data.EC === 0) {
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

module.exports = { readFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup };
