export default [
    {
        type: 'piecewise',
        show: false,
        splitNumber: 4,
        seriesIndex: 0,
        pieces: [
            {

                max: 2.9,
                color: '#dd6b66'
            },
            {
                min: 3.0,
                max: 3.8,
                color: 'rgba(204,88,57,0.6)'
            },
            {
                min: 3.9,
                max: 10.0,
                color: '#73a373'
            },
            {
                min: 10.1,
                max: 13.9,
                color: '#eedd78'
            },
            {
                min: 14.0,
                color: '#f49f42'
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
                color: '#516b91'
            },
            {
                min: 56,
                max: 69,
                color: '#59c4e6'
            },
            {
                min: 70,
                color: '#93b7e3'
            }
        ]
    }
];