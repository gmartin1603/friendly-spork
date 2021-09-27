export const initialState = {
    //state items for forms
}

export const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {

        default: 
            console.log("No Form State Change")
            return state;
    }
}