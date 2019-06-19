const fs = require('fs');

const { extractDataFromLogFile } = require('./lib/extractLog')();
const { consolidateRaceData } = require('./lib/extractInformation')();

const logData = extractDataFromLogFile(`${__dirname}/resources/corrida.log`);

const raceData = consolidateRaceData(logData);

fs.writeFileSync('./teste.json', JSON.stringify(raceData));
