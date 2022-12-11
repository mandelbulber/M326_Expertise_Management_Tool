exports.home = (req, res) => {
  res.status(200).send("Home Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
