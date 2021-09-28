export const initialState = {
    // count1: {mon: true, tues: true, wed: true, },
    // count2: {mon: true, tues: true, wed: true, },
    // count3: {mon: true, tues: true, wed: true, },
    // count4: {mon: true, tues: true, wed: true, },
    // count5: {mon: true, tues: true, wed: true, },
    // count6: {mon: true, tues: true, wed: true, },
    // count7: {mon: true, tues: true, wed: true, },
    // count8: {mon: true, tues: true, wed: true, },
}

const reducer = (state, action) => {
    console.log(action, state)
    console.log(action)
    switch(action.type) {
        case "SET":
            return (
                {
                    ...state,
                    [action.key]: action.change
                }
            ) 
        case "BUILD":
            

        default: 
            console.log("No Form State Change")
            return state;
    }
}

export default reducer