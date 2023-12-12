import { log } from "react-native-reanimated";

export const formatDateToLocale = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('cd-FR', options);
}

export function formatMilliToTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds == 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

export function formatSecondsToTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const formatLength = function (text, count, insertDots) {
    return (text && text.length > 0) ? text.slice(0, count) + (((text.length > count) && insertDots) ? "... " : " ") : null;
}