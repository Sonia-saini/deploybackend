const loginValidator = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory!" });
    }
    next();
  };
  
  module.exports = { loginValidator };