const multer = require("multer");
const fs = require('fs');

const uploadDirectory = 'uploads'; 

// Check if the 'uploads' directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Specify the destination for uploaded files and provide a custom filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5, 
  },
});

module.exports = upload;