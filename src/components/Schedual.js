import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Row from './Row';


function Schedual({ load, date }) {
  
  const [first, setFirst] = useState([])
  const [second, setSecond] = useState([])
  const [third, setThird] = useState([])
  const [op, setOp] = useState(true)
  const [pack, setPack] = useState(true)
  const [po, setPo] = useState(true)
  const [util, setUtil] = useState(true)

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

  const columns = [
      {id: "position", label: 'Position', align: "center", },
      {id: "mon", label: 'Monday',  align: "center", date: "10/18" },
      {id: "tue", label: 'Tuesday', align: "center", date: "10/19" },
      {id: "wed", label: 'Wednesday', align: "center", date: "10/20" },
      {id: "thu", label: 'Thursday', align: "center", date: "10/21" },
      {id: "fri", label: 'Friday', align: "center", date: "10/22" },
      {id: "sat", label: 'Saturday', align: "center", date: "10/23" },
      {id: "sun", label: 'Sunday', align: "center", date: "10/24" },
  ]

  

  useEffect( () => {
    let d = new Date()
      if (load.length > 0) {
        buildRows();
        console.log(date)
      } 

  },[load])

    return (
      <Container>
            <TableContainer sx={{maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: 120, padding:3 }}
                            >
                                {column.label} {column.date}
                            </TableCell>
                        ))}
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
`
const ShiftBanner = styled.div`
  font-weight: 600;
  background-color: #228B22;
  width: 100%;
  cursor: default;
`
const Filter = styled.div`

`