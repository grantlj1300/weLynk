export function formatDate(date) {
    const [year, month, day] = date.split("-");
    return month + "/" + day + "/" + year;
}

export function formatTime(time) {
    let formattedTime = time.split(":");
    const timeOfDay = formattedTime[0] < 12 ? " AM" : " PM";
    const hours = formattedTime[0] % 12 || 12;
    return hours + ":" + formattedTime[1] + timeOfDay;
}
