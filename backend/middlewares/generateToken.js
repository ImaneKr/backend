const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateGuardianToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    // Guardians do not have a role, so it is not included in the payload
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}
async function generateStaffToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role, // Include the role for staff members
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

module.exports = { generateGuardianToken, generateStaffToken };