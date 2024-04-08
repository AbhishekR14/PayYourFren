const { JWT_SECRET } = require("./config");
const jsonwebtoken = require("jsonwebtoken");

const authMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedValue = jsonwebtoken.verify(token, JWT_SECRET);
    if (decodedValue.userId) {
      req.userId = decodedValue.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = { authMiddleware };
