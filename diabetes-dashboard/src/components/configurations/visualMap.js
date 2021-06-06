import legend from '@/components/configurations/legend.js';

export default [
    {
        type: 'piecewise',
        show: false,
        splitNumber: 4,
        seriesIndex: 0,
        pieces: [
            {

                max: 2.9,
                color: legend.sections[0].properties[0].color
            },
            {
                min: 3.0,
                max: 3.8,
                color: legend.sections[0].properties[1].color
            },
            {
                min: 3.9,
                max: 10.0,
                color: legend.sections[0].properties[2].color
            },
            {
                min: 10.1,
                max: 13.9,
                color: legend.sections[0].properties[3].color
            },
            {
                min: 14.0,
                color: legend.sections[0].properties[4].color
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
                color: legend.sections[3].properties[0].color
            },
            {
                min: 56,
                max: 69,
                color: legend.sections[3].properties[1].color
            },
            {
                min: 70,
                color: legend.sections[3].properties[2].color
            }
        ]
    }
];