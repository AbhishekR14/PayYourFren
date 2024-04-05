import { JWT_SECRET } from "./config";
const jsonwebtoken = require("jsonwebtoken");

export function authMiddleware(req, res, next) {
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
}
