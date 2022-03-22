const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
      err && res.status(403).json("Token của bạn không đúng!");
      req.user = userData;
      next();
    });
  } else return res.status(401).json("Bạn chưa được xác thực");
};
const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else return res.status(403).json("Bạn không được phép làm điều đó");
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else return res.status(403).json("Bạn không được phép làm điều đó");
  });
};

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAdmin };
