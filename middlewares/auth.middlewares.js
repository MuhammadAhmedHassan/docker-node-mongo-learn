const { badRequestError } = require("../utils/utils");

exports.protect = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return badRequestError(req, res, "unauthorized", 401)
  }
  next();
}