const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
////////////////////////////////
//static signup method

userSchema.statics.signup = async function (email, password) {
  //4

  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email is already in usage");
  }

  const salt = await bcrypt.genSalt(10); //5
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user; // 6
};

///////////////////////////////////////
//static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  //incorrect email

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
