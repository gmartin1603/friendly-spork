import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function CallinWiz({filtered, state, handleChange}) {

    const [{formObj, shifts, options}, dispatch] = useAuthState()

    useEffect(() => {
        console.log(options)
    },[state])

    const styles = {
        main: {
            width: "100%",
            display: "flex",
            flexDirection: "column"
        },
        row:{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            margin: "5px",
            borderBottom: "2px solid black"
        },
        select:{
            height: "min-content"
        },
        p:{
            margin: "0",
        },
    }
    return (
        <div style={styles.main} >
            {filtered.map((user,i) => (
                <div
                style={styles.row}
                key={`main ${user.id}`}
                >
                    <p key={`name ${user.id}`} style={styles.p}> {user.dName} </p>
                    <p key={`phone ${user.id}`} style={styles.p}> {user.phone} </p>
                    
                    <select 
                    name="answer" 
                    id={user.id}
                    key={`main ${user.id}`}
                    style={styles.select}
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="" hidden > - Select - </option>
                        {options &&
                            options.map((option,i) => {
                                if (option.seg) {
                                    return (
                                        <option 
                                        value={i}
                                        key={i}
                                        id={i}
                                        disabled={option.filled}
                                        > {option.value} </option>
                                    )
                                }
                                return (
                                    <option value={i}> {option.value} </option>
                                )
                            })
                        }
                    </select>
                </div>
            ))}
        </div>
    );
}

export default CallinWiz;