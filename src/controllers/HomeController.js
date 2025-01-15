const handleHelloWorld = (req, res) => {
  return res.render('Home.ejs');
};

const handleUserPage = (req, res) => {
  return res.render('User.ejs');
};

module.exports = { handleHelloWorld, handleUserPage };
