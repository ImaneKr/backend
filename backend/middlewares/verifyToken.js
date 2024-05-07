const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

function verifyToken(token) {
  const secret = process.env.JWT_SECRET_KEY;

  try {
    return jwt.verify(token, secret);
  } catch (e) {
    throw createError(401, "Invalid token");
  }
}

const verifyRole = (role) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (payload.role !== role) {
    return next(createError(403, "Forbidden"));
  }

  req.user = payload;
  next();
};

const verifyAdmin = verifyRole("admin");
const verifySecretary = verifyRole("secretary");
const verifyTeacher = verifyRole("teacher");

module.exports = { verifyToken, verifyAdmin, verifySecretary, verifyTeacher };