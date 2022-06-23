import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function CallinWiz({filtered, handleChange, filled, options}) {

    const [{formObj, shifts}, dispatch] = useAuthState()
    const [filledRef, setFilledRef] = useState(filled)

    useEffect(() => {
        console.log(filled)
        setFilledRef(filled)
        filled.forEach(i => {
            // document.getElementById(i.toString()).hidden = true
        })
    },[filled])

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
                    key={user.id}
                    style={styles.select}
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="" hidden > - Select - </option>
                        {options &&
                            options.map((option,i) => {
                                if (i > 3) {
                                    return (
                                        <option 
                                        value={i}
                                        key={i}
                                        id={i}
                                        // hidden={filledRef.includes(i)}
                                        > {option} </option>
                                    )
                                }
                                return (
                                    <option value={i}> {option} </option>
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