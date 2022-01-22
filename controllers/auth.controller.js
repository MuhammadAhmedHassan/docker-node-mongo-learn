const { User } = require("../models/user.model");
const { internalServerError, badRequestError } = require("../utils/utils");


exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(201).json({ data: { user } });
  } catch (error) {
    internalServerError(req, res, error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return badRequestError(req, res, "User not found");
    }
    const matched = await User.comparePassword(user.password, password);
    if (!matched) {
      return badRequestError(req, res, "Invalid credentials");
    }
    req.session.user = user;
    res.json({ data: { user } });
  } catch (error) {
    internalServerError(req, res, error);
  }
};
