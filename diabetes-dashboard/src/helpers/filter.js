import moment from 'moment';

const MAX = Number.MAX_SAFE_INTEGER;
const MIN = Number.MIN_SAFE_INTEGER;

function filterInsulin(data, max = null, min = null) {
    max = (max) ? max : MAX;
    min = (min) ? min : MIN;
    if (min <= data && data <= max)
        return data;
    return null;
}

function filterTime(data, date, start, end) {
    var startDate = moment(`${date}T${start}`, 'DD-MM-YYYYTHH:mm');
    var endDate = moment(`${date}T${end}`, 'DD-MM-YYYYTHH:mm');
    if (moment(data).isBetween(startDate, endDate))
        return data;
    return null;
}

function filterGlucose(data, mode = null) {
    if (!mode) return data;
    for (let a in mode) {
        if (mode[a] === "Normal" && data >= 3.9 && data <= 10.0) return data;
        if (mode[a] === "Hypos" && data < 3.9) return data;
        if (mode[a] === "Hypers" && data > 10.0) return data;
    }
    return null;
}

function filterEmotion(data, type = null) {
    type = (type) ? type : 0;
    if (data >= type)
        return data;
    return null;
}

export default {
    insulin: filterInsulin,
    time: filterTime,
    glucose: filterGlucose,
    emotion: filterEmotion
};