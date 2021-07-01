// Default options for displaying emotion fields
var emotions = {
    isDate: false,
    isIcon: true,
    isMultiple: false,
    isSearchable: false,
    isNumber: false,
};

// Default options for displaying insulin fields
var insulin = {
    isDate: false,
    isIcon: false,
    isMultiple: false,
    isSearchable: false,
    isNumber: true,
    properties: []
};

/**
 * Options for displaying query fields in QueryMenu component
 * Can be modified to add new properties. Not that this file only
 * adds UI elements without any functionality. In order to
 * add functionality navigate to /src/helpers/filter.js and
 * link corresponding filtering functionality to a UI element.
 */
export default [
    // Date range filter
    {
        heading: 'Date Range',
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
    // Glucose level conditions filter
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
    // Insulin amount filters. Includes filter for min/max values
    {
        heading: 'Insulin Range',
        label: 'Insulin',
        properties: [
            {
                index: 'insulinMin',
                label: 'Min',
                ...insulin
            },
            {
                index: 'insulinMax',
                label: 'Max',
                ...insulin
            }
        ]
    },
    // Activity type filter, includes all activity types supported by
    // GameBus Platform
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
    // Emotional status filter, contains separate filters for
    // valence and arousal
    {
        heading: 'Emotion Parameters',
        label: 'Emotion Status',
        properties: [
            {
                index: 'valence',
                label: 'Happiness',
                ...emotions,
                properties: [
                    'fas fa-angry',
                    'fas fa-smile-beam',
                    'fas fa-laugh-beam'
                ],
            },
            {
                index: 'arousal',
                label: 'Excitement',
                ...emotions,
                properties: [
                    'fas fa-tired',
                    'fas fa-smile-beam',
                    'fas fa-grin-stars'
                ],
            },
        ],
    },
];