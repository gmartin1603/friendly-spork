
export const initialState = {
    profile: {},
    show: false,
    showWeek: false,
    showBid: false,
    formObj: {},
    colls:[],
    view:[],
    rota:[],
    shifts:[],
    users:{},
    loading: true,
    errors: [],
    colors: { 
        'Pink': '#ff49db',
        'Raspberry': 'rgb(227, 11, 92)',
        'Bright Orange': 'rgb(255, 172, 28)',
        'Copper': 'rgb(184, 115, 51)',
        'Blue Green': 'rgb(85, 165, 175)',
        'Sky Blue': 'rgb(15, 187, 255, 0.7)',
        'Flat Purple': 'rgb(214, 102, 255, 0.7)',
        'Sand Violet Metallic': 'rgb(149, 142, 163)',
        'Brite Green': 'rgb(0, 255, 33, 0.7)',
        'Golden Rod': 'rgb(240, 180, 13, 0.7)'
    },
    tabs: {
        admin: [
          {label:"Edit Schedule",link:'/'}, 
          {label:"Active Postings",link:"/postings"}, 
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Dashboard",link:"/dashboard"}, 
          {label:"App Settings",link:"/settings"}, 
        ],
        ee: [
          {label:"Schedule",link:'/'}, 
          {label:"Active Postings",link:"/postings"},
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Dashboard",link:"/home"},
          {label:"App Settings",link:"/settings"},
        ],
        op: [
          {label:"Schedule",link:'/'}, 
          {label:"Active Postings",link:"/postings"},
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Call In",link:"/callIn"},
          {label:"App Settings",link:"/settings"}, 
        ],
        sup: [
          {label:"Edit Schedule",link:"/"},
          {label:"Active Postings",link:"/postings"}, 
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Dashboard",link:"/dashboard"},  
          {label:"App Settings",link:"/settings"}, 
        ],
      },
}

const authReducer = (state, action) => {
  let arr = []
    switch (action.type) {
        case "INIT":
          return (
            {
              ...state,
              colls: action.colls,
              view: action.view,
              profile: action.profile,
            }
          )
        case "SET-OBJ":

            return (
                {...state, [action.name]: action.load}
            )
        case "SET-VIEW":
          arr = action.load
          let rota = arr[0]
          let shifts = rota.shifts
            return ({
              ...state, 
              view: arr,
              rota: rota,
              shifts: shifts,
            })
        case "SET-ARR":
            return (
                {...state, [action.name]: action.load}
            )
        case "UPDATE-COLLS":
          // console.log(action.load)
          arr = []
          state.colls.forEach(ele => {
            // console.log(ele)
            if (ele[0].dept === action.load[0].dept) {
              arr.push(action.load)
            } else {
              arr.push(ele)
            }
          })
          // console.log(arr)
            return (
              {...state, colls:arr, view: action.load}
              // state  
            )
        case "UPDATE-USERS":
          // console.log(action.load)
          action.load.map(user => {
            if (user.role !== "admin") {
              if (user.dept.includes(action.dept)) {
                arr.push(user)
              }
            }
          })
          // console.log(arr)
          return (
            {...state, users: {...state.users, [action.dept]:arr}}
            // state
          )
        case "ARR-PUSH":
          let update = state[action.name]
          update.push(action.load)
            return (
                {...state, [action.name]: update}
            )
        case "OPEN-FORM":
            return (
              {...state, [action.name]: true}
            )
        case "CLOSE-FORM":
            return (
              {...state, [action.name]: false, formObj: {}, errors:[]}
            )
        case "CLEAR":
            return(
              initialState
            )
        default:
          console.log("No_" + action.type)
            return state
    }
}

export default authReducer