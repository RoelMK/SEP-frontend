export default [
    {
        type: 'piecewise',
        show: false,
        splitNumber: 4,
        seriesIndex: 0,
        pieces: [
            {

                max: 2.9,
                color: '#A63A50'
            },
            {
                min: 3.0,
                max: 3.8,
                color: '#C3423F'
            },
            {
                min: 3.9,
                max: 10.0,
                color: '#6CAE75'
            },
            {
                min: 10.1,
                max: 13.9,
                color: '#FFD046'
            },
            {
                min: 14.0,
                color: '#F3A712'
            },
        ],
    },
    {
        type: 'piecewise',
        show: false,
        splitNumber: 3,
        seriesIndex: 3,
        pieces: [
            {
                max: 55,
                color: '#C297B8'
            },
            {
                min: 56,
                max: 69,
                color: '#DA7422'
            },
            {
                min: 70,
                color: '#779FA1'
            }
        ]
    }
];