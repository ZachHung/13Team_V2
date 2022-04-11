const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
      err && res.status(403).json("Token is invalid!");
      req.user = userData;
      next();
    });
  } else return res.status(401).json("You are not authenticated"); //When not logged in
};
const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userID || req.user.isAdmin) {
      next();
    } else return res.status(403).json("You don't have the rights to do that");
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else return res.status(403).json("You don't have the rights to do that");
  });
};

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAdmin };
