const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET_KEY;
  let token;

  // Extract token from headers or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else {
    return next(createError(401, "No token provided"));
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (e) {
    return next(createError(401, "Invalid token"));
  }
};


const verifyRole = (...requiredRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(payload.role);
    if (!requiredRoles.includes(payload.role)) {
       return res.status(403).send({ error: 'Forbidden' });
    }
    req.user = payload;

    next();
  } catch (error) {
    return next(createError(401, "Invalid token"));
  }
};
//Define separate middleware functions for each role
const verifyAdmin = verifyRole("admin");
const verifySecretary = verifyRole("secretary");
const verifyTeacher = verifyRole("teacher");
const verifyAdminOrSecretary = verifyRole("admin", "secretary");
module.exports = { verifyToken, verifyAdmin, verifySecretary, verifyTeacher,verifyAdminOrSecretary };