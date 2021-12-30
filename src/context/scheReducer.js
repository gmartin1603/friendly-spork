export const scheState = {
    pack: true,
    op: true,
    po: true,
    util: true,
    misc: true,
    mon: 0,
    cols: [
        {id: "position", label: 'Position', align: "center", },
        {id: "mon", label: 'Monday',  align: "center", },
        {id: "tue", label: 'Tuesday', align: "center", },
        {id: "wed", label: 'Wednesday', align: "center", },
        {id: "thu", label: 'Thursday', align: "center", },
        {id: "fri", label: 'Friday', align: "center", },
        {id: "sat", label: 'Saturday', align: "center", },
        {id: "sun", label: 'Sunday', align: "center", },
    ],
    rows: [
            { 
            arr: [6, 4, 6], 
            data:{
                1: {
                mon: ["Eric","Rupert","Brian"],
                tue: ["Eric","Rupert","Kelly"],
                wed: ["Eric","Rupert","Kelly"],
                thu: ["Ross","Eric","Kelly"],
                fri: ["Ross","Eric","Kelly"],
                sat: ["Ross","Dave","Kelly"],
                sun: ["Ross","Dave","Kelly"]
                },
                2: {
                mon: ["Ross","Gary","Dave"],
                tue: ["Ross","Gary","Dave"],
                wed: ["Luke","Gary","Dave"],
                thu: ["Luke","Gary","Dave"],
                fri: ["Luke","Gary","Brian"],
                sat: ["Luke","Gary","Brian"],
                sun: ["Luke","Rupert","Brian"]
                },
                3: {
                mon: ["Luke","Rupert","Brian"],
                tue: ["Eric","Rupert","Brian"],
                wed: ["Eric","Rupert","Brian"],
                thu: ["Eric","Rupert","Kelly"],
                fri: ["Eric","Rupert","Kelly"],
                sat: ["Ross","Eric","Kelly"],
                sun: ["Ross","Eric","Kelly"]
                },
                4: {
                mon: ["Ross","Dave","Kelly"],
                tue: ["Ross","Dave","Kelly"],
                wed: ["Ross","Gary","Dave"],
                thu: ["Ross","Gary","Dave"],
                fri: ["Luke","Gary","Dave"],
                sat: ["Luke","Gary","Dave"],
                sun: ["Luke","Gary","Brian"]
                },
                5: {
                mon: ["Luke","Gary","Brian"],
                tue: ["Luke","Rupert","Brian"],
                wed: ["Luke","Rupert","Brian"],
                thu: ["Eric","Rupert","Brian"],
                fri: ["Eric","Rupert","Brian"],
                sat: ["Eric","Rupert","Kelly"],
                sun: ["Eric","Rupert","Kelly"]
                },
                6: {
                mon: ["Ross","Eric","Kelly"],
                tue: ["Ross","Eric","Kelly"],
                wed: ["Ross","Dave","Kelly"],
                thu: ["Ross","Dave","Kelly"],
                fri: ["Ross","Gary","Dave"],
                sat: ["Ross","Gary","Dave"],
                sun: ["Luke","Gary","Dave"]
                },
                7: {
                mon: ["Luke","Gary","Dave"],
                tue: ["Luke","Gary","Brian"],
                wed: ["Luke","Gary","Brian"],
                thu: ["Luke","Rupert","Brian"],
                fri: ["Luke","Rupert","Brian"],
                sat: ["Eric","Rupert","Brian"],
                sun: ["Eric","Rupert","Brian"]
                },
                8: {
                mon: ["Eric","Rupert","Kelly"],
                tue: ["Eric","Rupert","Kelly"],
                wed: ["Ross","Eric","Kelly"],
                thu: ["Ross","Eric","Kelly"],
                fri: ["Ross","Dave","Kelly"],
                sat: ["Ross","Dave","Kelly"],
                sun: ["Ross","Gary","Dave"]
                },
                9: {
                mon: ["Ross","Gary","Dave"],
                tue: ["Luke","Gary","Dave"],
                wed: ["Luke","Gary","Dave"],
                thu: ["Luke","Gary","Brian"],
                fri: ["Luke","Gary","Brian"],
                sat: ["Luke","Rupert ","Brian"],
                sun: ["Luke","Rupert","Brian"]
                },
                10: {
                mon: ["Eric","Rupert","Brian"],
                tue: ["Eric","Rupert","Brian"],
                wed: ["Eric","Rupert","Kelly"],
                thu: ["Eric","Rupert","Kelly"],
                fri: ["Ross","Eric","Kelly"],
                sat: ["Ross","Eric","Kelly"],
                sun: ["Ross","Dave","Kelly"]
                },
                11: {
                mon: ["Ross","Dave","Kelly"],
                tue: ["Ross","Gary","Dave"],
                wed: ["Ross","Gary","Dave"],
                thu: ["Luke","Gary","Dave"],
                fri: ["Luke","Gary","Dave"],
                sat: ["Luke","Gary","Brian"],
                sun: ["Luke","Gary","Brian"]
                },
                12: {
                mon: ["Luke","Rupert","Brian"],
                tue: ["Luke","Rupert","Brian"],
                wed: ["Eric","Rupert","Brian"],
                thu: ["Eric","Rupert","Brian"],
                fri: ["Eric","Rupert","Kelly"],
                sat: ["Eric","Rupert","Kelly"],
                sun: ["Ross","Eric","Kelly"]
                },
                13: {
                mon: ["Ross","Eric","Kelly"],
                tue: ["Ross","Dave","Kelly"],
                wed: ["Ross","Dave","Kelly"],
                thu: ["Ross","Gary","Dave"],
                fri: ["Ross","Gary","Dave"],
                sat: ["Luke","Gary","Dave"],
                sun: ["Luke","Gary","Dave"]
                },
                14: {
                mon: ["Luke","Gary","Brian"],
                tue: ["Luke","Gary","Brian"],
                wed: ["Luke","Rupert","Brian"],
                thu: ["Luke","Rupert","Brian"],
                fri: ["Eric","Rupert","Brian"],
                sat: ["Eric","Rupert","Brian"],
                sun: ["Eric","Rupert","Kelly"]
                },
                15: {
                mon: ["Eric","Rupert","Kelly"],
                tue: ["Ross","Eric","Kelly"],
                wed: ["Ross","Eric","Kelly"],
                thu: ["Ross","Dave","Kelly"],
                fri: ["Ross","Dave","Kelly"],
                sat: ["Ross","Gary","Dave"],
                sun: ["Ross","Gary","Dave"]
                },
                16: {
                mon: ["Luke","Gary","Dave"],
                tue: ["Luke","Gary","Dave"],
                wed: ["Luke","Gary","Brian"],
                thu: ["Luke","Gary","Brian"],
                fri: ["Luke","Rupert","Brian"],
                sat: ["Luke","Rupert","Brian"],
                sun: ["Eric","Rupert","Brian"]
                },
        
            }, 
            id: "ext", label: 'Extraction Op', align: "center", first: true, second: true, third: true},
        { 
            arr: [6, 4, 6], 
            data:{
                    1: {
                        mon: ["Ross","Gary","Dave"],
                        tue: ["Luke","Gary","Dave"],
                        wed: ["Luke","Gary","Dave"],
                        thu: ["Luke","Gary","Brian"],
                        fri: ["Luke","Gary","Brian"],
                        sat: ["Luke","Rupert ","Brian"],
                        sun: ["Luke","Rupert","Brian"]
                        },
                    2: {
                        mon: ["Eric","Rupert","Brian"],
                        tue: ["Eric","Rupert","Brian"],
                        wed: ["Eric","Rupert","Kelly"],
                        thu: ["Eric","Rupert","Kelly"],
                        fri: ["Ross","Eric","Kelly"],
                        sat: ["Ross","Eric","Kelly"],
                        sun: ["Ross","Dave","Kelly"]
                        },
                    3: {
                        mon: ["Ross","Dave","Kelly"],
                        tue: ["Ross","Gary","Dave"],
                        wed: ["Ross","Gary","Dave"],
                        thu: ["Luke","Gary","Dave"],
                        fri: ["Luke","Gary","Dave"],
                        sat: ["Luke","Gary","Brian"],
                        sun: ["Luke","Gary","Brian"]
                        },
                    4: {
                        mon: ["Luke","Rupert","Brian"],
                        tue: ["Luke","Rupert","Brian"],
                        wed: ["Eric","Rupert","Brian"],
                        thu: ["Eric","Rupert","Brian"],
                        fri: ["Eric","Rupert","Kelly"],
                        sat: ["Eric","Rupert","Kelly"],
                        sun: ["Ross","Eric","Kelly"]
                        },
                    5: {
                        mon: ["Ross","Eric","Kelly"],
                        tue: ["Ross","Dave","Kelly"],
                        wed: ["Ross","Dave","Kelly"],
                        thu: ["Ross","Gary","Dave"],
                        fri: ["Ross","Gary","Dave"],
                        sat: ["Luke","Gary","Dave"],
                        sun: ["Luke","Gary","Dave"]
                        },
                    6: {
                        mon: ["Luke","Gary","Brian"],
                        tue: ["Luke","Gary","Brian"],
                        wed: ["Luke","Rupert","Brian"],
                        thu: ["Luke","Rupert","Brian"],
                        fri: ["Eric","Rupert","Brian"],
                        sat: ["Eric","Rupert","Brian"],
                        sun: ["Eric","Rupert","Kelly"]
                        },
                    7: {
                        mon: ["Eric","Rupert","Kelly"],
                        tue: ["Ross","Eric","Kelly"],
                        wed: ["Ross","Eric","Kelly"],
                        thu: ["Ross","Dave","Kelly"],
                        fri: ["Ross","Dave","Kelly"],
                        sat: ["Ross","Gary","Dave"],
                        sun: ["Ross","Gary","Dave"]
                        },
                    8: {
                        mon: ["Luke","Gary","Dave"],
                        tue: ["Luke","Gary","Dave"],
                        wed: ["Luke","Gary","Brian"],
                        thu: ["Luke","Gary","Brian"],
                        fri: ["Luke","Rupert","Brian"],
                        sat: ["Luke","Rupert","Brian"],
                        sun: ["Eric","Rupert","Brian"]
                        },
                    9: {
                        mon: ["Eric","Rupert","Brian"],
                        tue: ["Eric","Rupert","Kelly"],
                        wed: ["Eric","Rupert","Kelly"],
                        thu: ["Ross","Eric","Kelly"],
                        fri: ["Ross","Eric","Kelly"],
                        sat: ["Ross","Dave","Kelly"],
                        sun: ["Ross","Dave","Kelly"]
                        },
                    10: {
                        mon: ["Ross","Gary","Dave"],
                        tue: ["Ross","Gary","Dave"],
                        wed: ["Luke","Gary","Dave"],
                        thu: ["Luke","Gary","Dave"],
                        fri: ["Luke","Gary","Brian"],
                        sat: ["Luke","Gary","Brian"],
                        sun: ["Luke","Rupert","Brian"]
                        },
                    11: {
                        mon: ["Luke","Rupert","Brian"],
                        tue: ["Eric","Rupert","Brian"],
                        wed: ["Eric","Rupert","Brian"],
                        thu: ["Eric","Rupert","Kelly"],
                        fri: ["Eric","Rupert","Kelly"],
                        sat: ["Ross","Eric","Kelly"],
                        sun: ["Ross","Eric","Kelly"]
                        },
                    12: {
                        mon: ["Ross","Dave","Kelly"],
                        tue: ["Ross","Dave","Kelly"],
                        wed: ["Ross","Gary","Dave"],
                        thu: ["Ross","Gary","Dave"],
                        fri: ["Luke","Gary","Dave"],
                        sat: ["Luke","Gary","Dave"],
                        sun: ["Luke","Gary","Brian"]
                        },
                    13: {
                        mon: ["Luke","Gary","Brian"],
                        tue: ["Luke","Rupert","Brian"],
                        wed: ["Luke","Rupert","Brian"],
                        thu: ["Eric","Rupert","Brian"],
                        fri: ["Eric","Rupert","Brian"],
                        sat: ["Eric","Rupert","Kelly"],
                        sun: ["Eric","Rupert","Kelly"]
                        },
                    14: {
                        mon: ["Ross","Eric","Kelly"],
                        tue: ["Ross","Eric","Kelly"],
                        wed: ["Ross","Dave","Kelly"],
                        thu: ["Ross","Dave","Kelly"],
                        fri: ["Ross","Gary","Dave"],
                        sat: ["Ross","Gary","Dave"],
                        sun: ["Luke","Gary","Dave"]
                        },
                    15: {
                        mon: ["Luke","Gary","Dave"],
                        tue: ["Luke","Gary","Brian"],
                        wed: ["Luke","Gary","Brian"],
                        thu: ["Luke","Rupert","Brian"],
                        fri: ["Luke","Rupert","Brian"],
                        sat: ["Eric","Rupert","Brian"],
                        sun: ["Eric","Rupert","Brian"]
                        },
                    16: {
                        mon: ["Eric","Rupert","Kelly"],
                        tue: ["Eric","Rupert","Kelly"],
                        wed: ["Ross","Eric","Kelly"],
                        thu: ["Ross","Eric","Kelly"],
                        fri: ["Ross","Dave","Kelly"],
                        sat: ["Ross","Dave","Kelly"],
                        sun: ["Ross","Gary","Dave"]
                        },
            }, 
            id: "prep", label: 'Prep Op', align: "center", first: true, second: true, third: true},
            // { 
            // arr: [6, 4, 6], 
            // data:{
            //     mon:["Adam","Rick","Cowboy"] ,
            //     tue: ["Adam","Rick","Cowboy"],
            //     wed: ["Adam","Rick","Cowboy"],
            //     thu: ["Adam","Rick","Nate"],
            //     fri: ["Adam","Rick","Nate"],
            //     sat: ["","","Nate"],
            //     sun: ["","","Nate"]
            // }, 
            // id: "lo", label: 'Load Out Op', align: "center", first: true, second: true, night: true},
            // { 
            // arr: [6, 4, 6], 
            // data:{
            //     wk: 1,
            //     mon:["Joe","Rick","Rusty"] ,
            //     tue: ["Joe","Rick","Rusty"],
            //     wed: ["Joe","Rick","Rusty"],
            //     thu: ["Joe","Rick","D"],
            //     fri: ["Joe","Rick","D"],
            //     sat: ["","","D"],
            //     sun: ["","","D"]
            // }, 
            // id: "ele", label: 'Elevator Op', align: "center", first: true, second: true, night: true},
            

        // {arr: [7,19], id: "ele", label: 'Elevator Op', align: "center", },
        // {arr: [7,15,23], id: "eto", label: 'ETR Op', align: "center", },
        // {arr: [7,15,23], id: "eto2", label: 'ETR Op 2', align: "center", },
        // {arr: [7,15,23], id: "flo", label: 'FLR Op', align: "center", },
        // {arr: [7,15,23], id: "etp", label: 'ETR Pack', align: "center", },
        // {arr: [7,15,23], id: "etp2", label: 'ETR Totes', align: "center", },
        // {arr: [7,15,23], id: "flp", label: 'Flour Pack', align: "center", },
        // {arr: [7,15,23], id: "bb", label: 'Bulk Bag', align: "center", },
    ],
    shifts: [
        {head: "1st", hours: 8, },
        {head: "2nd", hours: 8, },
        {head: "3rd", hours: 8, },
        {head: "Day", hours: 12},
        {head: "Night", hours: 12},
    ],
    rotas: {
        "1A": "Ross",
        "1B": "Luke",
        "2C": "Gary", 
        "2D": "Rupert",
        "3A": "Brian", 
        "3B": "Kelly",
    }
}

const scheReducer = (state, action) => {
    // console.log(action, state)
    // console.log(action)
    switch(action.type) {

        case "SET-TEXT":
            return (
                {
                    ...state,
                    [action.name]: action.change
                }
            )
        case "SET-NUM":
            return (
                {
                    ...state,
                    [action.name]: action.load
                }
            )
        case "SET-ARR":
            return (
                {
                    ...state,
                    [action.name]: action.load,
                }
            )
        
        case "RESET":
            return (
                action.load
            )
        default: 
            console.log("No Form State Change")
            return state;
    }
    
}

export default scheReducer