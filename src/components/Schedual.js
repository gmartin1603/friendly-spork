import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import {button, table} from '../context/style/style'
import Row from './Row';
import MiscForm from './MiscForm';
import useWindowSize from '../helpers/windowSize';
import usePostsListener from '../helpers/postsListener';
import TableBody from './TableBody';


//************** TODO **************** */
// border between op, pack and misc positions 
// overtime reason key (possibly in shift header row?)
// double check names (spelling and structure)
// week look up functionality 
// position filter?
// "traded shift" designation (green text) **DONE
// cross section hover effect on cells
// row add/removal transition effect

function Schedual({ rows, rota}) {

  const {profile} = useAuthState()
  const [width, height] = useWindowSize([0,0]);
  
  const [cols, setCols] = useState([])
  const [screen, setScreen] = useState(0)
  const [count, setCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  const [weekNum, setWeekNum] = useState(1)
  
  
  // console.log(rows)
  
  const today = new Date();
  
  const start = rota.start //week 1
  const rotaLength = rota.length //weeks
  
  
  
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


  const findWeek = () => {
    // console.log(today.getTime())

    let timeSinceStart = today.getTime() - start
    let day = (24 * 60 *60 * 1000)
    let weeksSince = timeSinceStart/(day*7)
    let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
    let a = Math.ceil(week * rotaLength)
    setWeekNum(a)  
    console.log(rota.dept + ' WEEK NUMBER => ' + a)
    
    
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
    if (rota) {
      // console.log(rows)
      return (
      rota.shifts.length > 0 &&
      rota.shifts.map(shift => (
          <TableBody
          key={shift.label}
          shift={shift}
          rows={rows}
          dayCount={dayCount}
          cols={cols}
          screen={screen}
          weekNum={weekNum}
          rota={rota}
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
    console.log(dayCount)
    if (screen <= 500) {
      return (
          <th
          scope='col'
          id={cols[dayCount].label}
          key={cols[dayCount].id}
          align={cols[dayCount].align}
          className={table.head.norm}
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
                className={today.getDay() === (col.id) && count === 0 ? table.head.today : table.head.norm}
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
  },[rota])
  

  useEffect(() => {

    buildColumns()
  }, [count])

    return (
      <div className={table.frame}>
        <h1 className={`w-full text-center text-3xl font-bold`}>{rota.dept.toUpperCase()}</h1>
        {/* {
          profile.level >= 3 &&
          <MiscForm
          cols={cols}
          jobs={rows}
          rota={rota}
          />
        } */}
            <table id='myTable' className={table.table}>
                <thead>
                    <tr >
                      <th
                        scope='col'
                        key='position'
                        align='center'
                        className={`${table.head.pos}`}
                      >
                          Position
                      </th>
                      {cols.length > 1 && buildHead()}
                    </tr>
                </thead>
                {buildRows()}
            </table> 
            <div className={screen <= 500? table.foot.mobile : table.foot.full}>        
              <div className={button.green} onClick={() => prevWeek()}> Prev {screen <= 500? 'Day' : 'Week'} </div> 
              <div className={button.green} onClick={() => {screen <= 500? setScreen(550) : setScreen(499)}}> {screen <= 500? 'View Full':'View Mobile'} </div> 
              <div className={button.green} onClick={() => nextWeek()}> Next {screen <= 500? 'Day' : 'Week'} </div>  
            </div>
            </div>
    );
}

export default Schedual;

