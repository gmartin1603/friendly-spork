import React, {useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import {button} from '../context/style/style'
import useWindowSize from '../helpers/windowSize';
import TableBody from './TableBody';
import FormInput from './FormInput';
import usePostsListener from '../helpers/postsListener';
import useCollListener from '../helpers/collectionListener';
import WeekBar from './WeekBar';

//************** TODO **************** */
// row add/removal transition effect

function Schedual() {
  const [state, dispatch] = useAuthState()
  const [width, height] = useWindowSize([0,0]);
  
  const [cols, setCols] = useState([])
  const [screen, setScreen] = useState(0)
  const [count, setCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  const [weekNum, setWeekNum] = useState(1)
  const [today, setToday] = useState(new Date())
  
  const start = state.view[0].start //week 1
  const rotaLength = state.view[0].length //weeks

  usePostsListener(`${state.view[0].dept}-posts`)
  useCollListener(state.view[0].dept)

  const updateContext = (type, name, load) => {
    dispatch({
      type: type,
      name: name,
      load: load
    })
  }
  
  useEffect(() => {
    if (state.today.getDay() === 0 ) {
      setDayCount(6)
    } else {
      setDayCount(state.today.getDay() - 1)
    } 

  },[screen])

  useEffect(() => {
    console.log({count: state.count, week:state.week})
  },[weekNum, state.week])
  
  useEffect(() => {
    setScreen(width) 

  },[width])

  const handleChange = (e) => {
    if (e.target.value) {
      updateContext("SET-VALUE", "today",new Date(new Date(e.target.value).getTime() + (24*60*60*1000)))
    } else {
      updateContext("SET-VALUE", "today",new Date())
    }
  }


  const findWeek = () => {
    let timeSinceStart = state.today.getTime() - start
    let day = (24 * 60 *60 * 1000)
    let weeksSince = timeSinceStart/(day*7)
    let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
    let a = Math.ceil(week * rotaLength)
    updateContext("SET-VALUE", "week", a) 
    setWeekNum(a) 
    console.log(state.view[0].dept + ' WEEK NUMBER => ' + a)   
  } 

  const shifts = [
    {
      id: 'first',
      index: 0,
      label:'1st',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'7 AM - 3 PM', one:'7 AM - 11 AM', two:'11 AM - 3 PM'},
    },
    {
      id: '11-7',
      index: 4,
      label:'11am to 7pm',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'11 AM - 7 PM',one:'11 AM - 3 PM', two:'3 PM - 7 PM'},
    },
    {
      id: 'second',
      index: 1,
      label:'2nd',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'3 PM - 11 PM',one:'3 PM - 7 PM', two:'7 PM - 11 PM'},
    },
    {
      id: 'third',
      index: 2,
      label:'3rd',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'11 PM - 7 AM', one:'11 PM - 3 AM', two:'3 AM - 7 AM'},
    },
    {
      id: 'night',
      index: 3,
      label:'Night',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'7 PM - 7 AM', one:'7 PM - 11 PM', two:'11 PM - 3 AM', three:'3 AM - 7 AM'},
    },
    
  ]

  const buildRows = () => {
    if (state.view[0]) {
      // console.log(rows)
      return (
        // shifts.length > 0 &&
        // shifts.map(shift => (
        state.view[0].shifts.length > 0 &&
        state.view[0].shifts.map(shift => (
          <TableBody
          key={shift.label}
          shift={shift}
          rows={state.view.slice(1)}
          dayCount={dayCount}
          cols={cols}
          screen={screen}
          rota={state.view[0]}
          />
        ))
      )
    }
  }

  const buildColumns = () => {
    //Daylight Savings check
    const jan = new Date(state.today.getFullYear(), 0, 1);
    // const jul = new Date(today.getFullYear(), 6, 1);
    // console.log(`Daylight Savings => ${today.getTimezoneOffset() < jan.getTimezoneOffset()}`)
    let day = 24 * 60 * 60 * 1000
    //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset 
    let time = (state.today - ((state.today.getHours() * 60 * 60 * 1000) + (state.today.getMinutes() * 60 * 1000) + (state.today.getSeconds() * 1000) + state.today.getMilliseconds()))+(state.today.getTimezoneOffset() < jan.getTimezoneOffset()? (60*60*1000) : 0)
    let d = state.today.getDay()
      if (d === 0) {
        d = 7
      }
    //monday = time - (day of the week * ms in a day) + 1 day in ms
    let mon = time - (d * day) + day
    let columns = [
      {tag:'Monday', id: 1, label: mon + (day * state.count),  align: "center", },
      {tag:'Tuesday', id: 2, label: (mon + day) + (day * state.count), align: "center", },
      {tag:'Wednesday', id: 3, label: (mon + (day * 2)) + (day * state.count) , align: "center", },
      {tag:'Thursday', id: 4, label: (mon + (day * 3)) + (day * state.count) , align: "center", },
      {tag:'Friday', id: 5, label: (mon + (day * 4)) + (day * state.count) , align: "center", },
      {tag:'Saturday', id: 6, label: (mon + (day * 5)) + (day * state.count) , align: "center", },
      {tag:'Sunday', id: 7, label: (mon + (day * 6)) + (day * state.count) , align: "center", },
    ]
    setCols(columns)
    dispatch({
      type:"SET-ARR",
      name:"cols",
      load: columns
    })
  }

  const buildHead = () => {
    // console.log(dayCount)
    if (screen <= 500) {
      return (
          <th
          scope='col'
          id={cols[dayCount].label}
          key={cols[dayCount].id}
          align={cols[dayCount].align}
          className={styles.hdStd}
          >
            {cols[dayCount].tag}
              <br />
            {new Date(cols[dayCount].label).toDateString().slice(4, 10)}
          </th>
      )
    } else {
      return (
        cols.map(col => {
            return (
              <th
                key={col.id}
                align={col.align}
                className={`${today.getMonth()} ${today.getDate()}` === `${new Date(col.label + (7*60*60*1000)).getMonth()} ${new Date(col.label + (7*60*60*1000)).getDate()}` ? styles.hdToday : styles.hdStd}
              >
                {col.tag}
                <br />
                {new Date(col.label).toDateString().slice(4, 10)}
              </th>
            )
        })
      )
    }
  }

  useEffect(() => {
    findWeek()
    setCount(0)
  },[state.view, state.today])
  
  useEffect(() => {
    buildColumns()
  }, [state.count, state.today])

  const styles = {
    container:`select-none mb-[55px] flex-col w-full overflow-auto scroll-smooth overscroll-none rounded-md text-xl font-semibold bg-clearGreen shadow-lg`,
    top:`w-full flex flex-wrap justify-around items-center`,
    wrapper:`w-full p-10 rounded-md `,
    table:`w-full rounded-md`,
    head:`sticky top-0 bg-black z-10`,
    hdPos:'bg-green p-.01 text-white min-w-[130px]',
    hdStd:'bg-green p-.01 text-white min-w-[170px]',
    hdToday:'bg-todayGreen text-white p-.01 min-w-[170px]',
    foot:`sticky left-0 p-.02 flex justify-around w-full`,
    button:`${button.green} px-.01 py-[2px] rounded-xl text-2xl font-semibold`,
  }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
        {
          state.profile.dept.length > 2 &&
          <h1 className={`text-white w-.5 text-center text-4xl font-bold`}>{state.view[0].dept.toUpperCase()}</h1>
        }
        
        <FormInput
        style={`sticky left-0 flex w-[275px] px-.01 items-center justify-between text-white p-[5px] mb-[10px]`}
        label="Date Search"
        type="date"
        setValue={(e) => handleChange(e)}
        />
        </div>
        <div classame={styles.wrapper}>
          <table id='myTable' className={styles.table}>
              <thead className={styles.head}>
                  <tr>
                    <th
                      scope='col'
                      key='position'
                      align='center'
                      className={`${styles.hdPos} sticky left-0 `}
                    >
                        Position
                    </th>
                    {cols.length > 1 && buildHead()}
                  </tr>
              </thead>
              {buildRows()}
          </table> 
        </div>
        <WeekBar/>
        {/* <div className={styles.foot}>        
          <button className={styles.button} onClick={(e) => {e.preventDefault(); prevWeek()}}>{`<<`} {screen <= 500? 'Day' : 'Week'} </button> 
          <button className={styles.button} onClick={(e) => {e.preventDefault(); screen <= 500? setScreen(550) : setScreen(499)}}> {screen <= 500? 'Week View':'Day View'} </button> 
          <button className={styles.button} onClick={(e) => {e.preventDefault();  nextWeek()}}> {screen <= 500? 'Day' : 'Week'}  {`>>`} </button>  
        </div> */}
      </div>
    );
}

export default Schedual;

