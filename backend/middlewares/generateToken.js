const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateToken(user, role = null) {
  const payload = {
    id: user.id,
    username: user.username,
    role: role,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

module.exports = { generateToken };