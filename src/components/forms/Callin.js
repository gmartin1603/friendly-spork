import React, {useEffect, useRef, useState} from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import style, { button } from '../../context/style/style';
import CallinWiz from '../CallinWiz'

function Callin(props) {
    const initialState = {
        id: '',
        shift: -1,
        norm: '',
        pos: '',
        // seg: {},
        date: 0,
        color:'',
        tag: {name: '', reason: "Call-In"},
        creator:'',
    }
    const [{formObj, shifts, users, view}, dispatch] = useAuthState()

    const [state, setState] = useState(initialState)
    const [step, setStep] = useState(1)
    const [segSel, setSegSel] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [filtered, setFiltered] = useState([])
 
    const closeForm = (e) => {
        dispatch({
            type: "CLOSE-FORM",
            name: "showCallin"
        })
    }

    const validate = () => {
        let validated = true
        switch (step) {
            case 1:
                if (segSel.length === 0) {
                    validated = false
                }
                break
            default:
                // validated = false
        }

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        console.log(state.rows[e.target.id].eligible)
    }

    const handleClick = (e) => {
        e.preventDefault()
        let arr = []
        if (segSel.includes(e.target.name)) {
            segSel.forEach(seg => {
                if (seg !== e.target.name) {
                    arr.push(seg)
                }
            })
        } else {
            arr = [...segSel, e.target.name]
        }
        return setSegSel(arr)
    }

    const handleStepChange = (e) => {
        e.preventDefault()
        let num = step
        if (e.target.id > 0) {
            num = num + 1
        } else {
            num = num - 1
        }

        if (num === 2) {
            sortFiltered(filtered)
        } else {
            sortFiltered(filtered, true)
        }
        return setStep(num)
    }

    const sortFiltered = (arr, force) => {
        if (arr) {
            if (force) {
                arr.sort((a, b) => {
                    if (a.startDate > b.startDate) {
                        return -1
                    }
                    if (a.startDate < b.startDate) {
                        return 1
                    }
                    // if (a === b)
                    return 0
                })
            } else {
                arr.sort((a, b) => {
                    if (a.startDate < b.startDate) {
                        return -1
                    }
                    if (a.startDate > b.startDate) {
                        return 1
                    }
                    // if (a === b)
                    return 0
                })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    useEffect(() => {
        let arr = []
        let obj = []
        if (users) {
            users[view[0].dept].map(user => {
                if (user.role === "ee") {
                    if (user.dName !== formObj.norm) {
                        if (user.quals.includes(formObj.pos.id)) {
                            arr.push({
                                dName: user.dName, 
                                phone: user.phone, 
                                startDate: user.startDate,
                                id: user.id,
                            })
                            obj[user.id] = {
                                dName: user.dName, 
                                phone: user.phone, 
                                eligible:true, 
                                startDate: user.startDate,
                                answer:''
                            } 
                        }
                    }
                }  
            })
            setFiltered(arr)
            setState(prev=> ({...prev, rows: obj}))
        }
    },[users])

    useEffect(() => {
        let arr = []
        filtered.map(user => {
            if (step > 2) {
                if (state.rows[user.id].eligible) {
                    arr.push(user)
                }
            } else {
                arr.push(user)
            } 
            return setFiltered(arr)
        })
    },[step])

    useEffect(() => {
        console.log(formObj)
        setState(prev => ({
            ...prev,
            shift: formObj.shift,
            norm: formObj.norm,
            pos: formObj.pos.id,
            date: formObj.date,
        }))
    },[formObj])

    useEffect(() => {
        console.log("STATE:", state)
        validate()
    },[state, segSel])
    
    useEffect(() => {
        let obj = {}
        if (state.seg) {
            for (const key in state.seg) {
                if (!segSel.includes(key)) {
                    if (formObj.norm) {
                        obj[key] = {...state.seg[key], name: formObj.norm}
                    } else {
                        obj[key] = {...state.seg[key], name: "N/F"}
                    }
                } else {
                    obj[key] = {...state.seg[key], name: ''}
                }
            }
        } else {    
            for (const key in shifts[formObj.shift].segs) {
                if (key !== "full") {
                    obj[key] = {name:'', forced: false, trade: false}
                }
            }
        }
        setState(prev => ({...prev, seg: obj}))
    },[segSel])

    const styles = {
        head:`flex justify-between items-start`,
        backDrop: ` h-screen w-full fixed top-0 left-0 z-50 bg-clearBlack flex items-center justify-center `,
        h3:{
            color: "black",
            fontSize: "110%",
            textDecoration: "underline wavy",
            textUnderlineOffset: "5px"
        },
        h1:{
            margin: "0"
        },
        main:{
            backgroundColor: "rgb(9, 0, 12, .8)",
            width: "100%",
            height: "max-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        },
        field:{
            color: "black",
            fontWeight: "600", 
            fontSize: "110%", 
            backgroundColor: "white", 
            borderTop: "none",
            borderRight: "none", 
            borderBottom: "2px solid black",
            borderLeft: "1px solid black",
            textAlign: "center" 
        },
        btnCont:{
            width:"80%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent:"space-around",
            margin: "10px",
        },
        segBtn:{
            height:"min-content",
            width: "max-content",
            backgroundColor: "green",
            border:"2px, solid",
            color:"white",
            fontSize:"100%",
            padding: "5px",
            marginTop: "10px"
        },
        submit:{
            height:"min-content",
            width: step > 1? "50%":"100%",
            backgroundColor: "green",
            border:"2px, solid",
            color:"white",
            fontSize:"100%",
            padding: "5px",
            marginTop: "10px"
        },
        default:{
            height:"min-content",
            width: "max-content",
            backgroundColor: "grey",
            border:"2px, solid",
            color:"white",
            fontSize:"100%",
            padding: "5px",
            marginTop: "10px"
        },
        disabled:{
            height:"min-content",
            width: step > 1? "50%":"100%",
            backgroundColor: "grey",
            border:"2px, solid",
            color:"white",
            fontSize:"100%",
            padding: "5px",
            marginTop: "10px",
            cursor: "none",
        },
        cancel:{
            height:"min-content",
            width: "100%",
            backgroundColor: "red",
            border:"2px, solid",
            color:"white",
            fontSize:"100%",
            padding: "5px",
            marginTop: "10px",
            marginBottom: "10px"
        },
        form: {
            color: "green", 
            backgroundColor: "white",
            padding:"10px", 
            margin: "10px",
            display: "flex", 
            flexDirection:"column", 
            alignItems:"center",
            width: "400px",
            minWidth: "max-content",
            height: "max-content",
        },
    }
    return (
        <div style={styles.main}>
            <div style={styles.form}>
                <div className={styles.head}>
                    <h1 style={styles.h1}>Call In Wizard</h1>
                </div>
                { step === 1 &&
                <>
                    <h3 style={styles.h3}>Start Call In</h3>
                    <label htmlFor="job">
                        <h3>Position</h3>
                        <input 
                        name="job"
                        type="text"
                        style={styles.field}
                        defaultValue={`${formObj.pos.label} - ${shifts[formObj.shift].label} Shift`}
                        disabled
                        />
                    </label>
                    <label htmlFor="date">
                        <h3>On</h3>
                        <input 
                        name="date"
                        type="text"
                        style={styles.field}
                        defaultValue={new Date(state.date).toDateString()}
                        disabled
                        />
                    </label>
                    <label htmlFor="name">
                        <h3>For</h3>
                        <input 
                        name="name"
                        type="text"
                        style={styles.field}
                        value={state.norm}
                        onChange={(e) => handleChange(e)}
                        disabled
                        />
                    </label>
                    <label htmlFor="reason">
                        <h3>Reason</h3>
                        <input 
                        label="Reason:"
                        type="text"
                        style={styles.field}
                        value={state.tag.reason}
                        onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <h3 className={styles.h3}>Hours to Fill</h3>
                    <div style={styles.btnCont}>
                        { 
                            Object.keys(shifts[formObj.shift].segs).map(seg => {
                                if (seg !== "full") {
                                    return (
                                        <button 
                                        style={segSel.includes(seg)? styles.segBtn: styles.default}
                                        onClick={(e) => handleClick(e)}
                                        name={seg}
                                        >
                                            {shifts[formObj.shift].segs[seg]}
                                        </button>
                                    )
                                }
                            })
                        }
                    </div>
                </>
                }{ step === 2 && 
                    <>
                        <h3 style={styles.h3}> 1st Call Through </h3>
                        <CallinWiz
                        filtered={filtered}
                        handleChange={handleChange}
                        state={state}
                        />
                    </>
                }{ step === 3 && 
                    <>
                        <h3 style={styles.h3}> 2nd Call Through </h3>
                        <CallinWiz
                        filtered={filtered}
                        handleChange={handleChange}
                        state={state}
                        force={true}
                        />
                    </>
                }
                <div style={styles.btnCont}>
                    { step > 1 && 
                        <button 
                        style={styles.submit}
                        onClick={(e) => handleStepChange(e)}
                        id={-1}
                        >
                            Prev Step
                        </button>
                    }
                    <button 
                    style={disabled? styles.disabled : styles.submit}
                    onClick={(e) => handleStepChange(e)}
                    id={1}
                    disabled={disabled}
                    >
                        {step > 1? "Next Step" : "Continue"}
                    </button>
                    <button style={styles.cancel}
                    onClick={(e) => closeForm(e)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Callin;