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

function filterGlucose(data, mode = null, ranges = null) {
    if (!mode) return data;
    const high = (ranges) ? ranges.hypers : 10.0;
    const low = (ranges) ? ranges.hypos : 4.0;
    for (let a in mode) {
        if (mode[a] === "Normal" && data >= low && data <= high) return data;
        if (mode[a] === "Hypos" && data < low) return data;
        if (mode[a] === "Hypers" && data > high) return data;
    }
    return null;
}

function filterEmotion(data, type = null) {
    if (type === null) return data;
    if (data === type)
        return data;
    return null;
}

export default {
    insulin: filterInsulin,
    time: filterTime,
    glucose: filterGlucose,
    emotion: filterEmotion
};