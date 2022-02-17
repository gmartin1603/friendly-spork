import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';
import PopUpForm from './PopUpForm';
import Row from './Row';


function Schedual() {

  const {profile, rows} = useAuthState()
  
  const [mobile, setMobile] = useState(true)

  const [crush, setCr] = useState(false)

  const [count, setCount] = useState(0)
  const [day, setDay] = useState(0)
  
  const [weekNum, setWeekNum] = useState(1)
  const [cols, setCols] = useState([])
  
  const [rota, setRota] = useState()
  
  
  const today = new Date();
  const crushStart = new Date('September 20, 2021') //week 1
  const crushRota = 16 //weeks
  const csstStart = new Date('January 10, 2022') //week 1
  const csstRota = 12 //weeks
  
  useEffect(() => {
    rows &&
    setRota(rows[0]);
      
    },[rows])


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
    // console.log(Math.ceil(week * rotaLength))
    
    
  } 

  const nextWeek = () => {
    setCount(count + 7)
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

  const prevWeek = () => {
    setCount(count - 7)
    
    if(weekNum === 1) {
      if (crush) {
        setWeekNum(16)
      } else {
        setWeekNum(12)
      }
    } else {
      setWeekNum(weekNum - 1)
    }
  }

  
 
  const buildRows = (shift, i, key, color) => {
    if (rota) {
      console.log(rota)
        return (
          <TableBody>
            <TableRow >
              <TableCell style={{backgroundColor: color, borderColor: 'black'}}>
                <h3 >
                  {shift}
                </h3>
              </TableCell>
            </TableRow>
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
                        mobile={mobile}
                        day={today.getDay() + day}
                        // posts={posts[obj.id]}
                        />
                  ) 
                }
              })
            }   
          </TableBody>
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
      {tag: "position",id: 0, label: 'Position', align: "center", },
      {tag:'mon', id: 1, label: mon + (day * count),  align: "center", },
      {tag:'tue', id: 2, label: (mon + day) + (day * count), align: "center", },
      {tag:'wed', id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
      {tag:'thu', id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
      {tag:'fri', id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
      {tag:'sat', id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
      {tag:'sun', id: 7, label: (mon + (day * 6)) + (day * count) , align: "center", },
    ]
    setCols(columns)
  }

  useEffect(() => {
    findWeek()
    setCount(0)
  },[crush])
  

  useEffect(() => {
    buildColumns()
   
  }, [count])

    return (
      <Container>
         {/* <PopUpForm
          show={state.showForm}
          type={"posting"}
            /> */}
           
            <TableContainer >

            <Table stickyHeader size="small" aria-label="Schedual">
                <TableHead>
                    <TableRow style={{borderColor: 'black'}}>
                      {
                        cols.map((column) => {
                          if (column.tag === "position") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                   minWidth: 120, 
                                   padding:'1%', 
                                   backgroundColor: 'rgb(27, 102, 15, 0.7)',
                                  borderColor: 'black'
                                  }}
                              >
                                  {column.label}
                              </TableCell>
                            )
                          }
                          if (column.id === today.getDay() && count === 0) {
                            return (
                              <TableCell
                                key='today'
                                align={column.align}
                                style={{ 
                                  minWidth: 120, 
                                  padding:'0%', 
                                  backgroundColor: '#228B22',
                                  color: "#FFFFF0",
                                  borderColor: 'black',
                                  borderTopLeftRadius: '5px',
                                  borderTopRightRadius: '5px',
                                  boxShadow: ['-.2rem -.5rem 5px rgb(27, 102, 15, 0.9)' ,'.1rem .1rem 10px rgb(27, 102, 15, 0.9)']
                                  // boxShadow: '-.5rem -.8rem 10px rgb(27, 102, 15, 0.7), .2rem .2rem 10px rgb(27, 102, 15, 0.7)'
                                }}
                                >
                                {new Date(column.label).toDateString()}
                            </TableCell>
                            )
                          } else {
                            return mobile? '' : (
                              <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ 
                                minWidth: 120, 
                                padding:'0%', 
                                backgroundColor: 'rgb(27, 102, 15, 0.7)',
                                borderColor: 'black' 
                              }}
                              >
                                  {new Date(column.label).toDateString()}
                              </TableCell>
                            )
                          }
                      })}
                    </TableRow>
                </TableHead>
                {buildRows('1st Shift', 0, 'first', '#90E8E9')}
                {buildRows('2nd Shift', 1, 'second', '#90A5E9')}
                {buildRows('3rd Shift', 2, 'third', '#9BDE56')}
            </Table> 
            </TableContainer>
            <ArrowBox>        
              <Button variant="contained" onClick={() => prevWeek()}> prev week </Button> 
              <Button variant="contained" onClick={() => setMobile(!mobile)}> {mobile? 'View Full':'View Mobile'} </Button> 
                    
              <Button variant="contained" onClick={() => nextWeek()}> Next Week </Button>  
            </ArrowBox>
            
            


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
            </Container>
    );
}

export default Schedual;

const Container = styled.div`
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid;
  border-color: rgb(27, 102, 15, 0.7);
  border-radius: 10px;
  box-shadow: 0px 2px 5px;

  @media(max-width: 1000px) {
    .full--schedual {
      display: none;
    }
  }
  @media(min-width: 1000px) {
    .mobile--schedual {
      display: none;
    }
  }
`

const Filter = styled.div`

`
const ArrowBox = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    background-color: #228B22;
    margin: 0 5%;
  }
`