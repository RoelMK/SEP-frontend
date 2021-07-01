// Default options for displaying yAxis along different grids
var options = {
    // Modify default string format
    nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 25, 0],
    },
    // Set up location of the label
    nameLocation: 'center',
    // Add gap between labels
    nameGap: 5,
    type: 'value',
    // Assign boundary gap
    boundaryGap: [0, '100%']
};

// Default options for displaying yAxis along sub grids
var axes = {
    // Remove split lines in sub charts
    splitLine: {
        show: false
    },
    // Remove axis labels to enable better readability
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