
export const initialState = {
    profile: {},
    show: false,
    showWeek: false,
    showBid: false,
    showCallin: false,
    openCallinWin: false,
    formObj: {},
    colls:[],
    options:[],
    filtered:[],
    cols:[],
    today:new Date(),
    week:0,
    count:0,
    view:[],
    rota:[],
    shifts:[],
    users:{},
    activeMisc: {},
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
        ],
        ee: [
          {label:"Schedule",link:'/'}, 
          {label:"Active Postings",link:"/postings"},
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Profile",link:"/profile"},
        ],
        op: [
          {label:"Schedule",link:'/'}, 
          {label:"Active Postings",link:"/postings"},
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Call In",link:"/callIn"},
        ],
        sup: [
          {label:"Edit Schedule",link:"/"},
          {label:"Active Postings",link:"/postings"}, 
          {label:"Down Postings",link:"/archPostings"}, 
          {label:"Dashboard",link:"/dashboard"},  
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
          let activeMisc = {}
          shifts.map(shift => (
            activeMisc[shift.index] = []
          ))
            return ({
              ...state, 
              view: arr,
              rota: rota,
              shifts: shifts,
              activeMisc: activeMisc,
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
        case "SET-VALUE":
            return (
                {...state, [action.name]: action.load}
            )
        case "NEXT-WEEK":
          let week = state.week
          let count = state.count
          // if (screen <= 500) {
          //   if (dayCount != 6) {
          //     setDayCount(dayCount + 1)
          //   } else {
          //     setCount(count + 7)
          //     setDayCount(0)
              
          //     if(weekNum === rotaLength) {
          //       setWeekNum(1)
          //       updateContext("SET-VALUE", "week", 1)
          //     } else {
          //       setWeekNum(weekNum + 1)
          //       updateContext("SET-VALUE", "week", weekNum + 1)
          //     }
          //   }
          // } else {
            // setDayCount(0)
            count = count + 7
            
            if(state.week === state.view[0].length) {
              week = 1
            } else {
              week = week + 1
            }
            return ({...state, week: week, count: count})
          // }
          // break
        // case "PREV-WEEK":
        //     return (
        //         {...state, week: action.load}
        //     )
        case "SET-LOADING":
            return (
              {...state, loading: action.load}
            )
        case "OPEN-FORM":
            return (
              {...state, [action.name]: true}
            )
        case "CLOSE-FORM":
            return ({
              ...state, 
              [action.name]: false, 
              formObj: {}, 
              errors:[],
              options:[],
              filtered:[],
            })
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