const jobsTest = [
    {
        qual: "pack",
        label: "Packaging Operator",
        positions: [ "ETR Pack", "FLR Pack", "Bulk Bag", "Totes", "Warehouse"],
    },
    {
        qual: "op",
        label: "CSST Operator",
        positions: [ "ETR Op", "FLR OP", "ETR Op #2"],
    },
    {
        qual: "po",
        label: "CASC Operator",
        positions: [ "Ext", "Prep"],
    },
    {
        qual: "util",
        label: "Utility Operator",
        positions: [ "Load Out", "Elev"],
    },
    {
        qual: "misc",
        label: "MISC",
        positions: [],
    },
]

const eeTest = [
    {
        main: "pack",
        qual: {
            pack: true,
            op: false,
            po: false,
            util: false,
            misc: false,
        },
        first: "George",
        last:"Martin",
        startDate: "03/15/2017",
        email: "georgemartin@test.com",
        password: "Test123",
        col: "EEs",
        shift: 2,
        daysOn: {"*":{mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
        rotation: 
            {"1": "ETR Pack", "2": "FLR Pack", "3": "Pack Float", "4": "Bulk Bag"},
        trained: ["ETR Pack", "FLR Pack", "Bulk Bag", "Pack Float"]
    },
    {
        main: "pack",
        qual: {
            pack: true,
            op: false,
            po: false,
            util: false,
            misc: false,
        },
        first: "Jeff",
        last:"Martin",
        startDate: "03/15/2017",
        email: "georgemartin@test.com",
        password: "Test123",
        col: "EEs",
        shift: 1,
        daysOn: {"*":{mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
        rotation: 
            {"2": "ETR Pack", "4": "FLR Pack", "1": "Pack Float", "3": "Bulk Bag"},
        trained: ["ETR Pack", "FLR Pack", "Bulk Bag", "Pack Float"]
    },
    {
        main: "po",
        qual: {
            pack: false,
            op: false,
            po: true,
            util: false,
            misc: false,
        },
        first: "Ross",
        last:"Morrison",
        startDate: "03/15/2015",
        email: "rossmorison@test.com",
        password: "Test123",
        col: "EEs",
        shift: 1,
        daysOn: {
            "1":{pos: "Extraction", shift: 1, mon: false, tue: false, wed: true, thu: true, fri: true, sat: true, sun: true},
            "2":{pos: "Extraction", shift: 1, mon: true, tue: false, wed: false, thu: true, fri: true, sat: true, sun: false},
            "3":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: false, thu: false, fri: true, sat: true, sun: true},
            "4":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: false, fri: false, sat: true, sun: true},
            "5":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true},
            "6":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false},
            "7":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false},
            "8":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true},
            "9":{pos: "Extraction", shift: 1, mon: false, tue: false, wed: true, thu: true, fri: true, sat: true, sun: true},
            "10":{pos: "Extraction", shift: 1, mon: true, tue: false, wed: false, thu: true, fri: true, sat: true, sun: false},
            "11":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: false, thu: false, fri: true, sat: true, sun: true},
            "12":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: false, fri: false, sat: true, sun: true},
            "13":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true},
            "14":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false},
            "15":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false},
            "16":{pos: "Extraction", shift: 1, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true},
        },
        rotation: 
            {"2": "Extraction", "4": "Extraction", "1": "Prep", "3": "Prep", "5": "Prep", "7": "Prep", "6": "Extraction", "8": "Extraction",},
        trained: ["ETR Pack", "FLR Pack", "Bulk Bag", "Pack Float"]
    },
    {
        main: "po",
        qual: {
            pack: false,
            op: false,
            po: true,
            util: false,
            misc: false,
        },
        first: "Luke",
        last:"Havlik",
        startDate: "03/15/2015",
        email: "LHavlik@test.com",
        password: "Test123",
        col: "EEs",
        shift: 1,
        daysOn: {
            "8":{mon: false, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true},
            "1":{mon: false, tue: false, wed: true, thu: true, fri: true, sat: true, sun: false},
            "2":{mon: true, tue: false, wed: false, thu: true, fri: true, sat: true, sun: true},
            "3":{mon: true, tue: true, wed: false, thu: false, fri: true, sat: true, sun: true},
            "4":{mon: true, tue: true, wed: true, thu: false, fri: false, sat: true, sun: true},
            "5":{mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true},
            "6":{mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false},
            "7":{mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true},
        },
        rotation: 
            {"1": "Extraction", "3": "Extraction", "2": "Prep", "4": "Prep", "6": "Prep", "8": "Prep", "5": "Extraction", "7": "Extraction",},
        trained: ["ETR Pack", "FLR Pack", "Bulk Bag", "Pack Float"]
    },
]

