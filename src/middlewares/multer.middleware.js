const multer = require('multer');

const storage = multer.memoryStorage();

module.exports = {
  storage,
  limits: {
    fileSize: 2 * 1024 * 1014,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'text/plain',
      'text/x-log',
      'application/octet-stream',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
