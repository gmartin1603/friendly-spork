import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import style, {tableHead, tableRow} from '../context/style/style'
import Row from './Row';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import MiscForm from './MiscForm';


//************** TODO **************** */
// border between op, pack and misc positions
// overtime reason key (possibly in shift header row?)
// double check names (spelling and structure)
// week look up functionality 
// position filter?
// "traded shift" designation (green text)
// cross section hover effect on cells
// row add/removal transition effect

function Schedual({ rows, rota}) {

  
  const {profile, width} = useAuthState()
  const [cols, setCols] = useState([])
  
  const [screen, setScreen] = useState(0)
  const [posts, setPosts] = useState(rota.posts)
  const [count, setCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  const [weekNum, setWeekNum] = useState(1)
  
  
  // console.log(rows)
  
  const today = new Date();
  
  const start = rota.start //week 1
  const rotaLength = rota.length //weeks
  
  useEffect(() => {
    //firestore listener on "rota" doc. Updates schedual when a new posting is added to rota
    onSnapshot(doc(db, rota.dept, 'rota'), (doc) => {
      
      setPosts(doc.data().posts)
      
    })
  },[rota])
  
  useEffect(() => {
    // console.log(profile)

    if (today.getDay() === 0 ) {
      setDayCount(7)
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

  const shifts = [
    {
      id: 'first',
      index: 0,
      label:'1st',
      color: {
        pack: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        op: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
        misc: ['rgb(189, 9, 49)','rgb(189, 9, 49, 0.8)'],
      },
    },
    {
      id: 'second',
      index: 1,
      label:'2nd',
      color: {
        pack: ['rgb(144, 165, 233)','rgb(144, 165, 233, 0.8)'],
        op: ['rgb(24, 204, 88)','rgb(24, 204, 88, 0.8)'],
        misc: ['rgb(204, 24, 140)','rgb(204, 24, 140, 0.8)'],
      },
    },
    {
      id: 'third',
      index: 2,
      label:'3rd',
      color: {
        pack: ['rgb(155, 222, 86)','rgb(155, 222, 86, 0.8)'],
        op: ['rgb(204, 156, 24)','rgb(204, 156, 24, 0.8)'],
        misc: ['rgb(24, 72, 204)','rgb(24, 72, 204, 0.8)'],
      },
    },
    
  ]
 
  const buildRows = () => {
    if (rota) {
      // console.log(rows)
      return (
      rota.shifts.length > 0 &&
      shifts.map(shift => (
          <tbody key={`${rota.dept} ${shift.label}` }>
            <tr>
              <th className={tableRow.shift}>
                <h3 >
                  {`${shift.label} Shift`}
                </h3>
              </th>
            </tr>
            {
              rows.length > 0 &&
              rows.map((row, i) => {
                if (row[shift.id] && shift.color){
                  let border = false
                  if (row[shift.id] && row.group !== rows[i+1]?.group) {
                    border = true
                  }
                  return (
                    <Row
                    posts={posts}
                    load={row}
                    i={shift.index}
                    wk={weekNum}
                    rota={rota}
                    color={ i % 2 == 0? shift.color[row.group][0]:shift.color[row.group][1]}
                    screen={screen}
                    day={dayCount}
                    cols={cols}
                    border={border}
                    />
                    ) 
                  }
                })
              }   
          </tbody>
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
    // console.log(screen)
    if (screen <= 500) {
      return (
          <th
          scope='col'
          id={cols[dayCount].label}
          key={cols[dayCount].id}
          align={cols[dayCount].align}
          className={tableHead.norm}
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
                className={today.getDay() === (col.id) && count === 0 ? tableHead.today : tableHead.norm}
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
      <div className={`select-none w-full min-w-max shadow-lg overflow-auto flex-column p-.01 rounded-md bg-green text-xl font-semibold`}>
        <h1 className={`w-full text-center text-3xl font-bold`}>{rota.dept.toUpperCase()}</h1>
        {
          profile.level >= 3 &&
          <MiscForm
          cols={cols}
          jobs={rows}
          rota={rota}
          />
        }
            <table id='myTable' className={screen <= 500? `w-full border-2 rounded`:`w-full border-2 rounded`}>
                <thead>
                    <tr >
                      <th
                        scope='col'
                        key='position'
                        align='center'
                        className={`${tableHead.pos}`}
                      >
                          Position
                      </th>
                      {cols.length > 1 && buildHead()}
                    </tr>
                </thead>
                {buildRows()}
            </table> 
            <div className={screen <= 500? `flex flex-col-reverse w-full h-max items-center`:`w-full flex justify-around`}>        
              <div className={style.button} onClick={() => prevWeek()}> Prev {screen <= 500? 'Day' : 'Week'} </div> 
              <div className={style.button} onClick={() => {screen <= 500? setScreen(550) : setScreen(499)}}> {screen <= 500? 'View Full':'View Mobile'} </div> 
              <div className={style.button} onClick={() => nextWeek()}> Next {screen <= 500? 'Day' : 'Week'} </div>  
            </div>
            </div>
    );
}

export default Schedual;

