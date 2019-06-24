const fs = require('fs');
const { extractDataFromLogBuffer } = require('../lib/extractLog')();
const { getRaceData } = require('../lib/extractInformation')();

function getRaceDataFromLogFile(req, res) {
  try {
    console.table(req);
    const logData = extractDataFromLogBuffer(req.file.buffer);
    const raceData = getRaceData(logData);
    console.info('saving json file on teste.json');
    fs.writeFileSync('./teste.json', JSON.stringify(raceData));
    res.status(200).render('home', { message: 'hello' });
  } catch (error) {
    res.status(400).send(`<h2>Error to get data from log file, please check the file format - ${error.message}</h2>`);
  }
}

function renderHomePage(req, res) {
  res.render('home', { message: 'hello' });
}

module.exports = {
  getRaceDataFromLogFile,
  renderHomePage,
};
