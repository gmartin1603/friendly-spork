import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, input } from '../context/style/style';
import FormInput from './FormInput';
import DayBox from './inputs/DayBox';
import FormInputCont from './inputs/FormInputCont';
import Select from './inputs/Select';

 

function MiscForm() {
    const initialState = {
        job: '',
        shift: -1,
        down: 0,
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {},
        sun: {},
    }

    const [{formObj,colors, errors, profile, shifts},dispatch] = useAuthState()
    
    const [disabled, setDisabled] = useState(true)
    const [downDate, setDownDate] = useState('')
    const [postTag, setPostTag] = useState({
        name: '',
        reason: 'Vacation',
        color: 'white'
    })
    const [state, setState] = useState(initialState)

    useEffect(() => {
        // console.log(shifts[formObj.shift].segs)
        if (formObj.options) {
            setState((prev) => ({...prev, shift: formObj.shift}))
            setPostTag((prev) => ({...prev, color: ''}))
        }
        else if (formObj.pos) {
            setState((prev) => ({...prev, job:formObj.pos.id,shift:formObj.shift}))
        }
    },[formObj])

    const validate = () => {
        let validated = true
        let arr = []
        if (!formObj.options && !postTag.name) {
            validated = false
        }

        if (state.down > 0) {
            if (formObj.modify) {
    
            } else if (formObj.modify && formObj.filled) {
    
            } else {
                Object.keys(state).forEach(key => {
                    if (state[key].id) {
                        arr.push(state[key].id)
                        if (Object.keys(state[key].seg).length === 0) {
                            validated = false
                        } 
                        else if (state[key].slots > 1) {
                            state[key].seg.one.segs.map((slot,i) => {
                                if (!shifts[state.shift].segs.three) {
                                    console.log(slot)
                                    if (!slot.name && !state[key].seg.two.segs[i].name) {
                                        validated = false
                                    }
                                } else {
                                    if (!slot.name && !state[key].seg.two.segs[i].name && !state[key].seg.three.segs[i].name) {
                                        validated = false
                                    }

                                }
                            })
                        }

                    }
                })
            }
        } else {
            validated = false
        }

        if (arr.length < 1) {
            validated = false
        }

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const handleChange = (e) => {

        if (e.target.id === "job") {
            setState((prev) => (
                {...prev, job: e.target.value}
            ))
            
        } else if (e.target.id === "date"){
            
            if (e.target.value) {
                const num = new Date(e.target.value).getTime() + (24*60*60*1000)
                if (num >= formObj.cols[6].label) {
                    let newDown = formObj.cols[6].label - (24*60*60*1000)
                    setState(prev => ({...prev, down: newDown}))
                } else {
                    // console.log(new Date(num))
                    setState(prev => ({...prev, down: num}))
                }
            } else {
                setState(prev => ({...prev, down: 0}))
            }
        } else {
            setPostTag((prev) => (
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
                ))
        }
    }


    useEffect(() => {
        // console.log("State: " , state)
        // console.log(state.down)
        if (state.down > 0) {
            const date = new Date(state.down)
            let month = date.getMonth() + 1
            let day = date.getDate()
            if (month < 10) {
                month = `0${month}`
            }
            if (day < 10) {
                day = `0${day}`
            }
            setDownDate(`${date.getFullYear()}-${month}-${day}`)
        } else {
            setDownDate("")
            if (errors.length > 0) {
                dispatch({
                    type: "SET-ARR",
                    name: "errors",
                    load: []
                })
            }
        }
        validate()
    }, [state, postTag])

    const buildSeg = (obj) => {
        const temp = shifts[state.shift].segs
        let name = "N/F"
        if (postTag.name) {
            name = postTag.name
        }
        
        for (const prop in temp) {
            if (prop !== "full") {
                if (obj[prop]?.segs) {
                    obj[prop].segs.map((slot,i) => {
                        console.log(slot)
                        if (!slot.name) {
                            obj[prop].segs[i].name = name
                        }
                    })
                } else {
                    if (!obj.hasOwnProperty(prop)) {
                        obj[prop] = {name: name, forced: false, traded: false}
                    }
                }
            }
        }
    
        return obj
    }

    const buildPosts = async () => {
        let posts = []
        for (const property in state) {
            if (state[property].id) {
                console.log(state[property])
                const segs = buildSeg(state[property].seg)
                if (postTag.name) {
                    // default cell value  
                    posts.push(
                        {
                            id: state[property].id,
                            seg: segs,
                            created: new Date(),
                            creator: profile.dName,
                            down: state.down - (9*60*60*1000),
                            color: postTag.color,
                            shift: state.shift,
                            pos: state.job,
                            date: state[property].date,
                            tag: postTag
                        }
                    )   
                } else {
                    // no default cell value
                    posts.push(
                        {
                            id: state[property].id,
                            seg: segs,
                            creator: profile.dName,
                            created: new Date().getTime(),
                            down: state.down - (9*60*60*1000),
                            color: postTag.color,
                            shift: state.shift,
                            pos: state.job,
                            slots: state[property].slots,
                            date: state[property].date,
                        }
                    )   
                }
            } 
        }
        return posts
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        const posts = await buildPosts()
        console.log(posts)
        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/setPost"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/setPost"
        const data = {
            // coll: 'messages',
            coll: `${formObj.dept.toString()}-posts`,
            data: posts,
        }
        const request = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
                'Credentials': 'include'
                
            },
            body: JSON.stringify(data)
        }
        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
        .then((res) => {
            console.log(res)
            close()
        })
        .catch((err) => {
            console.warn(err)
        })   
    }

    const close = () => {
        setState(initialState)
        dispatch({
            type: "CLOSE-FORM",
            name: "showWeek",
        })
    }
    
    const styles = {
        backDrop: ` h-full w-full min-w-max min-h-max overflow-auto fixed top-0 left-0 z-50 bg-clearBlack flex items-center justify-center `,
        main:`bg-gray-light w-max rounded border justify-center flex-column  p-.01`,
        headContainer:`bg-todayGreen text-center flex items-center justify-end  w-full border`,
        inputContainer:`h-max p-10 rounded my-10 flex justify-around  items-end bg-white border-2`,
        field:`font-bold text-xl mx-10 px-10`,
        option:`font-bold text-xl p-[5px]`,
        weekContainer:`w-max flex flex-wrap justify-around text-center  my-20`,
        submit:`${button.green} p-10 text-2xl`,
    }

    return (
        <div className={styles.backDrop} >
            <div className={styles.main}>
                <div className={styles.headContainer}>
                    <h1 
                    className={`w-.8 text-2xl font-bold`}
                    >
                        {`Post by Week ${shifts[formObj.shift].label} Shift`}
                    </h1>
                    <div 
                    className={`${button.redText}`}
                    onClick={() => close()}
                    >
                        <p>Close</p>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    {
                        formObj.pos?
                        <FormInput 
                        type="text"
                        style={styles.field} 
                        width=".25"
                        label="Position" 
                        disabled={formObj.pos? true : false} 
                        value={formObj.pos? `${formObj.pos.label} ${shifts[formObj.shift].label} Shift`: ''}
                        
                        />
                        :
                        <>
                        {
                            formObj.options &&
                        <Select label="Position"
                        width=".25"
                        setValue={handleChange} 
                        name="job" 
                        id="job" 
                        > 
                        <option value="" hidden> Select Job </option>
                        { formObj.options.length > 0?
                            formObj.options.map((job,i) => {
                                if (job[shifts[formObj.shift].id]) {
                                    return (
                                        <option 
                                        value={job.id} 
                                        key={job.id} 
                                        className={styles.option}
                                        >
                                        {`${job.label}`}  
                                        </option>
                                    )
                                }
                            })
                            :
                            <option value="" >No Misc Jobs Created</option>
                        }
                        </Select>
                        }
                        </>
                    }
                    
                    <FormInputCont
                    styling={styles.field}  
                    label='Down Date'
                    valiTag={state.down === 0? "*Required":undefined}
                    >
                        <input 
                        className={input.text}
                        type="date"
                        id="date"
                        name="downDate"
                        disabled={formObj.modify && state.down <= new Date().getTime()}
                        value={downDate}
                        onChange={(e) => handleChange(e)}
                        />
                    </FormInputCont>
                        {
                            formObj.pos && formObj.pos.group !== "misc" &&
                            <>
                            <Select label="Color"
                            width=".25"
                            color={postTag.color}
                            value={postTag.color} 
                            setValue={(e) => {handleChange(e)}} 
                            name="color" 
                            id="color" 
                            > 
                            <option value="white" style={{backgroundColor:'white'}}>White</option>
                            {
                                Object.keys(colors).map((i) => {
                                    
                                    return (
                                    <option value={colors[i]} key={colors[i]}  style={{backgroundColor:colors[i]}} >
                                    {i}  
                                    </option>
                                )})
                            }
                            </Select>
                            <FormInputCont
                            styling={styles.field}  
                            label='Tag Name'
                            valiTag={!postTag.name? "*Required":undefined}
                            >
                                <input 
                                className={input.text}
                                type="text"
                                name="name"
                                value={postTag.name}
                                onChange={(e) => handleChange(e)}
                                />
                            </FormInputCont>
                            <FormInput 
                            style={styles.field}
                            type="text" 
                            label="Tag Reason"
                            name="reason"
                            setValue={handleChange}
                            value={postTag.reason}
                            
                            />
                            </>
                        }
                    </div>
                    <div className={styles.weekContainer}>
                        {
                            formObj.cols && 
                            state.job &&
                            state.shift >= 0 &&
                            state.down > 0 &&
                            formObj.cols.map((col,i) => (
                                <DayBox
                                key={col.tag}
                                label={col.label}
                                valiTag={state.down >= col.label? `*Select a Down Date before:`:undefined}
                                segments={shifts[formObj.shift].segs}
                                day={col.tag.slice(0,3).toLowerCase()}
                                state={state}
                                setState={setState}
                                modify={formObj.modify}
                                disabled={state.down >= col.label}
                                color={ i % 2 == 0? 'green':'todayGreen'}
                                />
                            ))
                        }  
                    </div>
                    <div className={styles.errors}>
                        {
                            errors.length > 0 &&
                            errors.map(error => (
                                <p className={styles.error + error.type > 0? "bg-clearRed":"bg-clearYellow"}>
                                    {error.message}
                                </p>
                            ))
                        }    
                    </div>   
                <div className={`flex justify-center`}>
                    {
                        state.job.length > 0 &&
                        <button 
                        className={styles.submit}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >Create Postings</button>
                    }    
                </div>
            </div>    
        </div>
    );
}

export default MiscForm;



