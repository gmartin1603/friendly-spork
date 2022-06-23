import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function CallinWiz({filtered, handleChange, state}) {

    const [{formObj, shifts}, dispatch] = useAuthState()

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
                key={user.id}
                >
                    <p style={styles.p}> {user.dName} </p>
                    <p style={styles.p}> {user.phone} </p>
                    
                    <select 
                    name="answer" 
                    id={user.id}
                    style={styles.select}
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="" hidden > - Select - </option>
                        <option value="3" > All </option>
                        <option value="2" > 1st half </option>
                        <option value="3" > 2nd half </option>
                        <option value="3" > 1st half, but on 12 hrs </option>
                        <option value="3" > 2nd half, but on 12 hrs </option>
                        <option value="4" > No </option>
                        <option value="3" > Not Eligible </option>
                        <option value="3" > Left Message </option>
                        <option value="3" > No Answer </option>
                    </select>
                </div>
            ))}
        </div>
    );
}

export default CallinWiz;