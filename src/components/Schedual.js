import React, {useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import {button} from '../context/style/style'
import useWindowSize from '../helpers/windowSize';
import TableBody from './TableBody';
import FormInput from './FormInput';


//************** TODO **************** */
// border between op, pack and misc positions 
// overtime reason key (possibly in shift header row?)
// double check names (spelling and structure)
// week look up functionality 
// position filter?
// "traded shift" designation (green text) **DONE
// cross section hover effect on cells
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
  
  // useEffect(() => {
  //   console.log(state)

  // },[state])
  
  useEffect(() => {
    // console.log(profile)

    if (today.getDay() === 0 ) {
      setDayCount(6)
    } else {
      setDayCount(today.getDay() - 1)
    } 

  },[])
  
  useEffect(() => {
    setScreen(width) 

  },[width])

  const handleChange = (e) => {
    if (e.target.value) {
      setToday(new Date(new Date(e.target.value).getTime() + (24*60*60*1000)))
    } else {
      setToday(new Date())
    }
  }


  const findWeek = () => {
    // console.log(today.getTime())

    let timeSinceStart = today.getTime() - start
    let day = (24 * 60 *60 * 1000)
    let weeksSince = timeSinceStart/(day*7)
    let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
    let a = Math.ceil(week * rotaLength)
    setWeekNum(a)  
    // console.log(rota.dept + ' WEEK NUMBER => ' + a)
    
    
  } 

  const nextWeek = () => {
    // console.log(dayCount)
    if (screen <= 500) {
      if (dayCount != 6) {
        setDayCount(dayCount + 1)
      } else {
        setCount(count + 7)
        setDayCount(0)
        
        if(weekNum === rotaLength) {
          setWeekNum(1)
        } else {
          setWeekNum(weekNum + 1)
        }
      }
    } else {
      setCount(count + 7)
      setDayCount(0)
      
      if(weekNum === rotaLength) {
        setWeekNum(1)
      } else {
        setWeekNum(weekNum + 1)
      }
    }
  }

  const prevWeek = () => {
    if (screen <= 500) {
      if (dayCount != 0) {
        setDayCount(dayCount - 1)
      } else {
        setCount(count - 7)
        setDayCount(6)
        if(weekNum === 1){
          setWeekNum(rotaLength)
        } else {
        setWeekNum(weekNum - 1)
        }
      }
    } else {
        setCount(count - 7)
        if(weekNum === 1) {
          setWeekNum(rotaLength)
        } else {
          setWeekNum(weekNum - 1)
        }
    } 
  }

  
 
  const buildRows = () => {
    if (state.view[0]) {
      // console.log(rows)
      return (
      state.view[0].shifts.length > 0 &&
      state.view[0].shifts.map(shift => (
          <TableBody
          key={shift.label}
          shift={shift}
          rows={state.view.slice(1)}
          dayCount={dayCount}
          cols={cols}
          screen={screen}
          weekNum={weekNum}
          rota={state.view[0]}
          />
        )
        )
        )
    }
  }



  const buildColumns = () => {

    //Daylight Savings check
    const jan = new Date(today.getFullYear(), 0, 1);
    const jul = new Date(today.getFullYear(), 6, 1);
    console.log(`Daylight Savings => ${jul.getTimezoneOffset() < today.getTimezoneOffset()}`)

    let day = 24 * 60 * 60 * 1000
    //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset 
    let time = (today - ((today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()))+(today.getTimezoneOffset() < jan.getTimezoneOffset()? 60*60*1000 : 0)
    let d = today.getDay()
      if (d === 0) {
        d = 7
      }
    //monday = time - (day of the week * ms in a day) + 1 day in ms
    let mon = time - (d * day) + day
    

    let columns = [
      {tag:'Monday', id: 1, label: mon + (day * count),  align: "center", },
      {tag:'Tuesday', id: 2, label: (mon + day) + (day * count), align: "center", },
      {tag:'Wedsday', id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
      {tag:'Thursday', id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
      {tag:'Friday', id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
      {tag:'Saturday', id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
      {tag:'Sunday', id: 7, label: (mon + (day * 6)) + (day * count) , align: "center", },
    ]
    setCols(columns)
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
                className={today.getDay() === (col.id) && count === 0 ? styles.hdToday : styles.hdStd}
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
  },[state.view, today])
  

  useEffect(() => {

    buildColumns()
  }, [count, today])

  const styles = {
    container:`border-2 mt-[20px] select-none flex-column w-[95%] overflow-x-auto p-.01 rounded-md text-xl font-semibold bg-green shadow-lg`,
    top:`w-full flex justify-around`,
    table:`w-full min-w-max border-2 rounded overflow-scroll`,
    hdStd:'bg-green p-.01 text-white min-w-[200px]',
    hdToday:'bg-todayGreen text-white p-.01 min-w-[200px]',
    foot:`flex justify-around my-.02 `,
    button:`${button.green} p-.01 rounded-xl text-2xl font-semibold`,
  }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
        {
          state.profile.dept.length > 1 &&
          <h1 className={`text-white text-center text-4xl font-bold`}>{state.view[0].dept.toUpperCase()}</h1>
        }
        <FormInput
        style={`flex w-[300px] px-.01 items-center justify-between text-white border p-[5px] mb-[10px]`}
        label="Date Search"
        type="date"
        setValue={(e) => handleChange(e)}
        />
        </div>
            <table id='myTable' className={styles.table}>
                <thead>
                    <tr >
                      <th
                        scope='col'
                        key='position'
                        align='center'
                        className={`${styles.hdStd}`}
                      >
                          Position
                      </th>
                      {cols.length > 1 && buildHead()}
                    </tr>
                </thead>
                {buildRows()}
            </table> 
            <div className={styles.foot}>        
              <div className={styles.button} onClick={() => prevWeek()}> Prev {screen <= 500? 'Day' : 'Week'} </div> 
              <div className={styles.button} onClick={() => {screen <= 500? setScreen(550) : setScreen(499)}}> {screen <= 500? 'View Full':'View Mobile'} </div> 
              <div className={styles.button} onClick={() => nextWeek()}> Next {screen <= 500? 'Day' : 'Week'} </div>  
            </div>
            </div>
    );
}

export default Schedual;

