const multer = require('multer');
const multerConfig = require('../middlewares/multer.middleware');

const upload = multer(multerConfig).single('file');
const { getRaceDataFromLogFile, renderHomePage } = require('../controllers/race.controller');


module.exports = (app) => {
  app.route('/race')
    .get(renderHomePage)
    .post(upload, getRaceDataFromLogFile);
};
