export const posState = {
    pack: false,
    op: false,
    po: false,
    util: false,
    // job: "",
    // start: "",
    // end: "",
    five: false,
    seven: false,
    col: "Jobs",
    startTOD: true,
    endTOD: false,
    // ee: "",
    // shift1: {mon: true, tues: true, wed: true, thur: true, fri: true, sat: false, sun: false },
    // count2: {mon: true, tues: true, wed: true, },
    // count3: {mon: true, tues: true, wed: true, },
    // count4: {mon: true, tues: true, wed: true, },
    // count5: {mon: true, tues: true, wed: true, },
    // count6: {mon: true, tues: true, wed: true, },
    // count7: {mon: true, tues: true, wed: true, },
    // count8: {mon: true, tues: true, wed: true, },
}

const posReducer = (state, action) => {
    // console.log(action, state)
    // console.log(action)
    switch(action.type) {
        case "SET-WEEKS":
            return (
                {
                    ...state,
                    [action.key]: action.change
                }
            )

        case "SET-TEXT":
            return (
                {
                    ...state,
                    [action.name]: action.change
                }
            )
        case "TOGGLE-CHECK":
            if (action.key) {
                let key = state[action.key][action.name]
                // let day = action.name
                // let obj = key[day]
                console.log(key)
                return (
                    {
                        ...state,
                        key: action.checked
                    }
                )
            }else {
                return (
                    {
                        ...state,
                        [action.name]: action.checked,
                    }
                )
            }
            
        
        case "RESET":
            return (
                action.load
            )
        default: 
            console.log("No Form State Change")
            return state;
    }
}

export default posReducer