import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useScheValue } from '../context/ScheContext';
import Department from './Department';
import Jobs from './Jobs';
import PopUpForm from './PopUpForm';
import Row from './Row';


function Schedual() {
  const [crush, setCr] = useState(true)
  const [cts, setCts] = useState(false)
  const [count, setCount] = useState(0)
  const [weekNum, setWeekNum] = useState(1)
  
  const [state, dispatch] = useScheValue()
  
  const today = new Date();
  const crushStart = new Date('September 20, 2021')
  const crushRota = 16
  const csstStart = new Date('January 10, 2022')
  const csstRota = 15
  
  //      time = milliseconds past midnight - 12 hours
  const time = (today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) - (6 * 60 * 60 * 1000)

  const findWeek = () => {
    let rotaLength = 0;
    let start = 0;
    if (crush) {
      rotaLength = crushRota;
      start = crushStart;
    } else {
      rotaLength = csstRota;
      start = csstStart;
    }
    let timeSinceStart = today - start
    let day = (24 * 60 *60 * 1000)
    let weeksSince = timeSinceStart/(day*7)
    let week = (weeksSince / rotaLength) - (Math.floor(weeksSince / rotaLength))
    let a = Math.ceil(week * rotaLength)
    setWeekNum(a)  
    console.log(Math.ceil(week * rotaLength))
    
    
  } 

  const nextWeek = () => {
    setCount(count + 7)
    if(weekNum === 16) {
      setWeekNum(1)
    } else {
      setWeekNum(weekNum + 1)
    }
  }
  const prevWeek = () => {
    setCount(count - 7)
    
    if(weekNum === 1) {
      setWeekNum(16)
    } else {
      setWeekNum(weekNum - 1)
    }
  }

  const buildRows = (dept, shift) => {
    let arr = [];

    Object.keys(state[dept]).map((key) => (
      state[dept][key].map(row => {
        if (row[shift] === true) {
          arr.push(row);
        }
          
        })
    ))
  
    return arr
    
  }



  const buildColumns = () => {
    let day = 24 * 60 * 60 * 1000
    let d = today.getDay()
    if (d === 0) {
      d = 7
    }
    let mon = ((today) - (d * day) + day)
    // console.log(mon)
    let cols = [
      {id: "position", label: 'Position', align: "center", },
      {id: 1, label: mon + (day * count),  align: "center", },
      {id: 2, label: (mon + day) + (day * count), align: "center", },
      {id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
      {id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
      {id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
      {id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
      {id: 0, label: (mon + (day * 6)) + (day * count) , align: "center", },
    ]
    dispatch({
      type: 'SET-ARR',
      name: "cols",
      load: cols,
    })
  }
  useEffect(() => {
    findWeek()

  },[crush])

  useEffect(() => {
    console.log('load')
    buildColumns()
    console.log(today)
  }, [count])

    return (
      <Container>
        
            <TableContainer sx={{maxHeight: 440, }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {state.cols.map((column) => {
                          if (column.id === "position") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                   minWidth: 120, 
                                   padding:'1%', 
                                   backgroundColor: 'rgb(27, 102, 15, 0.7)',
                                  
                                  }}
                              >
                                  {column.label}
                              </TableCell>
                            )
                          }
                          if (column.id === today.getDay() && count === 0) {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ 
                                  minWidth: 120, 
                                  padding:'1%', 
                                  backgroundColor: '#228B22',
                                  color: "#FFFFF0",
                                }}
                                >
                                {new Date(column.label).toDateString()}
                            </TableCell>
                            )
                          }
                          else {
                            return (
                              <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: 120, padding:'1%', backgroundColor: 'rgb(27, 102, 15, 0.7)' }}
                              >
                                  {new Date(column.label).toDateString()}
                              </TableCell>
                            )
                          }
                      })}
                    </TableRow>
                </TableHead>
                  {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                  <h3>1st Shift</h3>
                <TableBody>
                  {
                    crush ?
                    buildRows('casc', 'first').map(obj => (
                      <Row
                          load={obj}
                          i={0}
                          wk={weekNum}
                          />
                    ))
                    :
                    buildRows('csst', 'first').map(obj => (
                      <Row
                          load={obj}
                          i={0}
                          wk={weekNum}
                          />
                    ))
                    }
                    </TableBody>
                   <h3>2nd Shift</h3>
                   <TableBody>
                   {
                    crush ?
                    buildRows('casc', 'second').map(obj => (
                      <Row
                          load={obj}
                          i={1}
                          wk={weekNum}
                          />
                    ))
                    :
                    buildRows('csst', 'second').map(obj => (
                      <Row
                          load={obj}
                          i={1}
                          wk={weekNum}
                          />
                    ))
                    }
                    
                  <h3>3rd Shift</h3>
                  {
                    crush ?
                    buildRows('casc', 'third').map(obj => (
                      <Row
                          load={obj}
                          i={2}
                          wk={weekNum}
                          />
                    ))
                    : 
                    buildRows('csst', 'third').map(obj => (
                      <Row
                          load={obj}
                          i={2}
                          wk={weekNum}
                          />
                    ))
                    }
                  <h3>Night Shift</h3>
                  {
                    crush ?
                    buildRows('casc', 'night').map(obj => (
                      <Row
                          load={obj}
                          i={2}
                          wk={weekNum}
                          />
                    ))
                    : ''
                    }
                </TableBody>   
            </Table> 
            </TableContainer>


            <ArrowBox>        
              <Button variant="contained" onClick={() => prevWeek()}> prev week </Button> 

              <Button variant="contained" onClick={() => nextWeek()}> Next Week </Button>  
            </ArrowBox>
            <Filter>    
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
            </Filter>
            </Container>
    );
}

export default Schedual;

const Container = styled.div`
  margin: 1%;
  max-width: 1050px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid;
  border-color: rgb(27, 102, 15, 0.6);
  border-radius: 10px;
  box-shadow: 0px 2px 5px;
`

const Filter = styled.div`

`
const ArrowBox = styled.div`
  padding: 20px;
  button {
    background-color: #228B22;

  }
`