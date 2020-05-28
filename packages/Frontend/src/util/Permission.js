export const Permission = (per, arrayPer) => {
    const result = arrayPer.filter(value => value === per);
    return (result.length > 0) ? true : false  
}