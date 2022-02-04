
export function getDate(date: Date): string {
    let year = date.getFullYear();
    let getMonth = date.getMonth() + 1;
    let month;
    if  (getMonth < 10) {
        month = "0" + getMonth;
    } else {
        month = getMonth};
    let getDay = date.getDate();
    let day;
    if (getDay < 10) {
        day = "0" + getDay;
    } else {
        day = getDay;
    }
    let dateString = year + "-" + month + "-" + day;
    return dateString;
}
