import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, input } from '../context/style/style';
import { createPost } from '../firebase/firestore';
import usePostsListener from '../helpers/postsListener';
import FormInput from './FormInput';
import FormInputCont from './inputs/FormInputCont';
import Select from './inputs/Select';
import SegInput from './SegInput';

//************* TODO ******************* */
// 2 button toggle for shift filling *Finish Styling
// 


function PopUpForm({shifts,dept}) {

    const [{formObj, profile, colors, errors}, dispatch] = useAuthState()
    
    const [downDate, setDownDate] = useState("")

    const [disabled, setDisabled] = useState(true)
    const [sel, setSel] = useState(false)
    const [modify, setModify] = useState(false)
    const [color, setColor] = useState('')
    const [postTag, setPostTag] = useState({name:'', reason:'Vacation', color:'white'})
    const [segs, setSegs] = useState({
        one: {name: '', forced: false, trade: false},
        two: {name: '', forced: false, trade: false},
        three: {name: '', forced: false, trade: false},
    })
    const initialState = {
        id: '',
        shift: -1,
        seg: {},
        norm: '',
        pos: '',
        date: 0,
        down: 0,
        color:'',
        tag: {},
        creator:'',
}

    const [state, setState] = useState(initialState)

    
    const validate = () => {
        let validated = false
        if (formObj.modify) {
            Object.keys(formObj.seg).forEach(key => {
                Object.keys(formObj.seg[key]).forEach(prop => {
                    if (state.seg[key][prop] === formObj.seg[key][prop]) {
                        console.log(key)
                        // validated = false
                    } else {
                        console.log(key)
                        validated = true
                    }
                })
            })
            if (formObj.color !== state.color) {
                validated = true
            }
            if (state.tag.reason !== formObj.tag.reason) {
                validated = true
            }
        } else {
            if (state.down > 0 && Object.keys(state.seg).length > 0) {
                validated = true
            } else {
            }
        }
        if (validated) {
            console.log("Validated: true")
            return setDisabled(false)
        } else {
            console.log("Validated: false")
            return setDisabled(true)
        }
    }

    const newPost = () => {
        let obj = {}
        Object.keys(shifts[formObj.shift].segs).map(key => {
            if (key !== "full") {
                obj[key] = {name: '', forced: false, trade: false, bids: []}
            }
        })
        if (formObj.norm) {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                creator: profile.dName,
                norm: formObj.norm,
                color: "white",
                tag: {name: formObj.norm, reason: "Vacation", color: "white"},
                shift: formObj.shift,
                seg: obj,
            }))
        } else {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                creator: profile.dName,
                shift: formObj.shift,
                seg: obj,
            }))
        }
    }

    const fillPost = () => {
        if (formObj.norm) {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                down: formObj.down,
                creator: formObj.creator,
                norm: formObj.norm,
                color: formObj.color,
                tag: {name: formObj.tag.name, reason: formObj.tag.reason, color: formObj.color},
                shift: formObj.shift,
                seg: formObj.seg,
            }))
        } else {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                down: formObj.down,
                creator: formObj.creator,
                shift: formObj.shift,
                seg: formObj.seg,
            }))
        }
    }

    const modifyPost = () => {
        if (formObj.norm) {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                down: formObj.down,
                creator: formObj.creator,
                norm: formObj.norm,
                color: formObj.color,
                tag: {name: formObj.tag.name, reason: formObj.tag.reason, color: formObj.color},
                shift: formObj.shift,
                seg: formObj.seg,
            }))
        } else {
            setState(prev => ({
                ...prev, 
                id: formObj.id,
                pos: formObj.pos.id, 
                date: formObj.date,
                down: formObj.down,
                creator: formObj.creator,
                shift: formObj.shift,
                seg: formObj.seg,
            }))
        }
        setSel(!sel)
    }

    const fill = (e) => {
        e.preventDefault()
        setState(prev => ({...prev, down: new Date().getTime()}))
        setSel(!sel)
    }
    
    const handleSegChange = (obj) => {
        let update = {...state.seg, [obj.name]: obj.load}
        setState(prev => ({...prev, seg: update}))
    }

    useEffect(() => {
        if (formObj.id) {
            console.log("formObj: " , formObj)
            if (formObj.modify) {
                if (formObj.filled) {
                    modifyPost()
                    setSel(!sel)
                } else {
                    fillPost()
                }
            } else {
                newPost()
            }
        }
    },[formObj])

    useEffect(() => {
        console.log("State: " , state)
        // console.log(downDate)
        if (state.down > 0) {
            const date = new Date(state.down)
            let month = date.getMonth() + 1
            if (month < 10) {
                month = `0${month}`
            }
            setDownDate(`${date.getFullYear()}-${month}-${date.getDate()}`)
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
        if (sel || !formObj.modify) {
            validate()
        }
    },[state])

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        let obj = {}
        
        if (state.seg[e.target.value]) {
            for (const i in state.seg) {
                if (i !== e.target.value) {
                    obj[i] = state.seg[i] 
                }
            } 
        } else {
            // obj[e.target.value] = {name: '', forced: false, trade: false}
            obj = {...state.seg, [e.target.value]: {name: '', forced: false, trade: false}}
        }
    
        
        return setState(prev => ({...prev, seg: obj}))
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        switch (e.target.name) {
            case "tag":
                let update = state.tag
                update[e.target.id] = e.target.value
                setState(prev=> ({...prev, tag:update}))
                break
            case "color":
                setState(prev => ({...prev, color: e.target.value}))
                if (state.tag.name) {
                    let obj = state.tag
                    obj.color = e.target.value
                    setState(prev => ({...prev, tag: obj}))
                }
                break
            case "downDate":
                if (e.target.value) {
                    const num = new Date(e.target.value).getTime()
                    if (num < state.date) {
                        setState(prev => ({...prev, down: num + (24*60*60*1000)}))
                    } else {
                        let newDown = state.date - (24*60*60*1000)
                        setState(prev => ({...prev, down: newDown}))
                        dispatch({
                            type: "ARR-PUSH",
                            name: "errors",
                            load: {
                                type:-1,
                                message: `Down Date updated to ${new Date(newDown).toDateString().slice(3,15)}, if needed please select a different date prior to ${new Date(state.date).toDateString().slice(3,15)}`,
                            }
                        
                        })
                    }
                } else {
                    setState(prev => ({...prev, down: 0}))
                }
                break
            default:
                e.target.name ?
                console.log(e.target.name)
                :
                console.log("No Name")
        }
        
    }

    const buildPost = () => {
        
        if (formObj.modify) {
            
        } else {
            let downRef = new Date(state.down)
            let obj = state.seg
            for (let key in shifts[state.shift].segs) {
                if (key !== "full"){
                    if (state.seg[key]) {
                        obj[key] = {name: `Down: ${downRef.getMonth()+1}/${downRef.getDate()}`, forced: false, trade: false}
                    } else {
                        obj[key] = {name: state.norm? state.norm : "N/F", forced: false, trade: false}
                    }
                }
            }
            setState(prev => ({...prev, seg: obj}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // buildPost()
        let post = {
            id: formObj.id,
            shift: formObj.shift,
            pos: formObj.pos.id,
            norm: formObj.norm,
            date: formObj.date,
            down:state.down - (9*60*60*1000),
            created: new Date().getTime(),
            creator: state.creator,
        }

        let obj = state.seg

        if (formObj.modify) {
            post.seg = state.seg
            post["lastMod"] = profile.dName
            if (sel) {
                post["filled"] = true
            }
        } else {
            let downRef = new Date(state.down)
            for (let key in shifts[state.shift].segs) {
                if (key !== "full"){
                    if (state.seg[key]) {
                        obj[key] = {name: `Down: ${downRef.getMonth()+1}/${downRef.getDate()}`, forced: false, trade: false}
                    } else {
                        obj[key] = {name: state.norm? state.norm : "N/F", forced: false, trade: false}
                    }
                }
            }
            post.seg = obj
        }

        
        if (state.tag.name) {
            post.color = state.color,
            post.tag = state.tag
            
        } else {
            post.color = color
        }
        console.log(post)

        // const data = {
        //     // coll: formObj.dept.toString(),
        //     doc: 'posts',
        //     // field: 'posts',
        //     data: [post],
        // }
        
        const data = {
            // coll: "messages",
            coll: `${formObj.dept.toString()}-posts`,
            doc: post.id,
            data: [post]
        }

        const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/setPost"
        // const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/setPost"

        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res.text())
            closeForm()
        })
        .catch((err) => {
            console.warn(err)
        })

        // createPost(data)
    }

    const deletePost = async (e) => {
        e.preventDefault()
        console.log(formObj)

        const request = {
            coll: `${dept}-posts`,
            doc: formObj.id,
        }
        
        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/deleteDoc"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/deleteDoc"
        
        let prompt = confirm(`Are you sure you want to DELETE the posting for ${shifts[formObj.shift].label}, ${formObj.pos.label} on ${new Date(formObj.date).toDateString()}?`) 
        
        if (prompt) {
            console.log("Confirmed")
            await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(request) 
            })
            .then((res) => {
                console.log(res.text())
            })
            .catch((err) => {
            console.warn(err)
              })
            closeForm()
        } else {
            console.log("Cancelled")
        }
    }

    const closeForm = () => {
        setSel(false)
        setModify(false)
        setSegs({one:{name: '', forced: false, trade: false},two:{name: '', forced: false, trade: false},three:{name: '', forced: false, trade: false},})
        setColor('rgb(179, 182, 183, 0.7)')
        setDownDate(0)
        setDisabled(true)
        setPostTag({name: '',reason:'Vacation',color:'rgb(179, 182, 183 0.7)'})
        dispatch(
            {
                type: "CLOSE-FORM",
                name: "show",        
            }
        )
        dispatch(
            {
                type: "SET-ARR",
                name: "errors",
                load: [],        
            }
        )
    }

   


    const styles = {
        backDrop: ` h-full w-full fixed top-0 left-0 z-10 bg-clearBlack flex items-center justify-center `,
        form: ` text-todayGreen bg-white h-max w-400 mt-.02 p-.02 rounded-xl flex-column `,
        field:`font-bold text-xl my-10`,
        button:`${button.green} w-[45%] p-.01 disabled:border disabled:text-green`,
        fullSeg:`${button.green} w-full my-10 py-[5px]`,
        check:`bg-[#AEB6BF] border-2 border-clearBlack text-black p-.02 rounded font-bold text-xl text-center `,
        selected:`${button.green} p-.02 shadow-clearBlack shadow-sm rounded border-2 border-green text-center `,
        segBtn:`${button.green} w-max p-[10px]`,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        deleteBtn:`${button.red} w-.5 p-10 text-xl`,
        submitBtn:`${button.green} p-10 text-xl w-${modify? '': 'full'}`,
        errors:`border-2 text-black font-bold text-lg`,
        error:``,
    }

    return (
        
        <div className={styles.backDrop}>
            { 
            <form 
            onSubmit={(e) => handleSubmit(e)} 
            className={styles.form}
            action="posting"
            >

            <div className={` h-50 w-full flex justify-end mb-10`}>
                <div 
                className={styles.closeBtn}
                onClick={() => closeForm()}>
                    <p>Close</p>
                </div>
            </div>

            <FormInput
            style={styles.field} 
            type="text" 
            label="Position" 
            disabled 
            value={`${formObj?.pos.label} ${shifts[formObj.shift].label} Shift` }
            />
            
            <FormInput
            style={styles.field} 
            type="text"
            value={new Date(formObj?.date).toDateString()} 
            disabled
            label='Date of Vacantcy' 
            />

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
                disabled={formObj.modify && state.down < new Date().getTime()}
                value={downDate}
                onChange={(e) => handleChange(e)}
                />
            </FormInputCont>
        {
            formObj.norm && 
            state.down > 0 &&
        <div className={styles.tagCont}>
            <Select
            label="Color"
            color={state.color} 
            value={state.color} 
            setValue={handleChange} 
            name="color" 
            id="color" 
            > 
                <option value="white" style={{backgroundColor:'white', textAlign:"center"}}>White</option>
                {
                    Object.keys(colors).map((color) => {
                        
                        return (
                        <option value={colors[color]} key={colors[color]}  style={{backgroundColor:colors[color], textAlign:"center"}} >
                        {color}  
                        </option>
                    )})
                }
            </Select>
            {
                formObj.norm &&
            <div className={`flex`}>
                <FormInput
                style={styles.field}
                value={state.tag.name}
                type="text"
                name="tag"
                id="name"
                label="Filling for"
                disabled
                />
                <FormInputCont
                styling={styles.field}  
                label='Reason'
                valiTag={state.tag.reason.length === 0? "*Required":undefined}
                >
                    <input 
                    className={input.text}
                    type="text"
                    id="reason"
                    name="tag"
                    value={state.tag.reason}
                    onChange={(e) => handleChange(e)}
                    />
                </FormInputCont>
            </div>
            }
            </div>
            }
            {
                formObj.modify ?
                <>
                { sel ?
                    <div className={`flex-column m-.05 font-bold`}>
                        { state.seg.one &&
                            <SegInput
                            width="w-.75"
                            shifts={shifts}
                            segs={state.seg}
                            setSegs={handleSegChange}
                            name='one'
                            sel={sel}
                            />
                        }  
                        { state.seg.two &&
                            <SegInput
                            width="w-.75"
                            shifts={shifts}
                            segs={state.seg}
                            setSegs={handleSegChange}
                            name='two'
                            sel={sel}
                            />

                        }
                        { state.seg.three &&   
                            <SegInput
                            width="w-.75"
                            shifts={shifts}
                            segs={state.seg}
                            setSegs={handleSegChange}
                            name='three'
                            sel={sel}
                            />  
                            
                        }   
                    </div>
                    :
                    <div className={`w-full font-bold text-xl`}>                    
                        <button 
                        className={styles.fullSeg}
                        onClick={(e) => fill(e)}
                        >
                            Fill    
                        </button>   
                    </div>
                }
            </>
            :
            state.down !== 0 &&
            <>
            
                {
                    state.shift >= 0 &&
                    <FormInputCont
                    styling={styles.field}
                    label="Hours to Fill"
                    valiTag={Object.keys(state.seg).length === 0? "*Required":undefined}
                    >
                        <div className={`flex flex-wrap justify-between text-center`}>
                            <button 
                            className={(state.seg.one? styles.selected : styles.check) + styles.segBtn}
                            value="one"
                            onClick={(e) => handleClick(e)}
                            >
                                {shifts[state.shift].segs.one}
                            </button>
                            <button 
                            className={(state.seg.two? styles.selected : styles.check) + styles.segBtn}
                            value="two"
                            onClick={(e) => handleClick(e)}
                            >
                                {shifts[state.shift].segs.two}
                            </button>
                        {
                            state.shift === 3 &&
                                <button 
                                className={(state.seg.three? styles.selected : styles.check) + styles.segBtn}
                                value="three"
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.three}
                                </button>

                        }
                        </div>
                    </FormInputCont>
                }
            </>
            }
            <div className={errors.length > 0 && styles.errors}>
            { errors.length > 0 &&
                errors.map(error => (
                    <p className={styles.error + error.type > 0? "bg-clearRed":"bg-clearYellow"}>
                        {error.message}
                    </p>        
                ))
            }</div>
            <div className={`h-50 w-full flex justify-around mt-35`}>
                {
                    formObj.modify &&
                    <button
                    className={styles.deleteBtn} 
                    variant="contained"
                    type='delete'
                    onClick={(e) => deletePost(e)}
                    >
                    Delete Posting
                    </button>
                }
                <button
                className={styles.submitBtn} 
                variant="contained"
                type='submit'
                disabled={disabled}
                >
                    {formObj.modify? 'Save Changes':'Create Post'}
                </button>
            </div>
            </form>}
        </div>
        
    );
}

export default PopUpForm;

