/**
 * ExtractLog Module.
 * @module src/lib/extractLog
 * @author Bruno Afonso <brunohafonso@gmail.com>
 */

module.exports = () => {
  /**
   * function that extract the date of line of log file.
   * @function extractDate
   * @param  {string} lineContent - receive the line content of the log file with the data
   * to be extracted (date of the lap completed).
   * @returns {string}
   * return the date that the lap was completed.
   */
  function extractDate(lineContent) {
    try {
      const date = lineContent.match(/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]).([0-9].?.?)/gi)[0].trim();
      if (!date) {
        throw new Error('please check the log format');
      }
      return date;
    } catch (error) {
      throw new Error(`error to get date of the lap end - ${error.message}`);
    }
  }

  /**
   * function that extract the pilot code and the pilot name of line of log file.
   * @function extractPilotInformation
   * @param  {string} lineContent - receive the line content of the log file with the data
   * to be extracted (pilot code and the pilot name).
   * @returns {object}
   * return the object with pilot code and the pilot name.
   */
  function extractPilotInformation(lineContent) {
    try {
      let pilotData = lineContent.match(/(\s)([0-9][0-9][0-9])(\s)([^\w*])(\s)(\w)([^\w*])([^\s]+)/gi)[0].trim();
      if (!pilotData) {
        throw new Error('please check the log format');
      }
      pilotData = pilotData.split(/(\s)([^\-*])(\s)/gi);
      return {
        pilotId: pilotData.length ? pilotData[0] : '',
        pilotName: pilotData.length ? pilotData[4] : '',
      };
    } catch (error) {
      throw new Error(`error to get pilot data - ${error.message}`);
    }
  }

  /**
   * function that extract the lap number of line of log file.
   * @function extractLapNumber
   * @param  {string} lineContent - receive the line content of the log file with the data
   * to be extracted (lap number).
   * @returns {string}
   * return the lap number.
   */
  function extractLapNumber(lineContent) {
    try {
      const lapNumber = lineContent.match(/(\s)([0-9])(\s)/gi)[0].trim();
      if (!lapNumber) {
        throw new Error('please check the log format');
      }
      return lapNumber;
    } catch (error) {
      throw new Error(`error to get lap number - ${error.message}`);
    }
  }

  /**
   * function that extract the lap time of line of log file.
   * @function extractLapTime
   * @param  {string} lineContent - receive the line content of the log file with the data
   * to be extracted (lap time).
   * @returns {string}
   * return the lap number.
   */
  function extractLapTime(lineContent) {
    try {
      const lapTime = lineContent.match(/(\s)([0-9]):([0-9][0-9]).([0-9].?.?)/gi)[0].trim();
      if (!lapTime) {
        throw new Error('please check the log format');
      }
      return lapTime;
    } catch (error) {
      throw new Error(`error to get lap time - ${error.message}`);
    }
  }

  /**
   * function that extract the average velocity of line of log file.
   * @function extractVelocity
   * @param  {string} lineContent - receive the line content of the log file with the data
   * to be extracted (average velocity).
   * @returns {string}
   * return the average velocity.
   */
  function extractVelocity(lineContent) {
    try {
      const velocity = lineContent.match(/(\s)([0-9][0-9]),([0-9].?.?)/gi)[0].trim();
      if (!velocity) {
        throw new Error('please check the log format');
      }
      return velocity;
    } catch (error) {
      throw new Error(`error to get average velocity - ${error.message}`);
    }
  }

  /**
   * function that extract the data from log file.
   * @function extractDataFromLogBuffer
   * @param  {string} logFilePath - receive the path of the log file.
   * to be extracted (average velocity).
   * @returns {array}
   * return the an array of objects with the data extracted from the log file.
   */
  function extractDataFromLogBuffer(logBuffer) {
    try {
      if (!logBuffer) {
        throw new Error('the file buffer cant be null');
      }

      const logData = logBuffer.toString();
      const raceData = [];

      logData.split('\n').forEach((line, index) => {
        if (index !== 0) {
          const { pilotId, pilotName } = extractPilotInformation(line);
          const lapData = {
            hour: extractDate(line),
            pilotId,
            pilotName,
            lapNumber: extractLapNumber(line),
            lapTime: extractLapTime(line),
            averageSpeed: extractVelocity(line),
          };

          raceData.push(lapData);
        }
      });
      return raceData;
    } catch (error) {
      throw new Error(`error to extract the data from log file - ${error.message}`);
    }
  }

  return {
    extractDate,
    extractPilotInformation,
    extractLapNumber,
    extractLapTime,
    extractVelocity,
    extractDataFromLogBuffer,
  };
};
