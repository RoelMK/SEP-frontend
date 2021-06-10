export default [
    {
        label: 'Date Range',
        properties: [
            {
                label: null,
                isDate: true,
                isTime: false,
                isIcon: false,
                isSearchable: false,
                properties: []
            }
        ],
    },
    {
        label: 'Time Range',
        properties: [
            {
                label: null,
                isDate: false,
                isTime: true,
                isIcon: false,
                isSearchable: false,
                properties: [],
            }
        ],
    },
    {
        label: 'Glucose',
        properties: [
            {
                label: null,
                isDate: false,
                isTime: false,
                isIcon: false,
                isSearchable: false,
                properties: ['Hypos', 'Normal', 'Hypers'],
            }
        ]
    },
    {
        label: 'Activity',
        properties: [
            {
                label: null,
                isDate: false,
                isTime: false,
                isIcon: false,
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
        label: 'Emotion',
        properties: [
            {
                label: 'Happiness',
                isDate: false,
                isTime: false,
                isIcon: true,
                isSearchable: false,
                properties: [
                    'fas fa-angry',
                    'fas fa-smile-beam',
                    'fas fa-laugh-beam'
                ],
            },
            {
                label: 'Excitement',
                isDate: false,
                isTime: false,
                isIcon: true,
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
        label: 'Food',
        properties: [
            {
                label: null,
                isDate: false,
                isTime: false,
                isIcon: false,
                isSearchable: true,
                properties: [],
            }
        ],
    },
];