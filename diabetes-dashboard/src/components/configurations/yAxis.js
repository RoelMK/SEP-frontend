// Default options for displaying yAxis along different grids
var options = {
    nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 25, 0],
    },
    nameLocation: 'center',
    nameGap: 5,
    type: 'value',
    boundaryGap: [0, '100%']
};

// Default options for displaying yAxis along sub grids
var axes = {
    splitLine: {
        show: false
    },
    axisLabel: {
        show: false,
    }
};

/**
 * Options for displaying yAxis in each grid.
 */
export default [
    {
        gridIndex: 0,
        name: 'Glucose',
        ...options
    },
    {
        gridIndex: 1,
        name: 'Emotions',
        ...options,
        ...axes
    },
    {
        gridIndex: 2,
        name: 'Insulin',
        ...options,
        ...axes
    },
    {
        gridIndex: 3,
        name: 'Carbs',
        ...options,
        ...axes
    },
    {
        gridIndex: 4,
        name: 'Exercises',
        ...options,
        ...axes
    },
];