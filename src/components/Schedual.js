import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';
import PopUpForm from './PopUpForm';
import style, {tableHead, tableRow, tableFoot} from '../context/style/style'
import Row from './Row';
import { useRef } from 'react';


function Schedual({rows, rota}) {

  
  const {profile, width} = useAuthState()
  const [cols, setCols] = useState([])
  
  const [screen, setScreen] = useState(0)
  
  const [count, setCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  
  const [crush, setCr] = useState(true)
  const [weekNum, setWeekNum] = useState(1)
  
  
  // console.log(rows)
  
  const today = new Date();
  
  const start = rota.start //week 1
  const  rotaLength = rota.length //weeks
  
  
  
  
  useEffect(() => {
    console.log(profile)

    if (today.getDay() === 0 ) {
      setDayCount(7)
    } else {
      setDayCount(today.getDay() - 1)
    } 

  },[rows])
  
  useEffect(() => {
    setScreen(width) 

  },[width])


  const findWeek = () => {
    
    let timeSinceStart = today - start
    let day = (24 * 60 *60 * 1000)
    let weeksSince = timeSinceStart/(day*7)
    let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
    let a = Math.ceil(week * rotaLength)
    setWeekNum(a)  
    // console.log(Math.ceil(week * rotaLength))
    
    
  } 

  const nextWeek = () => {
    console.log(dayCount)
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
        if(weekNum === 1) {
          setWeekNum(12)
        } else {
          setWeekNum(weekNum - 1)
        }
    } 
  }

  
 
  const buildRows = () => {
    if (rota) {
      console.log(rows)
      return (
      rota.shifts.length > 0 &&
      rota.shifts.map(shift => (
          <tbody>
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
                console.log(row[shift.id])
                if (row[shift.id] && shift.color){
                  return (
                    <Row
                    // key={row.label + i}
                    load={row}
                    i={shift.index}
                    wk={weekNum}
                    rota={rota}
                    color={ i % 2 == 0? shift.color[0]:shift.color[1]}
                    screen={screen}
                    day={dayCount}
                    cols={cols}
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
    let day = 24 * 60 * 60 * 1000
    //  time = milliseconds past midnight
    let time = today - ((today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds())
    let d = today.getDay()
      if (d === 0) {
        d = 7
      }
    let mon = (time - (d * day) + day)
    // console.log(d)
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
    console.log(screen)
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
  },[crush])
  

  useEffect(() => {

    buildColumns()
  }, [count])

    return (
      <div className={`w-max shadow-lg mt-24 overflow-auto flex-column p-.01 m-.02 rounded-md bg-green flex-column`}>
        <h1>{rota.dept}</h1>
            <table id='myTable' className={screen <= 500? `w-480 border-2 rounded`:`w-1k border-2 rounded`}>
                <thead>
                    <tr >
                      <th
                        scope='col'
                        key='position'
                        align='center'
                        className={`${tableHead.norm}`}
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
            
            


            {/* <Filter>    
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={!crush}
                        onClick={() => setCr(!crush)}
                        color="primary"
                        name="csst"
                        />
                    }
                    label="CSST"
                    />
                
                
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={crush}
                        onClick={() => setCr(!crush)}
                        color="primary"
                        name="casc"
                        />
                    }
                    label="CASC"
                    />
            </Filter> */}
            </div>
    );
}

export default Schedual;