const test2 = [
    {
        qual: "op", five: true, jobs: ["ETR OP", "ETR OP #2", "FLR OP"]
    }
]

const test = [
    {
        qual: "po", five: true, job: "EXT Op",
        coverage: [
            {shift: 1, ee: {"1":"Ross", "2": "Luke", "3": "Ross", }, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"Jeff K", "2": "Tom N", "3": "Juan",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            {shift: 3, ee: {"1":"Jake", "2": "Courtney", "3": "Daryl",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual: "op", five: true, job: "ETR Op",
        coverage: [
            {shift: 1, ee: {"1":"Jeff M", "2": "Doug", "3": "Jason L",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"Jeff K", "2": "Tom N", "3": "Juan",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            {shift: 3, ee: {"1":"Jake", "2": "Courtney", "3": "Daryl",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"op", five: true, job: "ETR Op #2",
        coverage: [
            {shift: 1, ee: {"1":"Jason L", "2": "Jeff M", "3": "Doug",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"Juan", "2": "Jeff K", "3": "Tom N",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            {shift: 3, ee: {"1":"Daryl", "2": "Jake", "3": "Courtney",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"op", five: true, job: "FLR Op",
        coverage: [
            {shift: 1, ee: {"1":"Doug", "2": "Jason L", "3": "Jeff M",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"Tom N", "2": "Juan", "3": "Jeff K",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            {shift: 3, ee: {"1":"Courtney", "2": "Daryl", "3": "Jake",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"pack", five: true, job: "ETR Pack",
        coverage: [
            {shift: 1, ee: {"1":"Tony", "2": "Jason M", "3": "Russ", "4": "Brian", "5": "Lee"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"Matt", "2": "DJ", "3": "George", "4": "James"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 3, ee: {"1":"Louis", "2": "Rusty", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"pack", five: true, job: "Pack Float",
        coverage: [
            {shift: 1, ee: {"1":"Lee", "2": "Tony", "3": "Jason M", "4": "Russ", "5": "Brian"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"James", "2": "Matt", "3": "DJ", "4": "George"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
        ]
    },
    {
        qual:"pack", five: true, job: "FLR Pack",
        coverage: [
            {shift: 1, ee: {"1":"Brian", "2": "Lee", "3": "Tony", "4": "Jason M", "5": "Russ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"George", "2": "James", "3": "Matt", "4": "DJ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 3, ee: {"1":"Rusty", "2": "Louis", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"pack", five: true, job: "Bulk Bag",
        coverage: [
            {shift: 1, ee: {"1":"Russ", "2": "Brian", "3": "Lee", "4": "Tony", "5": "Jason M"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 2, ee: {"1":"DJ", "2": "George", "3": "James", "4": "Matt"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            {shift: 3, ee: {"1":"Becky", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
        ]
    },
    {
        qual:"pack", five: true, job: "Warehouse",
        coverage: [
            {shift: 1, ee: {"1":"Jason M", "2": "Russ", "3": "Brian", "4": "Lee", "5": "Tony"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            // {shift: 2, ee: {"1":"George", "2": "James", "3": "Matt", "4": "DJ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
        ]
    },
    {
        qual:"po", five: false, job: "Extraction",
        coverage: [
            {
                shift: 1,
                ee: {
                    "1":{mon: "Ross", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Luke"}, 
                    "2": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Eric", sun: "Eric"}, 
                    "3": {mon: "Eric", tue: "Eric", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"}, 
                    "4": {mon: "Ross", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"}, 
                    "5": {mon: "Eric", tue: "Eric", wed: "Eric", thu: "Eric", fri: "Ross", sat: "Ross", sun: "Ross"},
                    "6": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"},
                    "7": {mon: "Luke", tue: "Luke", wed: "Eric", thu: "Eric", fri: "Eric", sat: "Eric", sun: "Ross"},
                    "8": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Luke", sun: "Luke"},
                    "9": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Eric", sat: "Eric", sun: "Eric"}, 
                    "10": {mon: "Eric", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"}, 
                    "11": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Eric"}, 
                    "12": {mon: "Eric", tue: "Eric", wed: "Eric", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"}, 
                    "13": {mon: "Ross", tue: "Ross", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"},
                    "14": {mon: "Luke", tue: "Eric", wed: "Eric", thu: "Eric", fri: "Eric", sat: "Ross", sun: "Ross"},
                    "15": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Luke", sat: "Luke", sun: "Luke"},
                    "16": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Eric", fri: "Eric", sat: "Eric", sun: "Eric"},

                },
                week: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
            },
            {
                shift: 2, 
                ee: {
                    "1":{mon: "Rupert", tue: "Rupert", wed: "Rupert", thu: "Rupert", fri: "Gary", sat: "Gary", sun: "Gary"}, 
                    "2": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Eric", fri: "Eric", sat: "Rupert", sun: "Rupert"}, 
                    "3": {mon: "Rupert", tue: "Rupert", wed: "Rupert", thu: "Rupert", fri: "Gary", sat: "Gary", sun: "Gary"}, 
                    "4": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Eric", fri: "Eric", sat: "Rupert", sun: "Rupert"}, 
                    "5": {mon: "Rupert", tue: "Rupert", wed: "Rupert", thu: "Rupert", fri: "Eric", sat: "Eric", sun: "Gary"},
                    "6": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Gary", fri: "Gary", sat: "Rupert", sun: "Rupert"},
                    "7": {mon: "Rupert", tue: "Rupert", wed: "Rupert", thu: "Rupert", fri: "Gary", sat: "Gary", sun: "Gary"},
                    "8": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Eric", fri: "Eric", sat: "Rupert", sun: "Rupert"},
                }, 
                week: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
            },
        ]
    },
    {
        qual:"po", five: false, job: "Prep",
        coverage: [
            {
                shift: 1,
                ee: {
                    "1":{mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Eric", sat: "Eric", sun: "Eric"}, 
                    "2": {mon: "Eric", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"}, 
                    "3": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Eric", sat: "Eric", sun: "Eric"}, 
                    "4": {mon: "Eric", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"}, 
                    "5": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Eric"},
                    "6": {mon: "Eric", tue: "Eric", wed: "Eric", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"},
                    "7": {mon: "Ross", tue: "Ross", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"},
                    "8": {mon: "Luke", tue: "Eric", wed: "Eric", thu: "Eric", fri: "Eric", sat: "Ross", sun: "Ross"},
                    "9": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Luke", sat: "Luke", sun: "Luke"}, 
                    "10": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Eric", fri: "Eric", sat: "Eric", sun: "Eric"}, 
                    "11": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Luke"},
                    "12": {mon: "Luke", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Eric", sun: "Eric"}, 
                    "13": {mon: "Eric", tue: "Eric", wed: "Ross", thu: "Ross", fri: "Ross", sat: "Ross", sun: "Ross"},
                    "14": {mon: "Ross", tue: "Luke", wed: "Luke", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"},
                    "15": {mon: "Eric", tue: "Eric", wed: "Eric", thu: "Eric", fri: "Ross", sat: "Ross", sun: "Ross"},
                    "16": {mon: "Ross", tue: "Ross", wed: "Ross", thu: "Luke", fri: "Luke", sat: "Luke", sun: "Luke"},



                },
                week: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
            },
            {
                shift: 2, 
                ee: {
                    "1":{mon: "Rupert", tue: "Rupert", wed: "Eric", thu: "Eric", fri: "Gary", sat: "Gary", sun: "Rupert"}, 
                    "2": {mon: "Rupert", tue: "Rupert", wed: "Rupert", thu: "Rupert", fri: "Rupert", sat: "Rupert", sun: "Rupert"}, 
                    "3": {mon: "Rupert", tue: "Rupert", wed: "Eric", thu: "Eric", fri: "Gary", sat: "Gary", sun: "Gary"}, 
                    "4": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Eric", fri: "Eric", sat: "Rupert", sun: "Rupert"}, 
                    "5": {mon: "Rupert", tue: "Rupert", wed: "Eric", thu: "Eric", fri: "Gary", sat: "Gary", sun: "Gary"},
                    "6": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Rupert", fri: "Rupert", sat: "Rupert", sun: "Rupert"},
                    "7": {mon: "Rupert", tue: "Rupert", wed: "Eric", thu: "Eric", fri: "Gary", sat: "Gary", sun: "Gary"},
                    "8": {mon: "Gary", tue: "Gary", wed: "Gary", thu: "Rupert", fri: "Rupert", sat: "Rupert", sun: "Rupert"},
                }, 
                week: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
            },
        ]
    },
]
