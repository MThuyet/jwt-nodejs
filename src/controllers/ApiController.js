const testApi = (req, res) => {
  return res.status(200).json({ message: 'Success', data: 'testApi' });
};

module.exports = { testApi };
