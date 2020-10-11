const jwt = require('jsonwebtoken');

const { User } = require('../models/user.js');
const ERROR = require('../types/error');

const register = async (username, password, role) => {
  const user = await User.findOne({ username });
  if (user) throw new Error(ERROR.USERNAME_EXISTED);
  const newUser = new User({
    username, role
  });
  newUser.generatePassword(password);
  return newUser.save();
};

const login = async (username, password, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ username });
      if (!user) reject(new Error(ERROR.USERNAME_NOT_EXISTED));
      if (!user.validatePassword(password)) {
        reject(new Error(ERROR.PASSWORD_NOT_MATCHED));
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  })
};

const generateJWT = (user) => {
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET
  );
  return accessToken;
};

module.exports = { register, login, generateJWT };
