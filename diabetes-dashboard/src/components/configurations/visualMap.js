import legend from '@/components/configurations/legend.js';

/**
 * Configure coloring of regions in overview visualization
 * @param { any | null }    ranges range object that contains intervals
 * for different conditions
 * @return { Array<any> }
 */
export default function(ranges = null) {
    return [
        {
            type: 'piecewise',
            show: false,
            splitNumber: 4,
            seriesIndex: 0,
            dimension: 1,
            pieces: [
                {
                    min: 0,
                    max: (ranges) ? ranges.veryLowValue[0] : 2.9,
                    color: legend.sections[0].properties[0].color
                },
                {
                    min: (ranges) ? ranges.lowRange[0] : 3.0,
                    max: (ranges) ? ranges.lowRange[1] : 3.8,
                    color: legend.sections[0].properties[1].color
                },
                {
                    min: (ranges) ? ranges.normalRange[0] : 3.9,
                    max: (ranges) ? ranges.normalRange[1] : 10.0,
                    color: legend.sections[0].properties[2].color
                },
                {
                    min: (ranges) ? ranges.highRange[0] : 10.1,
                    max: (ranges) ? ranges.highRange[1] : 13.9,
                    color: legend.sections[0].properties[3].color
                },
                {
                    min: (ranges) ? ranges.veryHighValue[0] : 14.0,
                    max: 50.0,
                    color: legend.sections[0].properties[4].color
                },
            ],
        },
        {
            type: 'piecewise',
            show: false,
            splitNumber: 4,
            seriesIndex: 3,
            dimension: 2,
            pieces: [
                {
                    min: 0,
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
                    max: 100,
                    color: legend.sections[3].properties[2].color
                },
                {
                    min: 101,
                    max: 205,
                    color: 'grey'
                }
            ]
        }
    ];
}