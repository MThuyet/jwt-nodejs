import GroupService from '../service/GroupService';

const readFunc = async (req, res) => {
  try {
    let data = await GroupService.getGroups();
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

module.exports = { readFunc };
