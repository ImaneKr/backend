const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateToken(User) {
  const payload = {
    id: User.id,
    username: User.username,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

module.exports = { generateToken };