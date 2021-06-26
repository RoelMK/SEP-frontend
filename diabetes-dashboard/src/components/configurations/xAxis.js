const OFFSET = 300000;

/**
 * Add offset to minimum value of the x-axis
 * @return { number }
 */
function addMinOffset(value) {
    return value.min - OFFSET;
}

/**
 * Add offset to maximum value of the x-axis
 * @return { number }
 */
function addMaxOffset(value) {
    return value.max + OFFSET;
}

/**
 * Generate options for displaying x-axis of the overview visualization
 * @return { Array<any> }
 */
export default function(min = null, max = null) {
    return [
        {
            gridIndex: 0,
            type: 'time',
            position: 'top',
            offset: 10,
            boundaryGap: false,
            splitArea: {
                show: true
            },
            axisTick: {
                show: false
            },
            min: (min) ? min : addMinOffset,
            max: (max) ? max : addMaxOffset
        },
        {
            show: true,
            gridIndex: 1,
            type: 'time',
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            min: (min) ? min : addMinOffset,
            max: (max) ? max : addMaxOffset
        },
        {
            show: true,
            gridIndex: 2,
            type: 'time',
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            min: (min) ? min : addMinOffset,
            max: (max) ? max : addMaxOffset
        },
        {
            show: true,
            gridIndex: 3,
            type: 'time',
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            min: (min) ? min : addMinOffset,
            max: (max) ? max : addMaxOffset
        },
        {
            show: true,
            gridIndex: 4,
            type: 'time',
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            min: (min) ? min : addMinOffset,
            max: (max) ? max : addMaxOffset
        },
    ];
}