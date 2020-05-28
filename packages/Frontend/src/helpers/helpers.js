export const isExist = (e) => {
    return (e) ? e : false;
}
export const addScriptTitle = (scriptContent) => {
    let scriptDOM = document.createElement('title')
    scriptDOM.innerHTML = scriptContent || "Icare Base"
    document.head.appendChild(scriptDOM)
}
export const filterDuplicateFromArray = (arrayData, keys) => {
    const array = arrayData
      .map(value => value[keys]) // lấy ra mảng chứa tất cả "keys", bao gồm duplicate
      .map((value, i, final) => final.indexOf(value) === i && i) // lấy ra mảng chỉ chứa các "keys" unique
      .filter(e => arrayData[e]) // lọc lại mảng dựa theo "keys"
      .map(e => arrayData[e]); // map lại mảng dựa theo "keys"
    return array;
  }