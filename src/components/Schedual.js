import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getData } from '../firebase/firestore';


function Schedual(props) {

  useEffect(() => {
    getData("Jobs")
  })

  // Rows
    const shifts = [
        {ee: "Brian", label: "1st Shift Warehouse", id: "warehouse 7-11", },
        {ee: "Tony", label: "1st Shift ET Pack #1", id: "et pack1 7-11",  },
        {ee: "Lee", label: "1st Shift ET Pack #2", id: "et pack2 7-11", },
        {ee: "Russ", label: "1st Shift Flour Pack", id: "flour pack 7-11", },
        {ee: "Jason", label: "1st Shift Bulk Bag", id: "bulk bag 7-11", },
        {ee: "George", label: "2nd Shift ET Pack #1", id: "et pack1 3-11", },
        {ee: "DJ ", label: "2nd Shift ET Pack #2" , id: "et pack2 3-11", },
        {ee: "Matt", label: "2nd Shift Flour Pack", id: "flour pack 3-11", },
        {ee: "James", label: "2nd Shift Bulk Bag" , id: "bulk bag 3-11", },
        {ee: "Brent", label: "3rd Shift ET Pack #1" , id: "et pack1 11-7", },
        {ee: "Rusty", label: "3rd Shift ET Pack #2" , id: "et pack2 11-7", },
        {ee: "Luis", label: "3rd Shift Flour Pack" , id: "flour pack 11-7",},
        {ee: "Becky", label: "3rd Shift Bulk Bag" , id: "bulk bag 11-7", },
    ]
    
    const columns = [
        {id: "position", label: 'Position', align: "center", },
        {id: "mon", label: 'Monday',  align: "center", },
        {id: "tues", label: 'Tuesday', align: "center", },
        {id: "wed", label: 'Wednesday', align: "center", },
        {id: "thur", label: 'Thursday', align: "center", },
        {id: "fri", label: 'Friday', align: "center", },
        {id: "sat", label: 'Satday', align: "center", },
        {id: "sun", label: 'Sunday', align: "center", },
    ]

    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

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

                {/* ************START HERE*************** */}
                    {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}

                <TableBody>
                    {
                      
                      shifts.map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={"column.id"}>
                            
                            {columns.map((column) => {
                              let value = ""
                              let align = "center"

                              if (column.id === "position") {
                                value = row.label;
                                align = "left"
                              } else (
                                value = row.ee
                              )
                              
                              console.log(value)
                              return (
                                <TableCell 
                                  key={column.id} 
                                  align={align}
                                  style={{ fontSize: 15, padding: 2}}
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
  TableCell {
    maxHieght: 10px;
  }
`