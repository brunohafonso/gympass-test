/**
 * ExtractLog Module.
 * @module src/lib/extractInformation
 * @author Bruno Afonso <brunohafonso@gmail.com>
 */
module.exports = () => {
  /**
   * function that list all the pilots on race based on log file.
   * @function getAllPilotsOnRace
   * @param  {array} dataList - receive the list of data extracted of log file.
   * @returns {array}
   * return the list of objects with the pilots in the race.
   */
  function getAllPilotsOnRace(dataList) {
    try {
      return removeRepeatedDataFromArray(dataList, 'pilotId').map(({ pilotId, pilotName }) => ({
        pilotId, pilotName,
      }));
    } catch (error) {
      if (error) throw new Error(`error to get pilot list - ${error.message}`);
    }
  }

  /**
   * function that return all the consolited data based on log file.
   * @function getRadeData
   * @param  {array} dataList - receive the list of data extracted of log file.
   * @returns {array}
   * return the list of objects with all consolided list of the race
   * (classification, best lap of each pilot and etc).
   */
  function getRaceData(dataList) {
    try {
      const pilotDataList = getPilotsAndLapsInformation(dataList);
      return {
        pilotsData: pilotDataList.map(pilot => ({
          ...pilot,
          pilotId: pilot.pilotId,
          pilotName: pilot.pilotName,
          completedLaps: pilot.lapsData.length,
          totalTestTime: getTotalTestTime(pilot.lapsData),
          totalAverageSpeed: getTotalAverageSpeed(pilot.lapsData),
          testCompleted: pilot.lapsData.length === 4,
        })).sort((a, b) => ((a.totalTestTime > b.totalTestTime) ? 1 : -1)),
        bestLap: getBestLapOnRace(pilotDataList),
      };
    } catch (error) {
      throw new Error(`error to get race details - ${error.message}`);
    }
  }

  /**
   * function that return a list with the association between pilots and laps
   * data based on log file.
   * @function getPilotsAndLapsInformation
   * @param  {array} dataList - receive the list of data extracted of log file.
   * @returns {array}
   * return the list of objects with with the association between pilots and laps
   * data based on log file.
   */
  function getPilotsAndLapsInformation(dataList) {
    try {
      const pilotsList = getAllPilotsOnRace(dataList);
      return pilotsList.map((pilot) => {
        const lapsData = dataList.filter((data) => {
          if (data.pilotId === pilot.pilotId) {
            return true;
          }
          return false;
        }).map(data => ({
          hour: data.hour,
          lapNumber: data.lapNumber,
          lapTime: data.lapTime,
          averageSpeed: data.averageSpeed,
        })).sort((a, b) => ((a.lapTime > b.lapTime) ? 1 : -1));
        return {
          pilotId: pilot.pilotId,
          pilotName: pilot.pilotName,
          lapsData,
        };
      });
    } catch (error) {
      if (error) throw new Error(`error to get lap information - ${error.message}`);
    }
  }

  /**
   * function that return total time of the race.
   * @function getTotalTestTime
   * @param  {array} laps - receive the list of the laps of a pilot.
   * @returns {string}
   * return the total time of the race based on laps data of the pilot.
   */
  function getTotalTestTime(laps) {
    try {
      let totalTestTime = 0;
      laps.forEach((lap) => {
        const [minutes, seconds] = lap.lapTime.split(':');
        totalTestTime += ((parseInt(minutes, 0) * 60) + parseFloat(seconds));
      });
      const date = new Date(0, 0, 0, 0, 0, 0);
      date.setSeconds(parseFloat(totalTestTime, 0));
      totalTestTime = totalTestTime.toFixed(3);
      date.setMilliseconds(parseInt((totalTestTime % 1).toString().substring(2, 5), 0));
      totalTestTime = `${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
      return totalTestTime;
    } catch (error) {
      throw new Error(`Error to get total test time - ${error.message}`);
    }
  }

  /**
   * function that return the average speed of a pilot based on laps data.
   * @function getTotalAverageSpeed
   * @param  {array} laps - receive the list of the laps of a pilot.
   * @returns {string}
   * return the average speed of a pilot based on laps data.
   */
  function getTotalAverageSpeed(laps) {
    try {
      let totalAverageSpeed = 0;
      laps.forEach((lap) => {
        totalAverageSpeed += parseFloat(lap.averageSpeed);
      });
      return (totalAverageSpeed / laps.length).toFixed(2);
    } catch (error) {
      throw new Error(`Error to get total average speed - ${error.message}`);
    }
  }

  /**
   * function that return an array of objects deleting the repeated items.
   * @function removeRepeatedDataFromArray
   * @param  {array} arr - array that will be cleaned from repeated items.
   * @param  {string} comp - property that cant be repeated.
   * @returns {array}
   * return an array of objects deleting the repeated items.
   */
  function removeRepeatedDataFromArray(arr, comp) {
    try {
      return arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
    } catch (error) {
      throw new Error(`Error to remove repeated data from array - ${error.message}`);
    }
  }

  /**
   * function that return an array of objects deleting the repeated items.
   * @function getBestLapOnRace
   * @param  {array} dataList - array with pilots information.
   * @returns {object}
   * return an object with the information of the best lap.
   */
  function getBestLapOnRace(dataList) {
    try {
      return dataList.map(pilot => ({
        pilotId: pilot.pilotId,
        pilotName: pilot.pilotName,
        lapTime: pilot.lapsData[0] ? pilot.lapsData[0].lapTime : '',
        averageSpeed: pilot.lapsData[0] ? pilot.lapsData[0].averageSpeed : '',
      })).sort((a, b) => ((a.lapTime > b.lapTime) ? 1 : -1))[0];
    } catch (error) {
      throw new Error(`Error to get best lap o race - ${error.message}`);
    }
  }

  return {
    getRaceData,
    getAllPilotsOnRace,
    getPilotsAndLapsInformation,
    removeRepeatedDataFromArray,
    getTotalAverageSpeed,
    getTotalTestTime,
    getBestLapOnRace,
  };
};
