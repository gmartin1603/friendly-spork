import { getData, writeData } from "../firebase/firestore"


export const scheState = {
    pack: true,
    op: true,
    po: true,
    util: true,
    misc: true,
    showForm: false,
    wk: 1,
    mon: 0,
    formObj: {},
    shifts: {
        first: ['7am to 11am', '11am to 3pm'],
        second: ['3pm to 7pm', '7pm to 11pm'],
        third: ['11pm to 3am', '3am to 7am'],
        night: ['7pm to 11pm', '11pm to 3am', '3am to 7am'],
    },
    cols: [
        {id:0,tag:"position", label: 'Position', align: "center", },
        {id:2,tag:"mon", label: 'Monday',  align: "center", },
        {id:3,tag:"tue", label: 'Tuesday', align: "center", },
        {id:4,tag:"wed", label: 'Wednesday', align: "center", },
        {id:5,tag:"thu", label: 'Thursday', align: "center", },
        {id:6,tag:"fri", label: 'Friday', align: "center", },
        {id:7,tag:"sat", label: 'Saturday', align: "center", },
        {id:8,tag:"sun", label: 'Sunday', align: "center", },
    ],
    casc: {
        rota: {
            
        },
        procOps: [
            
        ],
        utility: [
            
        ],
        
    },
    csst: {
        rota: {
            
        },
        operators: [
            
            ],
            packaging: [
                
            ],

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
        case "SET-FORM-STATE":

            return (
                {
                    ...state,
                    formObj: action.load,
                    showForm:true
                }
            )
        case "WRITE-DATA":
            if (action.load.id === 'rota') {
                writeData(action.col, action.load)
            } else {
                action.load.map(job => {
                    writeData(action.col, job)
                })

            }
            return (
                {
                    ...state,
                }
            )
        case "SET-ARR":
            return (
                {
                    ...state,
                    [action.name]: action.load,
                }
            )
        
        case "CLOSE-FORM":
            return (
                {
                    ...state,
                    showForm: false,
                    formObj: {},
                }
            )
        default: 
            console.log("No Form State Change")
            return state;
    }
    
}

export default scheReducer