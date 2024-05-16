const multer = require('multer');

// Define storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify how to name the uploaded files
  }
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });

module.exports = upload; // Export the configured multer middleware
