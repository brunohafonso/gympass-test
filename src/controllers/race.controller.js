const fs = require('fs');
const { extractDataFromLogBuffer } = require('../lib/extractLog')();
const { getRaceData } = require('../lib/extractInformation')();

function getRaceDataFromLogFile(req, res) {
  try {
    const logData = extractDataFromLogBuffer(req.file.buffer);
    const raceData = getRaceData(logData);
    console.info('saving json file on teste.json');
    fs.writeFileSync('./teste.json', JSON.stringify(raceData));
    res.status(200).render('home', { pilotsData: raceData });
  } catch (error) {
    res.status(400).json({
      errorMessage: `Error to get data from log file, please check the file format - ${error.message}`,
    });
  }
}

function renderHomePage(req, res) {
  res.render('home', { pilotsData: { pilotsData: [], errorMessage: '' } });
}

module.exports = {
  getRaceDataFromLogFile,
  renderHomePage,
};
