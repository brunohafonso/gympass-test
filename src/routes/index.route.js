const multer = require('multer');
const multerConfig = require('../middlewares/multer.middleware');

const upload = multer(multerConfig).single('file');
const { getRaceDataFromLogFile, renderHomePage } = require('../controllers/race.controller');


module.exports = (app) => {
  app.route('/race')
    .get(renderHomePage)
    .post((req, res) => {
      upload(req, res, (err) => {
        if (err) {
          res.status(400).send('<h2>Please check the file format before upload.</h2>');
        }
      });
      getRaceDataFromLogFile(req, res);
    });
};
