const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Token creation

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.MYSECRET, {
    expiresIn: "3d",
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); //3
    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //7
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  //1
  const { email, password } = req.body; //2

  try {
    const user = await User.signup(email, password); //3
    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //7
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { loginUser, signupUser }; //8
