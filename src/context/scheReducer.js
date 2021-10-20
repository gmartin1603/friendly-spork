export const scheState = {
    pack: false,
    op: false,
    po: false,
    util: false,
    misc: false,
    
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
        case "TOGGLE-CHECK":
            return (
                {
                    ...state,
                    [action.name]: action.checked,
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