export default [
    {
        heading: 'DateTime Range',
        label: null,
        properties: [
            {
                index: 'date',
                label: null,
                isDate: true,
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