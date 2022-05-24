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
        if (formObj.modify) {

        } else {
            if (state.down > 0 && state.seg.one || state.seg.two || state.seg.three) {
                setDisabled(false)
            } else {
                setDisabled(true)
                console.log(state)
            }
        }
    }

    const initForm = () => {

        let obj = {
            id: formObj.id,
            pos: formObj.pos.id,
            shift: formObj.shift,
            date: formObj.date,
            norm: formObj.norm,
            color: formObj.color,
            down: 0,
            creator: '',
            seg:{},
            tag:{},   
        }

        if (formObj.modify) {
            setModify(true)
            obj.down = formObj.down
            obj.creator = formObj.creator
            obj["lastMod"] = profile.dName
            
        } else {
            obj.creator = profile.dName
        }

        if (formObj.norm) {
            obj.tag = formObj.tag? formObj.tag : {name:formObj.norm, reason:'Vacation', color: "white"}
            obj.color = "white"
        } else {

        }
        return setState(obj)
    }
    

    useEffect(() => {
        if (formObj.id) {
            console.log("formObj: " , formObj)
            initForm()
        }
    },[formObj])

    useEffect(() => {
        console.log("State: " , state)
        console.log(downDate)
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
        validate()
    },[state])

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        let obj = {}
        
        if (e.target.value === "full") {
            for (const i in shifts[state.shift].segs) {
                if (i !== "full") {
                    obj[i] = {name: '', forced: false, trade:false} 
                }
            }
        } else {
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
        deleteBtn:`${button.red} w-.5 p-.01 text-xl`,
        fullSeg:`${button.green} w-full my-10 py-[5px]`,
        check:`bg-[#AEB6BF] border-2 border-clearBlack p-.02 rounded font-bold text-xl text-center `,
        selected:`bg-[#00FF66] p-.02 shadow-clearBlack shadow-inner rounded border-2 border-green font-bold text-xl text-center text-black`,
        segBtn:`${button.green} w-max p-[10px]`,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        submitBtn:`${button.green} p-.01 text-xl w-${modify? '.5': 'full'}`,
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
            setValue={handleChange} 
            name="color" 
            id="color" 
            > 
                <option value="white" style={{backgroundColor:'white', textAlign:"center"}}>White</option>
                {
                    colors.map((color,i) => {
                        
                        return (
                        <option value={color.code} key={color.code}  style={{backgroundColor:color.code, textAlign:"center"}} >
                        {color.name}  
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
                modify ?
                <>
            <div className={`w-full font-bold text-xl`}>                    
                <label className={`text-center`}>
                    <h6>Fill Method</h6>
                    <div className={`flex w-full justify-around`}>
                        <button disabled={!sel} className={styles.button} onClick={(e)=> {e.preventDefault(); setSel(false)}}>Whole Shift</button>
                        <button disabled={sel} className={styles.button} onClick={(e)=> {e.preventDefault(); setSel(true)}}>Segments</button>
                    </div>
                </label>    
            </div>
            <div className={`flex-column m-.05 font-bold`}>
                <SegInput
                width="w-.75"
                shifts={shifts}
                segs={segs}
                setSegs={setSegs}
                name='one'
                // downDate={downDate}
                sel={sel}
                />
                    
                {
                    sel &&
                    <SegInput
                    width="w-.75"
                    shifts={shifts}
                    segs={segs}
                    setSegs={setSegs}
                    name='two'
                    // downDate={downDate}
                    sel={sel}
                    />

                }
                {
                    formObj.shift === 3 && sel &&    
                    <SegInput
                    width="w-.75"
                    shifts={shifts}
                    segs={segs}
                    setSegs={setSegs}
                    name='three'
                    // downDate={downDate}
                    sel={sel}
                    />  
                    
                }   
            </div>
            </>
            :
            state.down !== 0 &&
            <>
            
                {
                    state.shift >= 0 &&
                    <FormInputCont
                    styling={styles.field}
                    label="Hours to Fill"
                    valiTag={state.seg? "*Required":undefined}
                    >
                        <div className={`flex flex-wrap justify-between text-center`}>
                            <button 
                            className={(state.seg.one && state.seg.two? styles.selected : styles.check) + styles.fullSeg}
                            value="full"
                            onClick={(e) => handleClick(e)}
                            >
                                {shifts[state.shift].segs.full}
                            </button>
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
            <div className={modify? ` h-50 w-full flex justify-around mt-35`:` h-50 w-full flex justify-end mt-35`}>
                {
                    modify &&
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
                    {modify? 'Save Changes':'Create Post'}
                </button>
            </div>
            </form>}
        </div>
        
    );
}

export default PopUpForm;

