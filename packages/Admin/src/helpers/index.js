/**
 * @function matchLevelCMSDataWithServiceCMS
 * @summary math level commission with service commission come to array with both
 */
export const matchLevelCMSDataWithServiceCMS = (levelData, serviceCMSData) => {
  let array = [];
  if (levelData.length > 0) {
    levelData.map(level => {
      const check = serviceCMSData.filter(
        service => parseInt(level.level) === parseInt(service.level_type)
      );
      level[`value`] = check.length > 0 ? check[0].value : 0;
      array.push(level)
    });
  }
  if(array.length > 0) return array.sort((a,b) => (a.level - b.level))
  return array;
};
export const filterDuplicateFromArray = (arrayData, keys) => {
  const array = arrayData
    .map(value => value[keys]) // lấy ra mảng chỉ có customer_id
    .map((value, i, final) => final.indexOf(value) === i && i) // lấy ra mảng chứa các customer_id unique
    .filter(e => arrayData[e])
    .map(e => arrayData[e]); // lọc và map lại mảng dựa theo customer_id
  return array;
}