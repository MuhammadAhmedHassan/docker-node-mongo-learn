exports.internalServerError = (req, res, error) => {
  console.log(error);
  res.status(500).json({ error: "Something went wrong" });
};
exports.badRequestError = (req, res, msg, status = 400) => {
  res.status(status).json({ error: msg });
}
