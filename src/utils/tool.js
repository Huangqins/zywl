export function fomatterTime(date) {
    let year, month, day, hours,min,sec ;
    year = date.getFullYear();
    month = date.getMonth() < 10 ? '0' + date.getMonth() :  date.getMonth();
    day = date.getDate() < 10 ? '0' + date.getDate() :  date.getDate();
    hours = date.getHours() < 10 ? '0' + date.getHours() :  date.getHours();
    min = date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes();
    sec = date.getSeconds() < 10 ? '0' + date.getSeconds() :  date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`
}



