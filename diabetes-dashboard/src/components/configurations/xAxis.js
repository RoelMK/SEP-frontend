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
            min: (min) ? min : 'dataMin',
            max: (max) ? max : 'dataMax'
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
            min: (min) ? min : 'dataMin',
            max: (max) ? max : 'dataMax'
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
            min: (min) ? min : 'dataMin',
            max: (max) ? max : 'dataMax'
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
            min: (min) ? min : 'dataMin',
            max: (max) ? max : 'dataMax'
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
            min: (min) ? min : 'dataMin',
            max: (max) ? max : 'dataMax'
        },
    ];
}