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
            { 
            arr: [6, 4, 6], 
            data:{
                1: {
                    mon: ["Adam","","Troy"],
                    tue: ["Adam","","Troy"],
                    wed: ["Adam","","Troy"],
                    thu: ["Adam","","Nate"],
                    fri: ["Adam","","Nate"],
                    sat: ["","","Nate"],
                    sun: ["","","Nate"]
                },
                2: {
                    mon: ["Joe","Rick","Nate"],
                    tue: ["Joe","Rick","Nate"],
                    wed: ["Joe","Rick","Nate"],
                    thu: ["Joe","Rick","Rusty"],
                    fri: ["Joe","Rick","Rusty"],
                    sat: ["","","Rusty"],
                    sun: ["","","Rusty"]
                },
                3: {
                    mon: ["Adam","","Nate"],
                    tue: ["Adam","","Nate"],
                    wed: ["Adam","","Nate"],
                    thu: ["Adam","","Rusty"],
                    fri: ["Adam","","Rusty"],
                    sat: ["","","Rusty"],
                    sun: ["","","Rusty"]
                },
                4: {
                    mon: ["Joe","Rick","Rusty"],
                    tue: ["Joe","Rick","Rusty"],
                    wed: ["Joe","Rick","Rusty"],
                    thu: ["Joe","Rick","Troy"],
                    fri: ["Joe","Rick","Troy"],
                    sat: ["","","Troy"],
                    sun: ["","","Troy"]
                },
            }, 
            id: "lo", label: 'Load Out Op', align: "center", first: true, second: true, night: true},
            { 
            arr: [6, 4, 6], 
            data:{
                1: {
                    mon: ["Joe","Rick","Rusty"],
                    tue: ["Joe","Rick","Rusty"],
                    wed: ["Joe","Rick","Rusty"],
                    thu: ["Joe","Rick","Troy"],
                    fri: ["Joe","Rick","Troy"],
                    sat: ["","","Troy"],
                    sun: ["","","Troy"]
                },
                2: {
                    mon: ["Adam","","Nate"],
                    tue: ["Adam","","Nate"],
                    wed: ["Adam","","Nate"],
                    thu: ["Adam","","Rusty"],
                    fri: ["Adam","","Rusty"],
                    sat: ["","","Rusty"],
                    sun: ["","","Rusty"]
                },
                3: {
                    mon: ["Joe","Rick","Nate"],
                    tue: ["Joe","Rick","Nate"],
                    wed: ["Joe","Rick","Nate"],
                    thu: ["Joe","Rick","Rusty"],
                    fri: ["Joe","Rick","Rusty"],
                    sat: ["","","Rusty"],
                    sun: ["","","Rusty"]
                },
                4: {
                    mon: ["Adam","","Troy"],
                    tue: ["Adam","","Troy"],
                    wed: ["Adam","","Troy"],
                    thu: ["Adam","","Nate"],
                    fri: ["Adam","","Nate"],
                    sat: ["","","Nate"],
                    sun: ["","","Nate"]
                },
            }, 
            id: "ele", label: 'Elevator Op', align: "center", first: true, second: true, night: true},
            { 
            arr: [6, 4, 6], 
            data:{
                1: {
                    mon: ["Jason L","Tom","Jake"],
                    tue: ["Jason L","Tom","Jake"],
                    wed: ["Jason L","Tom","Jake"],
                    thu: ["Jason L","Tom","Jake"],
                    fri: ["Jason L","",""],
                    sat: ["","",""],
                    sun: ["","Tom","Jake"]
                },
                2: {
                    mon: ["Jeff M","Jeff K","Courtney"],
                    tue: ["Jeff M","Jeff K","Courtney"],
                    wed: ["Jeff M","Jeff K","Courtney"],
                    thu: ["Jeff M","Jeff K","Courtney"],
                    fri: ["Jeff M","",""],
                    sat: ["","",""],
                    sun: ["","Jeff K","Courtney"]
                },
                3: {
                    mon: ["Doug","DJ","Daryl"],
                    tue: ["Doug","DJ","Daryl"],
                    wed: ["Doug","DJ","Daryl"],
                    thu: ["Doug","DJ","Daryl"],
                    fri: ["Doug","",""],
                    sat: ["","",""],
                    sun: ["","DJ","Daryl"]
                },
            }, 
            id: "eto", label: 'ETR Op', align: "center", first: true, second: true, third: true},
        {arr: [7,15,23], 
            data:{
                1: {
                    mon: ["Jeff M","Jeff K","Courtney"],
                    tue: ["Jeff M","Jeff K","Courtney"],
                    wed: ["Jeff M","Jeff K","Courtney"],
                    thu: ["Jeff M","Jeff K","Courtney"],
                    fri: ["Jeff M","",""],
                    sat: ["","",""],
                    sun: ["","Jeff K","Courtney"]
                },
                2: {
                    mon: ["Doug","DJ","Daryl"],
                    tue: ["Doug","DJ","Daryl"],
                    wed: ["Doug","DJ","Daryl"],
                    thu: ["Doug","DJ","Daryl"],
                    fri: ["Doug","",""],
                    sat: ["","",""],
                    sun: ["","DJ","Daryl"]
                },
                3: {
                    mon: ["Jason L","Tom","Jake"],
                    tue: ["Jason L","Tom","Jake"],
                    wed: ["Jason L","Tom","Jake"],
                    thu: ["Jason L","Tom","Jake"],
                    fri: ["Jason L","",""],
                    sat: ["","",""],
                    sun: ["","Tom","Jake"]
                },
            },  
        id: "eto2", label: 'ETR Op 2', align: "center", first: true, second: true, third: true},
        {arr: [7,15,23], 
            data:{
                1: {
                    mon: ["Doug","DJ","Daryl"],
                    tue: ["Doug","DJ","Daryl"],
                    wed: ["Doug","DJ","Daryl"],
                    thu: ["Doug","DJ","Daryl"],
                    fri: ["Doug","",""],
                    sat: ["","",""],
                    sun: ["","DJ","Daryl"]
                },
                2: {
                    mon: ["Jason L","Tom","Jake"],
                    tue: ["Jason L","Tom","Jake"],
                    wed: ["Jason L","Tom","Jake"],
                    thu: ["Jason L","Tom","Jake"],
                    fri: ["Jason L","",""],
                    sat: ["","",""],
                    sun: ["","Tom","Jake"]
                },
                3: {
                    mon: ["Jeff M","Jeff K","Courtney"],
                    tue: ["Jeff M","Jeff K","Courtney"],
                    wed: ["Jeff M","Jeff K","Courtney"],
                    thu: ["Jeff M","Jeff K","Courtney"],
                    fri: ["Jeff M","",""],
                    sat: ["","",""],
                    sun: ["","Jeff K","Courtney"]
                },
            },  
            id: "flo", label: 'FLR Op', align: "center", first: true, second: true, third: true },
        {arr: [7,15,23],
            data:{
                1: {
                    mon: ["Lee","Brent","James"],
                    tue: ["Lee","Brent","James"],
                    wed: ["Lee","Brent","James"],
                    thu: ["Lee","Brent","James"],
                    fri: ["Lee","Brent",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                2: {
                    mon: ["Jason M","Matt","Luis"],
                    tue: ["Jason M","Matt","Luis"],
                    wed: ["Jason M","Matt","Luis"],
                    thu: ["Jason M","Matt","Luis"],
                    fri: ["Jason M","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                3: {
                    mon: ["Russ","George","James"],
                    tue: ["Russ","George","James"],
                    wed: ["Russ","George","James"],
                    thu: ["Russ","George","James"],
                    fri: ["Russ","George",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                4: {
                    mon: ["Brian K","Brent","Luis"],
                    tue: ["Brian K","Brent","Luis"],
                    wed: ["Brian K","Brent","Luis"],
                    thu: ["Brian K","Brent","Luis"],
                    fri: ["Brian K","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                5: {
                    mon: ["Lee","Matt","James"],
                    tue: ["Lee","Matt","James"],
                    wed: ["Lee","Matt","James"],
                    thu: ["Lee","Matt","James"],
                    fri: ["Lee","Matt",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                6: {
                    mon: ["Jason M","George","Luis"],
                    tue: ["Jason M","George","Luis"],
                    wed: ["Jason M","George","Luis"],
                    thu: ["Jason M","George","Luis"],
                    fri: ["Jason M","George",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                7: {
                    mon: ["Russ","Brent","James"],
                    tue: ["Russ","Brent","James"],
                    wed: ["Russ","Brent","James"],
                    thu: ["Russ","Brent","James"],
                    fri: ["Russ","Brent",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                8: {
                    mon: ["Brian K","Matt","Luis"],
                    tue: ["Brian K","Matt","Luis"],
                    wed: ["Brian K","Matt","Luis"],
                    thu: ["Brian K","Matt","Luis"],
                    fri: ["Brian K","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                9: {
                    mon: ["Lee","George","James"],
                    tue: ["Lee","George","James"],
                    wed: ["Lee","George","James"],
                    thu: ["Lee","George","James"],
                    fri: ["Lee","George",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                10: {
                    mon: ["Jason M","Brent","Luis"],
                    tue: ["Jason M","Brent","Luis"],
                    wed: ["Jason M","Brent","Luis"],
                    thu: ["Jason M","Brent","Luis"],
                    fri: ["Jason M","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                11 : {
                    mon: ["Russ","Matt","James"],
                    tue: ["Russ","Matt","James"],
                    wed: ["Russ","Matt","James"],
                    thu: ["Russ","Matt","James"],
                    fri: ["Russ","Matt",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                12 : {
                    mon: ["Brian K","George","Luis"],
                    tue: ["Brian K","George","Luis"],
                    wed: ["Brian K","George","Luis"],
                    thu: ["Brian K","George","Luis"],
                    fri: ["Brian K","George",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                
            },
            id: "etp", label: 'ETR Pack', align: "center", first: true, second: true, third: true },
        {arr: [7,15,23], 
            data:{
                1: {
                    mon: ["Brian K","George","Luis"],
                    tue: ["Brian K","George","Luis"],
                    wed: ["Brian K","George","Luis"],
                    thu: ["Brian K","George","Luis"],
                    fri: ["Brian K","George",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                2: {
                    mon: ["Lee","Brent","James"],
                    tue: ["Lee","Brent","James"],
                    wed: ["Lee","Brent","James"],
                    thu: ["Lee","Brent","James"],
                    fri: ["Lee","Brent",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                3: {
                    mon: ["Jason M","Matt","Luis"],
                    tue: ["Jason M","Matt","Luis"],
                    wed: ["Jason M","Matt","Luis"],
                    thu: ["Jason M","Matt","Luis"],
                    fri: ["Jason M","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                4: {
                    mon: ["Russ","George","James"],
                    tue: ["Russ","George","James"],
                    wed: ["Russ","George","James"],
                    thu: ["Russ","George","James"],
                    fri: ["Russ","George",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                5: {
                    mon: ["Brian K","Brent","Luis"],
                    tue: ["Brian K","Brent","Luis"],
                    wed: ["Brian K","Brent","Luis"],
                    thu: ["Brian K","Brent","Luis"],
                    fri: ["Brian K","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                6: {
                    mon: ["Lee","Matt","James"],
                    tue: ["Lee","Matt","James"],
                    wed: ["Lee","Matt","James"],
                    thu: ["Lee","Matt","James"],
                    fri: ["Lee","Matt",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                7: {
                    mon: ["Jason M","George","Luis"],
                    tue: ["Jason M","George","Luis"],
                    wed: ["Jason M","George","Luis"],
                    thu: ["Jason M","George","Luis"],
                    fri: ["Jason M","George",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                8: {
                    mon: ["Russ","Brent","James"],
                    tue: ["Russ","Brent","James"],
                    wed: ["Russ","Brent","James"],
                    thu: ["Russ","Brent","James"],
                    fri: ["Russ","Brent",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                9: {
                    mon: ["Brian K","Matt","Luis"],
                    tue: ["Brian K","Matt","Luis"],
                    wed: ["Brian K","Matt","Luis"],
                    thu: ["Brian K","Matt","Luis"],
                    fri: ["Brian K","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                10: {
                    mon: ["Lee","George","James"],
                    tue: ["Lee","George","James"],
                    wed: ["Lee","George","James"],
                    thu: ["Lee","George","James"],
                    fri: ["Lee","George",""],
                    sat: ["","",""],
                    sun: ["","","James"]
                },
                11 : {
                    mon: ["Jason M","Brent","Luis"],
                    tue: ["Jason M","Brent","Luis"],
                    wed: ["Jason M","Brent","Luis"],
                    thu: ["Jason M","Brent","Luis"],
                    fri: ["Jason M","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Luis"]
                },
                12 : {
                    mon: ["Russ","Matt","James"],
                    tue: ["Russ","Matt","James"],
                    wed: ["Russ","Matt","James"],
                    thu: ["Russ","Matt","James"],
                    fri: ["Russ","Matt",""],
                    sat: ["","",""],
                    sun: ["","","James"] 
                },
                
            },
            id: "flp", label: 'Flour Pack', align: "center", first: true, second: true, third: true },
           
        {
            data:{
                1: {
                    mon: ["Russ","Matt","Becky"],
                    tue: ["Russ","Matt","Becky"],
                    wed: ["Russ","Matt","Becky"],
                    thu: ["Russ","Matt","Becky"],
                    fri: ["Russ","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                2: {
                    mon: ["Brian K","George","Becky"],
                    tue: ["Brian K","George","Becky"],
                    wed: ["Brian K","George","Becky"],
                    thu: ["Brian K","George","Becky"],
                    fri: ["Brian K","George",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                3: {
                    mon: ["Lee","Brent","Becky"],
                    tue: ["Lee","Brent","Becky"],
                    wed: ["Lee","Brent","Becky"],
                    thu: ["Lee","Brent","Becky"],
                    fri: ["Lee","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                4: {
                    mon: ["Jason M","Matt","Becky"],
                    tue: ["Jason M","Matt","Becky"],
                    wed: ["Jason M","Matt","Becky"],
                    thu: ["Jason M","Matt","Becky"],
                    fri: ["Jason M","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                5: {
                    mon: ["Russ","George","Becky"],
                    tue: ["Russ","George","Becky"],
                    wed: ["Russ","George","Becky"],
                    thu: ["Russ","George","Becky"],
                    fri: ["Russ","George",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                6: {
                    mon: ["Brian K","Brent","Becky"],
                    tue: ["Brian K","Brent","Becky"],
                    wed: ["Brian K","Brent","Becky"],
                    thu: ["Brian K","Brent","Becky"],
                    fri: ["Brian K","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                7: {
                    mon: ["Lee","Matt","Becky"],
                    tue: ["Lee","Matt","Becky"],
                    wed: ["Lee","Matt","Becky"],
                    thu: ["Lee","Matt","Becky"],
                    fri: ["Lee","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                8: {
                    mon: ["Jason M","George","Becky"],
                    tue: ["Jason M","George","Becky"],
                    wed: ["Jason M","George","Becky"],
                    thu: ["Jason M","George","Becky"],
                    fri: ["Jason M","George",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                9: {
                    mon: ["Russ","Brent","Becky"],
                    tue: ["Russ","Brent","Becky"],
                    wed: ["Russ","Brent","Becky"],
                    thu: ["Russ","Brent","Becky"],
                    fri: ["Russ","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                10: {
                    mon: ["Brian K","Matt","Becky"],
                    tue: ["Brian K","Matt","Becky"],
                    wed: ["Brian K","Matt","Becky"],
                    thu: ["Brian K","Matt","Becky"],
                    fri: ["Brian K","Matt",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                11 : {
                    mon: ["Lee","George","Becky"],
                    tue: ["Lee","George","Becky"],
                    wed: ["Lee","George","Becky"],
                    thu: ["Lee","George","Becky"],
                    fri: ["Lee","George",""],
                    sat: ["","",""],
                    sun: ["","","Becky"]
                },
                12 : {
                    mon: ["Jason M","Brent","Becky"],
                    tue: ["Jason M","Brent","Becky"],
                    wed: ["Jason M","Brent","Becky"],
                    thu: ["Jason M","Brent","Becky"],
                    fri: ["Jason M","Brent",""],
                    sat: ["","",""],
                    sun: ["","","Becky"] 
                },
                
            }, id: "bb", label: 'Bulk Bag', align: "center", first: true, second: true, third: true },
        {
            data:{
                1 : {
                    mon: ["Jason M","",""],
                    tue: ["Jason M","",""],
                    wed: ["Jason M","",""],
                    thu: ["Jason M","",""],
                    fri: ["Jason M","",""],
                    sat: ["","",""],
                    sun: ["","",""] 
                },
                2: {
                    mon: ["Russ","",""],
                    tue: ["Russ","",""],
                    wed: ["Russ","",""],
                    thu: ["Russ","",""],
                    fri: ["Russ","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                3: {
                    mon: ["Brian K","",""],
                    tue: ["Brian K","",""],
                    wed: ["Brian K","",""],
                    thu: ["Brian K","",""],
                    fri: ["Brian K","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                4: {
                    mon: ["Lee","",""],
                    tue: ["Lee","",""],
                    wed: ["Lee","",""],
                    thu: ["Lee","",""],
                    fri: ["Lee","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                5: {
                    mon: ["Jason M","",""],
                    tue: ["Jason M","",""],
                    wed: ["Jason M","",""],
                    thu: ["Jason M","",""],
                    fri: ["Jason M","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                6: {
                    mon: ["Russ","",""],
                    tue: ["Russ","",""],
                    wed: ["Russ","",""],
                    thu: ["Russ","",""],
                    fri: ["Russ","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                7: {
                    mon: ["Brian K","",""],
                    tue: ["Brian K","",""],
                    wed: ["Brian K","",""],
                    thu: ["Brian K","",""],
                    fri: ["Brian K","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                8: {
                    mon: ["Lee","",""],
                    tue: ["Lee","",""],
                    wed: ["Lee","",""],
                    thu: ["Lee","",""],
                    fri: ["Lee","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                9: {
                    mon: ["Jason M","",""],
                    tue: ["Jason M","",""],
                    wed: ["Jason M","",""],
                    thu: ["Jason M","",""],
                    fri: ["Jason M","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                10: {
                    mon: ["Russ","",""],
                    tue: ["Russ","",""],
                    wed: ["Russ","",""],
                    thu: ["Russ","",""],
                    fri: ["Russ","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                11: {
                    mon: ["Brian K","",""],
                    tue: ["Brian K","",""],
                    wed: ["Brian K","",""],
                    thu: ["Brian K","",""],
                    fri: ["Brian K","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                12 : {
                    mon: ["Lee","",""],
                    tue: ["Lee","",""],
                    wed: ["Lee","",""],
                    thu: ["Lee","",""],
                    fri: ["Lee","",""],
                    sat: ["","",""],
                    sun: ["","",""]
                },
                
                
            }, id: "whs", label: 'Warehouse', align: "center", first: true, },
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