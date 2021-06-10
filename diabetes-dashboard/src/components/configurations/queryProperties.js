export default [
    {
        heading: 'DateTime Range',
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
                properties: []
            },
            {
                index: 'time',
                label: null,
                isDate: false,
                isTime: true,
                isIcon: false,
                isMultiple: false,
                isSearchable: false,
                properties: [],
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
                isMultiple: false,
                isSearchable: false,
                properties: ['Hypos', 'Normal', 'Hypers'],
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
                index: 'arousal',
                label: 'Happiness',
                isDate: false,
                isTime: false,
                isIcon: true,
                isMultiple: false,
                isSearchable: false,
                properties: [
                    'fas fa-angry',
                    'fas fa-smile-beam',
                    'fas fa-laugh-beam'
                ],
            },
            {
                index: 'valence',
                label: 'Excitement',
                isDate: false,
                isTime: false,
                isIcon: true,
                isMultiple: false,
                isSearchable: false,
                properties: [
                    'fas fa-tired',
                    'fas fa-smile-beam',
                    'fas fa-grin-stars'
                ],
            }
        ],
    },
    {
        heading: 'Food Parameters',
        label: 'Food Name',
        properties: [
            {
                index: 'food',
                label: 'Food',
                isDate: false,
                isTime: false,
                isIcon: false,
                isMultiple: false,
                isSearchable: true,
                properties: [],
            }
        ],
    },
];