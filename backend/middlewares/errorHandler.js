const createError = require("../utils/error");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (!err.status) {
    err = createError(500, "Internal Server Error");
  }

  res.status(err.status).json({ error: err.message });
};

module.exports = errorHandler;