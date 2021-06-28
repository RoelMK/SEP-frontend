export default [
    {
        heading: 'Date Range',
        label: null,
        properties: [
            {
                index: 'date',
                label: null,
                isDate: true,
                isTime: false,
                isIcon: false,
                isMultiple: false,
                isSearchable: false,
                isNumber: false,
                properties: []
            }
        ],
    },
    {
        heading: 'Glucose Parameters',
        label: 'Glucose Conditions',
        properties: [
            {
                index: 'glucose',
                label: 'Condition',
                isDate: false,
                isTime: false,
                isIcon: false,
                isMultiple: true,
                isSearchable: false,
                isNumber: false,
                properties: ['Hypos', 'Normal', 'Hypers'],
            }
        ]
    },
    {
        heading: 'Insulin Range',
        label: 'Insulin',
        properties: [
            {
                index: 'insulinMin',
                label: 'Min',
                isDate: false,
                isTime: false,
                isIcon: false,
                isMultiple: false,
                isSearchable: false,
                isNumber: true,
                properties: [],
            },
            {
                index: 'insulinMax',
                label: 'Max',
                isDate: false,
                isTime: false,
                isIcon: false,
                isMultiple: false,
                isSearchable: false,
                isNumber: true,
                properties: [],
            }
        ]
    },
    {
        heading: 'Activity Parameters',
        label: 'Activity Type',
        properties: [
            {
                index: 'activity',
                label: 'Activity',
                isDate: false,
                isTime: false,
                isIcon: false,
                isMultiple: true,
                isSearchable: false,
                isNumber: false,
                properties: [
                    "Walk",
                    "Run",
                    "Bike",
                    "Soccer",
                    "Basketball",
                    "Volleyball",
                    "Rugby",
                    "Baseball",
                    "Horse riding",
                    "Athletics",
                    "Swimming",
                    "Water polo",
                    "Surfing",
                    "Golf",
                    "Lacrosse",
                    "Tennis",
                    "Squash",
                    "Badminton",
                    "Table tennis",
                    "Skiing",
                    "Ice hockey",
                    "Field hockey",
                    "Ice skating",
                    "Roller skating",
                    "Fitness",
                    "Yoga",
                    "Aerobics",
                    "Martial arts",
                    "Dance",
                    "Pool",
                    "Darts",
                    "Air hockey",
                    "Bowling",
                    "Chess",
                    "Gymnastics",
                    "Hike",
                    "Mountainbike",
                ],
            }
        ],
    },
    {
        heading: 'Emotion Parameters',
        label: 'Emotion Status',
        properties: [
            {
                index: 'valence',
                label: 'Happiness',
                isDate: false,
                isTime: false,
                isIcon: true,
                isMultiple: false,
                isSearchable: false,
                isNumber: false,
                properties: [
                    'fas fa-angry',
                    'fas fa-smile-beam',
                    'fas fa-laugh-beam'
                ],
            },
            {
                index: 'arousal',
                label: 'Excitement',
                isDate: false,
                isTime: false,
                isIcon: true,
                isMultiple: false,
                isSearchable: false,
                isNumber: false,
                properties: [
                    'fas fa-tired',
                    'fas fa-smile-beam',
                    'fas fa-grin-stars'
                ],
            },
        ],
    },
];