import { useEffect } from "react"
import { getUser } from "../../firebase/firestore"

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
    tabs: {
        admin: [
          {label:"Edit Schedule",link:'/'}, 
          {label:"Dashboard",link:"/dashboard"}, 
          {label:"Edit Positions",link:"/editJob"}, 
          {label:"App Settings",link:"/settings"}, 
        ],
        ee: [
          {label:"Schedule",link:'/'}, 
          {label:"Postings",link:"/postings"},
          {label:"EE Dashboard",link:"/home"},
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
          {label:"Current Postings",link:"/postings"}, 
          {label:"Archived Postings",link:"/oldPostings"}, 
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