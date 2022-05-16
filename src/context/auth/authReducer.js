
export const initialState = {
    profile: {},
    show: false,
    showWeek: false,
    formObj: {},
    colls:[],
    view:[],
    users:{},
    loading: true,
    errors: [],
    colors:[
      {
          name:'Pink', 
          code: '#ff49db'
      },
      {
          name:'Raspberry', 
          code: 'rgb(227, 11, 92)'
      },
      {
          name:'Bright Orange', 
          code: 'rgb(255, 172, 28)'
      },
      {
          name:'Copper', 
          code: 'rgb(184, 115, 51)'
      },
      {
          name: 'Blue Green',
          code: 'rgb(85, 165, 175)',
      },
      {
          name: 'Sky Blue',
          code: 'rgb(15, 187, 255, 0.7)',
      },
      {
          name: 'Flat Purple',
          code: 'rgb(214, 102, 255, 0.7)',
      },
      {
          name: 'Sand Violet Metallic',
          code: 'rgb(149, 142, 163)',
      },
      {
          name: 'Brite Green',
          code: 'rgb(0, 255, 33, 0.7)',
      },
      {
          name: 'Golden Rod',
          code: 'rgb(240, 180, 13, 0.7)',
      },
    ],
    tabs: {
        admin: [
          {label:"Edit Schedule",link:'/'}, 
          {label:"Dashboard",link:"/dashboard"},  
          {label:"App Settings",link:"/settings"}, 
        ],
        ee: [
          {label:"Schedule",link:'/'}, 
          {label:"Postings",link:"/postings"},
          {label:"Dashboard",link:"/home"},
          {label:"App Settings",link:"/settings"},
        ],
        op: [
          {label:"Schedule",link:'/'}, 
          {label:"Call In",link:"/callIn"},
          {label:"Postings",link:"/postings"},
          {label:"App Settings",link:"/settings"}, 
        ],
        sup: [
          
          {label:"Edit Schedule",link:"/"},
          {label:"Dashboard",link:"/dashboard"},  
          {label:"Postings",link:"/postings"}, 
          {label:"App Settings",link:"/settings"}, 
      
        ],
      },
}

const authReducer = (state, action) => {

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
        case "SET-ARR":

            return (
                {...state, [action.name]: action.load}
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
            {...state, [action.name]: false, formObj: {}}
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