import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useScheValue } from '../context/ScheContext';
import Jobs from './Jobs';
import Row from './Row';


function Schedual() {
  
  const [count, setCount] = useState(0)
  const [today, setToday] = useState(new Date())
  const [weekNum, setWeekNum] = useState(1)
  
  const [state, dispatch] = useScheValue()
  
  
  
  //      time = milliseconds past midnight - 12 hours
  const time = (today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) - (12 * 60 * 60 * 1000)

  const findWeek = () => {
    let start = today.getTime()
    let time = (today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()
    let day = (24 * 60 *60 * 1000)
    let startTime = (7 * 60 * 60 * 1000)
    // console.log(time)
    
    
  } 

  const nextWeek = () => {
    
    setCount(count + 7)
  }

  



  const buildColumns = () => {
    let day = 1000*60*60*24
    let mon = ((today - time) - (today.getDay() * day)) + day
    let cols = [
      {id: "position", label: 'Position', align: "center", },
      {id: "mon", label: mon + (day * count),  align: "center", },
      {id: "tue", label: (mon + day) + (day * count), align: "center", },
      {id: "wed", label: (mon + (day * 2)) + (day * count) , align: "center", },
      {id: "thu", label: (mon + (day * 3)) + (day * count) , align: "center", },
      {id: "fri", label: (mon + (day * 4)) + (day * count) , align: "center", },
      {id: "sat", label: (mon + (day * 5)) + (day * count) , align: "center", },
      {id: "sun", label: (mon + (day * 6)) + (day * count) , align: "center", },
    ]
    dispatch({
      type: 'SET-ARR',
      name: "cols",
      load: cols,
    })
  }

  useEffect(() => {
    findWeek()
    buildColumns()
  }, [])

    return (
      <Container>
            <TableContainer sx={{maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {state.cols.map((column) => {
                          if (column.id === "position") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: 120, padding:3, }}
                              >
                                  {column.label}
                              </TableCell>
                            )
                          }
                          if (column.label === today - time) {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: 120, padding:3, backgroundColor: '#228B22', color: "#FFFFF0" }}
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
                              style={{ minWidth: 120, padding:3, }}
                              >
                                  {new Date(column.label).toDateString()}
                              </TableCell>
                            )
                          }
                      })}
                    </TableRow>
                </TableHead>
                  {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                <TableBody>
                  <h3>1st Shift</h3>
                  {
                    state.rows.length > 0 &&
                    state.rows.map(row => {
                      if (row.first) {
                        return (
                          <Row
                          load={row}
                          i={0}
                          />
                        )  
                      }
                  })
                  }
                  <h3>2nd Shift</h3>
                  {
                    state.rows.length > 0 &&
                    state.rows.map(row => {
                      if (row.second) {
                        return (
                          <Row
                          i={1}
                          load={row}
                          />
                        )  
                      }
                  })
                  }
                  <h3>3rd Shift</h3>
                  {
                    state.rows.length > 0 &&
                    state.rows.map(row => {
                      if (row.third) {
                        return (
                          <Row
                          load={row}
                          i={2}
                          />
                        )  
                      }
                  })
                  }
                  <h3>Night Shift</h3>
                  {
                    state.rows.length > 0 &&
                    state.rows.map(row => {
                      if (row.night) {
                        return (
                          <Row
                          load={row}
                          i={2}
                          />
                        )  
                      }
                  })
                  }
                </TableBody>   
            </Table> 
            </TableContainer>


            <ArrowBox>        
              <Button variant="contained" onClick={() => setCount(count - 7)}> prev week </Button> 

              <Button variant="contained" onClick={() => nextWeek()}> Next Week </Button>  
            </ArrowBox>
            <Filter>
            <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.pack}
                        // onChange={() => setPack(!pack)}
                        color="primary"
                        name="pack"
                        />
                    }
                    label="Packaging Operator"
                    />
                
                
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.op}
                        // onChange={() => setOp(!op)}
                        color="primary"
                        name="op"
                        />
                    }
                    label="CSST Operator"
                    />
                
                
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.po}
                        // onChange={() => setPo(!po)}
                        color="primary"
                        name="po"
                        />
                    }
                    label="CASC Operator"
                    />
                
                
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.util}
                        // onChange={() => setUtil(!util)}
                        color="primary"
                        name="util"
                        />
                    }
                    label="Utility"
                />
            </Filter>
            </Container>
    );
}

export default Schedual;

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ShiftBanner = styled.div`
  font-weight: 600;
  background-color: #228B22;
  width: 100%;
  cursor: default;
`
const Filter = styled.div`

`
const ArrowBox = styled.div`
  padding: 20px;
  button {
    background-color: #228B22;

  }
`