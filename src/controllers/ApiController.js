import LoginRegisterService from '../service/LoginRegisterService';

const testApi = (req, res) => {
  return res.status(200).json({ message: 'Success', data: 'testApi' });
};

// handle register
const handleRegister = async (req, res) => {
  try {
    // validation
    if (!req.body.email || !req.body.username || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: 'Missing required parameters',
        EC: '1',
        DT: '',
      });
    }

    if (req.body.password.length < 3) {
      return res.status(200).json({
        EM: 'Your password must be at least 3 characters',
        EC: '1',
        DT: '',
      });
    }

    // service: create user
    let data = await LoginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: '',
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

// handle login
const handleLogin = async (req, res) => {
  try {
    let data = await LoginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'Error form server', // Error message
      EC: '-1', // Error code
      DT: '', // Data
    });
  }
};

module.exports = { testApi, handleRegister, handleLogin };
