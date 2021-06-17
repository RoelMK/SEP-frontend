export default function(min, max) {
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
            }
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
            min: min,
            max: max
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
            min: min,
            max: max
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
            min: min,
            max: max
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
            min: min,
            max: max
        },
    ];
}