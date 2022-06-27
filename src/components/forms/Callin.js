import React, {useEffect, useRef, useState} from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import '../../CallIn.css';
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
    const [{formObj, shifts, users, view, options, filtered}, dispatch] = useAuthState()

    const [state, setState] = useState(initialState)
    const [step, setStep] = useState(1)
    const [segSel, setSegSel] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [disablePrev, setDisablePrev] = useState(false)
    const [filled, setFilled] = useState(false)
    const [fill, setFill] = useState(false)

    // useEffect(() => {
    //     console.log()
    // },[])
 
    const closeForm = (e) => {
        dispatch({
            type: "CLOSE-FORM",
            name: "showCallin"
        })
    }

    const updateContext = (type, name, load) => {
        dispatch({
            type: type,
            name: name,
            load: load
        })
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

    const handleSegChange = (value, rowRef, arr) => {
        let newSeg = {}
        if (arr.at(value).seg) {
            if (arr.at(value).seg === "full") {
                for (const key in state.seg) {
                    newSeg[key] = {...state.seg[key], name: rowRef.dName}
                }
            } else {
                arr.forEach(option => {
                    if (option.seg === "full") {
                        option.filled = true
                    }
                })
                for (const key in state.seg) {
                    if (key === arr.at(value).seg) {
                        newSeg[key] = {...state.seg[key], name: rowRef.dName}
                    } else {
                        newSeg[key] = state.seg[key]
                    }
                }
            }
        }
        
        if (rowRef.answer) {
            if (rowRef.answer.seg) {
                options.map((option,i) => {
                    if (option.seg === rowRef.answer.seg) {
                        arr.at(i).filled = false
                    }
                })
                if (rowRef.answer.seg === "full") {
                    for (const key in state.seg) {
                        newSeg[key] = {...state.seg[key], name: ''}
                    }
                } else {
                    let filledSegs = 0
                    for (const key in state.seg) {
                        if (key === rowRef.answer.seg) {
                            newSeg[key] = {...state.seg[key], name: ''}
                        } else {
                            if (state.seg[key].name) {
                                filledSegs = filledSegs + 1
                            }
                            newSeg[key] = state.seg[key]
                        }
                    }
                    if (filledSegs === 0) {
                        arr.forEach(option => {
                            if (option.seg === "full") {
                                option.filled = false
                            }
                        })
                    }
                }
            }
        }
        if (Object.keys(newSeg).length === 0) {
            newSeg = state.seg
        }
        return newSeg
    }

    const handleChange = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        // console.log(state.rows[e.target.id])

        switch (e.target.name) {
            case "answer":
                const value = parseInt(e.target.value)
                const rowRef = state.rows[e.target.id]
                let arr = options 
                const obj = {
                    ...state.rows, 
                    [e.target.id]:{
                        ...state.rows[e.target.id], 
                        answer: arr.at(value),
                    }
                }

                const newSeg = handleSegChange(value, rowRef, arr)
                let next = true
                let filled = true
                for (const key in newSeg) {
                    console.log(newSeg[key].name)
                    if (newSeg[key].name.length === 0) {
                        next = false
                        filled = false
                    }
                }
                setFilled(filled)

                let newFiltered = []
                
                let eligible = true
                // if (options[value].key === "ne") {
                //     eligible = false
                // }

                filtered.map((user,i) => {
                    if (user.id === e.target.id) {
                        newFiltered.push({
                            ...user, 
                            disableNext: next,
                            called:new Date(),
                            answer: value,
                            eligible: eligible,
                        })
                        if (i === 0) {
                            setDisablePrev(true)
                        }
                    } else {
                        newFiltered.push(user)
                    }
                })

                if (value > 3) {
                    arr.at(value).filled = true
                    // console.log(arr.at(value))
                }
                
                if (newSeg) {
                    setState(prev => ({...prev, seg: newSeg, rows: obj}))
                } else {
                    setState(prev => ({...prev, rows: obj}))
                }
                updateContext("SET-ARR", "options", arr)
                updateContext("SET-ARR", "filtered", newFiltered)
                break
            default:
                console.log("handleChange switch default")
        }
        
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
            setDisablePrev(false)
            num = num + 1
        } else if (e.target.id < 0) {
            setDisablePrev(true)
            num = num - 1
        } else {
            setDisablePrev(!disablePrev)
            setFill(!fill)
        }

        if (num > 1) {
            sortFiltered(filtered)
            if (num === 4) {
                sortFiltered(filtered, true)
            }
        }
        return setStep(num)
        
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    // init users
    useEffect(() => {
        let arr = []
        let obj = {}
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
                                eligible:true, 
                                disableNext: true,
                                answer:'',
                            })
                            obj[user.id] = {
                                dName: user.dName, 
                                phone: user.phone, 
                                eligible:true, 
                                startDate: user.startDate,
                                answer:{}
                            } 
                        }
                    }
                }  
            })
            // console.log(arr)
            updateContext("SET-ARR", "filtered", arr)
            setState(prev=> ({...prev, rows: obj}))
        }
    },[users])

    // next step init
    useEffect(() => {
        let arr = []
        filtered.map(user => {
            const answer = state.rows[user.id].answer.key
            if (step === 3) {
                if (answer === "12hrs") {
                    
                    arr.push({...user, eligible:true})
                } else {
                    arr.push({...user, eligible:false})
                }
            } else if (step === 4) {
                if (answer !== ("12hrs" || "ne")) {
                    arr.push({...user, eligible:true})
                } else {
                    arr.push({...user, eligible:false})
                }
            } else {
                arr.push(user)
            } 
        })
        if (arr.length > 0) {
            sortFiltered(arr),
            updateContext("SET-ARR", "filtered", arr)
        }
        console.log(step)
    },[step])
    
    // init
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
    
    // validate
    useEffect(() => {
        console.log("STATE:", state)
        validate()
    },[state])
    
    //options init
    useEffect(() => {
        validate()
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
        let arr = [
            {value:"No", filled: false}, 
            {value:"No Answer", filled: false}, 
            {value:"Left Message", filled: false}, 
            {value:"Not Eligible", filled:false, key:"ne"},
        ]
        const shift = shifts[formObj.shift]
        for (const key in shift.segs) {
            // console.log(key)
            if (key === "full") {
                if (segSel.length > 1) {
                    arr.push({value:`All ${(segSel.length) * 4} Hours`, filled: false, seg: key})
                }
            } else if (segSel.includes(key)) {
                arr.push({value:shift.segs[key], filled: false, seg: key})
                if (step < 3) {
                    arr.push({value:`${shift.segs[key]}, but on 12 hrs`, filled:false, key:"12hrs"})
                }
            }
        }
        updateContext("SET-ARR", "options", arr)
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
                { fill?
                    <div >
                        { Object.keys(state.seg).map(key => {
                            return (
                                <p>{` ${shifts[formObj.shift].segs[key]} ${state.seg[key].name}`} </p>
                            )
                        })}
                    </div>
                    :
                    <>
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
                            defaultValue={new Date(formObj.date).toDateString()}
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
                                            key={seg}
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
                            options={options}
                            handleChange={handleChange}
                            state={state}
                            />
                        </>
                    }{ step === 3 && 
                        <>
                            <h3 style={styles.h3}> Already on 12hrs call back </h3>
                            <CallinWiz
                            filtered={filtered}
                            options={options}
                            handleChange={handleChange}
                            state={state}
                            />
                        </>
                    }{ step === 4 && 
                        <>
                            <h3 style={styles.h3}> 2nd Call (Force) </h3>
                            <CallinWiz
                            filtered={filtered}
                            options={options}
                            handleChange={handleChange}
                            state={state}
                            force={true}
                            />
                        </>
                    }
                    </>
                }
                <div style={styles.btnCont}>
                    { step > 1 && 
                        <button 
                        style={{...styles.submit, backgroundColor: disablePrev? "grey" : "green", cursor: disablePrev? "none":"pointer"}}
                        onClick={(e) => handleStepChange(e)}
                        id={-1}
                        disabled={disablePrev}
                        >
                            Prev Step
                        </button>
                    }
                    { filled ?
                        <button 
                        style={disabled? styles.disabled : styles.submit}
                        onClick={(e) => handleStepChange(e)}
                        id={0}
                        disabled={disabled}
                        >
                            {"Fill"}
                        </button>
                        :
                        <button 
                        style={disabled? styles.disabled : styles.submit}
                        onClick={(e) => handleStepChange(e)}
                        id={1}
                        disabled={disabled}
                        >
                            {step > 1? "Next Step" : "Continue"}
                        </button>
                    }
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