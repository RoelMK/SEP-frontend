/**
 * Options for displaying legend.
 * Used in several components in order to keep using consistent colors
 * throughout the whole application
 */
export default {
    sections: [
        // Object containing legend items for different glucose level conditions
        {
            type: 'Glucose',
            properties: [
                {
                    key: 0,
                    type: null,
                    label: 'Glucose (Very Low)',
                    color: '#A63A50',
                    class: '',
                },
                {
                    key: 0,
                    type: null,
                    label: 'Glucose (Low)',
                    color: '#C3423F',
                    class: '',
                },
                {
                    key: 0,
                    type: null,
                    label: 'Glucose (Normal)',
                    color: '#6CAE75',
                    class: '',
                },
                {
                    key: 0,
                    type: null,
                    label: 'Glucose (High)',
                    color: '#FFD046',
                    class: '',
                },
                {
                    key: 0,
                    type: null,
                    label: 'Glucose (Very High)',
                    color: '#F3A712',
                    class: '',
                }
            ]
        },
        // Object containing legend item for emotional status
        {
            type: 'Emotions',
            properties: [
                {
                    key: 'Emotions',
                    type: 'legendToggleSelect',
                    label: 'Emotions',
                    color: '#26C0C0',
                    class: '__circle __pointer',
                },
            ],
        },
        // Object containing legend item for insulin
        {
            type: 'Insulin',
            properties: [
                {
                    key: 'Insulin',
                    type: 'legendToggleSelect',
                    label: 'Insulin',
                    color: '#3F7CAC',
                    class: '__pointer',
                },
            ]
        },
        // Object containing legend item for glycemic index
        {
            type: 'GI',
            properties: [
                {
                    key: 1,
                    type: null,
                    label: 'Glycemic Index (Low)',
                    color: '#C297B8',
                    class: '',
                },
                {
                    key: 1,
                    type: null,
                    label: 'Glycemic Index (Normal)',
                    color: '#DA7422',
                    class: '',
                },
                {
                    key: 1,
                    type: null,
                    label: 'Glycemic Index (High)',
                    color: '#779FA1',
                    class: '',
                }
            ],
        },
        // Object containing legend item for exercises
        {
            type: 'Exercises',
            properties: [
                {
                    key: 'Heartbeat',
                    type: 'legendToggleSelect',
                    label: 'Heartbeat',
                    color: '#F2B3C9',
                    class: '__circle __pointer',
                },
                {
                    key: 'Exercises',
                    type: 'legendToggleSelect',
                    label: 'Exercises',
                    color: '#4B565B',
                    class: '__pointer',
                }
            ]
        }
    ],
};