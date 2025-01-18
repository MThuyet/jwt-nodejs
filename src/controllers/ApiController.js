const testApi = (req, res) => {
  return res.status(200).json({ message: 'Success', data: 'testApi' });
};

const handleRegister = (req, res) => {
  return console.log('callme', req.body);
};

module.exports = { testApi, handleRegister };
