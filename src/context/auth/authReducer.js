import { getPosts } from "../../firebase/firestore"

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
    count:1,
    view:[],
    rota:[],
    shifts:[],
    scale:[],
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

const findWeek = (today, start, rotaLength,) => {
  // console.log(today, start, rotaLength)
  let timeSinceStart = today.getTime() - start
  let day = (24 * 60 *60 * 1000)
  let weeksSince = timeSinceStart/(day*7)
  let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
  let a = Math.ceil(week * rotaLength)
  // console.log(' WEEK NUMBER => ' + week)
  return a
}

const buildColumns = (today, count) => {
  //Daylight Savings check
  const jan = new Date(today.getFullYear(), 0, 1);
  // const jul = new Date(today.getFullYear(), 6, 1);
  // console.log(`Daylight Savings => ${today.getTimezoneOffset() < jan.getTimezoneOffset()}`)
  let day = 24 * 60 * 60 * 1000
  //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset
  let time = (today - ((today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()))+(today.getTimezoneOffset() < jan.getTimezoneOffset()? (60*60*1000) : 0)
  let d = today.getDay()
  if (d === 0) {
    d = 7
  }
  //monday = time - (day of the week * ms in a day) + 1 day in ms
  let mon = time - (d * day)
  let columns = [
    {tag:'Monday', id: 1, label: mon + (day * count),  align: "center", },
    {tag:'Tuesday', id: 2, label: (mon + day) + (day * count), align: "center", },
    {tag:'Wednesday', id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
    {tag:'Thursday', id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
    {tag:'Friday', id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
    {tag:'Saturday', id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
    {tag:'Sunday', id: 7, label: (mon + (day * 6)) + (day * count) , align: "center", },
  ]
  return columns
}

const sort = (arr) => {
  arr.sort((a, b) => {
      if (a.order < b.order) {
          return -1
      }
      if (a.order > b.order) {
          return 1
      }
      // if (a === b)
      return 0
  })
}

const sortShifts = (shiftObj) => {
  const keys = Object.keys(shiftObj)
  let shiftArr = []
  for (const prop in keys) {
    shiftArr.push(shiftObj[keys[prop]])
  }
  sort(shiftArr)
  return shiftArr
}

const authReducer = (state, action) => {
  const day = (24*60*60*1000)
  let shifts
  let cols = []
  let arr = []
  let week = state.week
  let count = state.count
  let posts = state.posts

    switch (action.type) {
        case "INIT":
          const rotaDoc = action.view[0]
          cols = buildColumns(state.today, state.count)
          week = findWeek(state.today, rotaDoc.start, rotaDoc.length)
          let shiftsInit = sortShifts(rotaDoc.shifts)
          return (
            {
              ...state,
              colls: action.colls,
              view: action.view,
              profile: action.profile,
              cols: cols,
              week: week,
              rota: rotaDoc,
              shifts: shiftsInit,
            }
          )
        case "SET-OBJ":

            return (
                {...state, [action.name]: action.load}
            )
        case "SET-VIEW":
          arr = action.load
          let rota = arr[0]
          shifts = sortShifts(rota.shifts)
          let activeMisc = {}

          week = findWeek(new Date(state.today.getTime() + ((day * count) - day)), rota.start, rota.length)
          // console.log(rota.length)
          shifts.map(shift => (
            activeMisc[shift.index] = []
          ))
            return ({
              ...state,
              view: arr,
              rota: rota,
              shifts: shifts,
              activeMisc: activeMisc,
              week: week
            })
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
        case "UPDATE-COLLS":
          // console.log(action.load)
          arr = []
          shifts = sortShifts(action.load[0].shifts)
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
              {...state, rota: action.load[0], shifts: shifts, colls:arr, view: action.load}
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
        case "SET-VALUE":
            return (
                {...state, [action.name]: action.load}
            )
        case "SET-TODAY":
            cols = buildColumns(action.load, 1)
            week = findWeek(action.load, state.rota.start, state.rota.length)
            return (
                {...state, today: action.load, count: 1, cols: cols, week: week}
            )
        case "NEXT-WEEK":
            count = count + 7

            if(state.week === state.view[0].length) {
              week = 1
            } else {
              week = week + 1
            }
            cols = buildColumns(state.today, count)
            return ({...state, week: week, count: count, cols: cols})
        case "PREV-WEEK":
              count = count - 7
              cols = buildColumns(state.today, count)

              if(state.week === 1) {
                week = state.view[0].length
              } else {
                week = week - 1
              }
              return ({...state, week: week, count: count, cols: cols, posts: action.load})
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