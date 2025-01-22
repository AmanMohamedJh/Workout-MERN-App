const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //so for Eg: a token registered is like this "Bearer fdjsnfnasd --> first part is the bearer we dont use that much"
  //but the second part which is in array 1 --> is the token mainly
  //but authorization token is always combined both so we have to split and take only the second part
  // this below is how we do it

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.MYSECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
