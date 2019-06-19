const fs = require('fs');
const { resolve } = require('path');

const { extractDataFromLogFile } = require('./lib/extractLog')();
const { consolidateRaceData } = require('./lib/extractInformation')();

const logData = extractDataFromLogFile(`${__dirname}/resources/corrida.txt`);

const raceData = consolidateRaceData(logData);

console.info(`saving json file on ${resolve('./teste.json')}`);
fs.writeFileSync('./teste.json', JSON.stringify(raceData));
