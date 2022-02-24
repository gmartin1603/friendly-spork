import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';
import PopUpForm from './PopUpForm';
import style, {tableHead, tableRow, tableFoot} from '../context/style/style'
import Row from './Row';


function Schedual() {

  const {profile, rows, width} = useAuthState()
  const [cols, setCols] = useState([])
  
  const [screen, setScreen] = useState(0)
  
  const [count, setCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  
  const [crush, setCr] = useState(false)
  const [weekNum, setWeekNum] = useState(1)
  const [rota, setRota] = useState()
  
  
  
  const today = new Date();
  const casc = {
    start: new Date('September 20, 2021'), //week 1
    rota: 16, //weeks
  }
  const csst = {
    start: new Date('January 10, 2022'), //week 1
    rota: 12, //weeks
  }
  
  
  useEffect(() => {
    console.log(profile)
    rows &&
    setRota(rows[0]);

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
    let rotaLength = 0;
    let start = 0;
    if (crush) {
      rotaLength = casc.rota;
      start = casc.start;
    } else {
      rotaLength = csst.rota;
      start = csst.start;
    }
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
        if (crush){
          if(weekNum === 16) {
            setWeekNum(1)
          } else {
            setWeekNum(weekNum + 1)
          }
        } else {
          if(weekNum === 12) {
            setWeekNum(1)
          } else {
            setWeekNum(weekNum + 1)
          }
        }
      }
    } else {
      setCount(count + 7)
      setDayCount(0)
      if (crush){
        if(weekNum === 16) {
          setWeekNum(1)
        } else {
          setWeekNum(weekNum + 1)
        }
      } else {
        if(weekNum === 12) {
          setWeekNum(1)
        } else {
          setWeekNum(weekNum + 1)
        }
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
        if (crush){
          if(weekNum === 1) {
            setWeekNum(16)
          } else {
            setWeekNum(weekNum - 1)
          }
        } else {
          if(weekNum === 1) {
            setWeekNum(12)
          } else {
            setWeekNum(weekNum - 1)
          }
        }
      }
    } else {
        setCount(count - 7)
        setDayCount(0)
        if (crush){
          if(weekNum === 1) {
            setWeekNum(16)
          } else {
            setWeekNum(weekNum - 1)
          }
        } else {
          if(weekNum === 1) {
            setWeekNum(12)
          } else {
            setWeekNum(weekNum - 1)
          }
        }
    }
  }

  
 
  const buildRows = (shift, i, key, color) => {
    if (rota) {
      console.log(rota)
        return (
          <tbody>
            <tr>
              <td className={tableRow.shift}>
                <h3 >
                  {shift}
                </h3>
              </td>
            </tr>
            {
              rows.length > 0 &&
              rows.map(row => {
                if (row[key]){
                  return (
                    <Row
                        // key={row.label + i}
                        load={row}
                        i={i}
                        wk={weekNum}
                        rota={rota}
                        color={color}
                        screen={screen}
                        day={dayCount}
                        // posts={posts[obj.id]}
                        />
                  ) 
                }
              })
            }   
          </tbody>
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
      {tag: "position", label: 'Position', align: "center", },
    ]
    setCols(columns)
  }

  const buildHead = () => {
    console.log(screen)
    if (screen <= 500) {
      return (
        <th
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
          if(col.tag !== 'position') {
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
          }
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
      <div className={`shadow-lg mt-24 overflow-auto flex-column p-.01 m-.02 rounded-md bg-green flex-column`}>
         {/* <PopUpForm
          show={state.showForm}
          type={"posting"}
            /> */}
            <table className={screen <= 500? `w-480 border-2 rounded`:`w-1k border-2 rounded`}>
                <thead>
                    <tr >
                      {
                        cols.map((column) => {
                          if (column.tag === "position") {
                            return (
                              <th
                                key={column.id}
                                align={column.align}
                                className={`${tableHead.norm} w-28`}
                              >
                                  {column.label}
                              </th>
                            )
                          }  
                        })
                      }
                      {cols.length > 1 && buildHead()}
                    </tr>
                </thead>
                {buildRows('1st Shift', 0, 'first', '#90E8E9')}
                {buildRows('2nd Shift', 1, 'second', '#90A5E9')}
                {buildRows('3rd Shift', 2, 'third', '#9BDE56')}
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

