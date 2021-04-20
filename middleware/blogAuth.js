const jwt = require("jsonwebtoken");
const config = require("config");

//authorization for blog

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    if(req.user.email == "tech@ungrezi.com") //implement access control in future for supporting multiple users
    next();
    else
    res.status(400).send("Invalid token.");

  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};