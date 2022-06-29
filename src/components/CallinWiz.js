import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import '../CallIn.css';

function CallinWiz({state, handleChange, force}) {

    const [{formObj, filtered, shifts, options}, dispatch] = useAuthState()

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
            margin: "0px 10px",
            color: "black",
        },
    }
    return (
        <div style={styles.main} >
            {filtered.map((user,i) => {
                
                return user.eligible && (
                <div
                className="row"
                style={styles.row}
                key={`main ${user.id}`}
                id={`main ${user.id}`}
                >
                    <p key={`name ${user.id}`} style={styles.p}> {user.dName} </p>
                    <p key={`phone ${user.id}`} style={styles.p}> {user.phone} </p>
                    { user.called &&
                        <p key={`called ${user.id}`} style={styles.p}>Time: {new Date(user.called).toLocaleTimeString()} </p>
                    }
                    
                    <select 
                    name="answer" 
                    id={user.id}
                    key={`select ${user.id}`}
                    style={styles.select}
                    value={user.answer}
                    disabled={i > 0? filtered[i-1].disableNext:false}
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
                                        hidden={option.hidden}
                                        disabled={option.filled}
                                        > {option.value} </option>
                                    )
                                }
                                return (
                                    <option key={i} value={i}> {option.value} </option>
                                )
                            })
                        }
                    </select>
                </div>
            )}
            )}
        </div>
    );
}

export default CallinWiz;