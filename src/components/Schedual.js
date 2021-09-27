import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getData } from '../firebase/firestore';


function Schedual(props) {

  const [load, setLoad] = useState([])

  useEffect(() => {
    // Rows data from Firestore
    getData("Jobs", setLoad)
    
  },[])
  
  // console.log(load)

    // const shifts = [
    //     {ee: "Brian", label: "1st Shift Warehouse", id: "warehouse 7-11", },
    //     {ee: "Tony", label: "1st Shift ET Pack #1", id: "et pack1 7-11",  },
    //     {ee: "Lee", label: "1st Shift ET Pack #2", id: "et pack2 7-11", },
    //     {ee: "Russ", label: "1st Shift Flour Pack", id: "flour pack 7-11", },
    //     {ee: "Jason", label: "1st Shift Bulk Bag", id: "bulk bag 7-11", },
    //     {ee: "George", label: "2nd Shift ET Pack #1", id: "et pack1 3-11", },
    //     {ee: "DJ ", label: "2nd Shift ET Pack #2" , id: "et pack2 3-11", },
    //     {ee: "Matt", label: "2nd Shift Flour Pack", id: "flour pack 3-11", },
    //     {ee: "James", label: "2nd Shift Bulk Bag" , id: "bulk bag 3-11", },
    //     {ee: "Brent", label: "3rd Shift ET Pack #1" , id: "et pack1 11-7", },
    //     {ee: "Rusty", label: "3rd Shift ET Pack #2" , id: "et pack2 11-7", },
    //     {ee: "Luis", label: "3rd Shift Flour Pack" , id: "flour pack 11-7",},
    //     {ee: "Becky", label: "3rd Shift Bulk Bag" , id: "bulk bag 11-7", },
    // ]
    
    const columns = [
        {id: "position", label: 'Position', align: "center", },
        {id: "mon", label: 'Monday',  align: "center", },
        {id: "tues", label: 'Tuesday', align: "center", },
        {id: "wed", label: 'Wednesday', align: "center", },
        {id: "thur", label: 'Thursday', align: "center", },
        {id: "fri", label: 'Friday', align: "center", },
        {id: "sat", label: 'Saturday', align: "center", },
        {id: "sun", label: 'Sunday', align: "center", },
    ]

    

    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
  
    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(+event.target.value);
    //   setPage(0);
    // };

    const findCell = (pos, day) => {
      let column = undefined
      let row = undefined
      
      columns.map((col) => {
        if (col.id === day) {
  
          // returns index of cell as a number
          column = columns.indexOf(columns[columns.indexOf(col)])
  
          return column
  
          // console.log(columns.indexOf(columns[columns.indexOf(col)]))
        } 
        
        load.map((roww) => {
          // console.log(typeof pos)
          if (`${roww.job} ${roww.start}-${roww.end}` === pos) {
            // returns index of cell as a number
            row = load.indexOf(load[load.indexOf(roww)])
            
            return row
            
            // console.log(columns.indexOf(columns[columns.indexOf(col)]))
          } 
        })
        })
        return {row, column}
    }
    

    const handleClick = (pos, day) => {
      
      let cell = findCell(pos, day)
      let ee = load[cell.row]
      // value of ee at cell
      console.log(ee)

      load.map((row) => {

        if (load.indexOf(row) === cell.row) {
          // setLoad(...load, load[cell.row]: newCell)
        }
      })

      
      // console.log(cell)
    }


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
                            style={{ minWidth: 100, padding:3 }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                
                    {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}

                <TableBody>
                    {
                      load.map((row) => {
                        return (
                          <TableRow role="checkbox" tabIndex={-1} key={row.job}>
                            
                            {columns.map((column) => {
                              let value = undefined
                              let align = "center"
                              let click = undefined
                              let cursor = "default"

                              if (column.id === "position") {
                                value = row.job + " " + row.start + "-" + row.end;
                                align = "left"
                              } else {
                                cursor = "pointer"
                                value = row.ee
                                click = () => handleClick(row.job + " " + row.start + "-" + row.end, column.id)
                              }
                              
                              // console.log(row)

                              return (
                                <TableCell 
                                  key={row.job + column.id} 
                                  align={align}
                                  style={{ fontSize: 15, padding: 2, cursor}}
                                  onClick={click} //returns cell info
                                  >
                                  {
                                    value
                                  }
                                </TableCell>
                              );
                            })
                            }
                          </TableRow>)
                      })
                    }
                  
                </TableBody>


                
            </Table> 
            </TableContainer>
            </Container>
    );
}

export default Schedual;

const Container = styled.div`
  
`