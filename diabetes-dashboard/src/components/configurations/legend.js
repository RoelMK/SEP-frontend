export default {
    sections: [
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