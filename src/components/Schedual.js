import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Row from './Row';


function Schedual({ load, date }) {
  
  const [count, setCount] = useState(0)
  const [today, setToday] = useState(new Date())
  const [weekNum, setWeekNum] = useState(1)
  const [columns, setColumns] = useState([
    {id: "position", label: 'Position', align: "center", },
    {id: "mon", label: 'Monday',  align: "center", },
    {id: "tue", label: 'Tuesday', align: "center", },
    {id: "wed", label: 'Wednesday', align: "center", },
    {id: "thu", label: 'Thursday', align: "center", },
    {id: "fri", label: 'Friday', align: "center", },
    {id: "sat", label: 'Saturday', align: "center", },
    {id: "sun", label: 'Sunday', align: "center", },
])
  const [first, setFirst] = useState([])
  const [second, setSecond] = useState([])
  const [third, setThird] = useState([])
  const [op, setOp] = useState(true)
  const [pack, setPack] = useState(true)
  const [po, setPo] = useState(true)
  const [util, setUtil] = useState(true)

  const findWeek = () => {
    let start = new Date(2018, 0, 1)
    let oneJan = new Date(2018,0,1);
    let numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil(( today.getDay() + 1 + numberOfDays) / 7);
    // console.log(`The week number of the current date (${today}) is ${result}.`);
    
    do {
      
      start = start + ((24 * 60 * 60 * 1000) * 7 )
      console.log(start)
      
    }
    while (start < (today - time))

    setWeekNum(result)
  } 

  const nextWeek = () => {
    let n = weekNum
    // let a = Object.keys(load.ee)
    if (n < 52) {
      n = n + 1
    } else (
      n = 1
    )
    console.log(n)
    setWeekNum(n)
    setCount(count + 7)
  }

  const buildRows = () => {
    // console.log(load)

    let one = []
    let two = []
    let three = []

    let obj = {
      shift: 0,
      ee: "",
      job: "",
      week: {},
    }

    load.map((pos) => {
        pos.coverage.map((x) => {
          obj = {
            shift: x.shift,
            ee: x.ee,
            job: pos.job,
            week: x.week,
            qual: pos.qual
          } 
          if (obj.shift === 1) {
            // console.log(obj)
            one.push(obj)
            // setFirst([...first, obj])
          }
          if (obj.shift === 2) {
            two.push(obj)
            // setSecond([...second, obj])
          }
          if (obj.shift === 3) {
            // console.log(obj)
            three.push(obj)
            // setThird([...third, obj])
          }
        })
    })
    // console.log(one)
    setFirst(one)
    setSecond(two)
    setThird(three)
  }
      //      time = milliseconds past midnight - 12 hours
  const time = (today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) - (12 * 60 * 60 * 1000)

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
    setColumns(cols)
  }

  

  useEffect( () => {
      if (load.length > 0) {
        buildColumns(0)
        buildRows();
        // console.log(d)
      } 

  },[load, count, weekNum])

  useEffect(() => {
    findWeek()
  }, [])

    return (
      <Container>
            <TableContainer sx={{maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
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
                {
                    first.length > 0 ?
                  <ShiftBanner>1st Shift</ShiftBanner>
                  : ''
                  }
                  {
                    first.length > 0 &&
                    first.map((row) => {
                      switch (row.qual) {
                        case "op":
                          if (op === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "pack":
                          if (pack === true) { 
                            return (
                            <Row
                            load={row}
                            columns={columns}
                            wk={weekNum}
                            />
                            )
                          }
                        break
                        case "po":
                          if (po === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "util":
                          if (util === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                            
                        default:
                          
                      } 
                    }) 
                      
                  }
                </TableBody>
                <TableBody>
                {
                    second.length > 0 ?
                  <ShiftBanner>2nd Shift</ShiftBanner>
                  : ''
                  }
                  {
                    second.map((row) => {
                      switch (row.qual) {
                        case "op":
                          if (op === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "pack":
                          if (pack === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "po":
                          if (po === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "util":
                          if (util === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                            
                        default:
                          
                      } 
                    }) 
                      
                  }
                </TableBody>
                <TableBody>
                  {
                    third.length > 0 ?
                  <ShiftBanner>3rd Shift</ShiftBanner>
                  : ''
                  } 
                  {
                    third.map((row) => {
                      switch (row.qual) {
                        case "op":
                          if (op === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "pack":
                          if (pack === true) { 
                            return (
                            <Row
                            load={row}
                            columns={columns}
                            wk={weekNum}
                            />
                            )
                          }
                        break
                        case "po":
                          if (po === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                        case "util":
                          if (util === true) { 
                            return (
                              <Row
                              load={row}
                              columns={columns}
                              wk={weekNum}
                              />
                            )
                          }
                        break
                            
                        default:
                          
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
                        checked={pack}
                        onClick={() => setPack(!pack)}
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
                        checked={op}
                        onChange={() => setOp(!op)}
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
                        checked={po}
                        onChange={() => setPo(!po)}
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
                        checked={util}
                        onChange={() => setUtil(!util)}
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
  padding: 10px;
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