import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, input } from '../context/style/style';
import FormInput from './FormInput';
import ColorPicker from './inputs/ColorPicker';
import FillLine from './inputs/FillLine';
import FormInputCont from './inputs/FormInputCont';
import ModLine from './inputs/ModLine';

function PopUpForm({dept}) {
    let url = ""
    if (process.env.NODE_ENV === "production") {
        url ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp"
    } else {
        url ="http://localhost:5001/overtime-management-83008/us-central1/fsApp"
    }
    const initialState = {
        id: '',
        shift: -1,
        seg: {},
        norm: '',
        pos: '',
        date: 0,
        down: 0,
        color:'',
        // tag: {},
        creator:'',
        editor: '',
    }

    const [{formObj, profile, errors}, dispatch] = useAuthState()

    const [state, setState] = useState(initialState)
    const [downDate, setDownDate] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [disableCanc, setDisableCanc] = useState(false)
    const [sel, setSel] = useState(false)
    const [modify, setModify] = useState(false)

    const validate = () => {
        let validated = false
        if (formObj.modify) {
            Object.keys(formObj.seg).forEach(key => {
                Object.keys(formObj.seg[key]).forEach(prop => {
                    if (state.seg[key][prop] === formObj.seg[key][prop]) {
                        // console.log(key)
                    } else {
                        // console.log(key)
                        validated = true
                    }
                })
            })
            // if downDate has been changed before filling
            if ((state.down > new Date()) && (state.down !== formObj.down)) {
                validated = true
            }
        } else {
            if (state.down > 0 && Object.keys(state.seg).length > 0) {
                validated = true
                if (state.tag?.reason) {
                }
            }
        }
        // checks for changes in tag
        if (formObj.creator && state.tag?.reason !== formObj.tag?.reason) {
            validated = true
        }
        // checks for changes in color
        if (formObj.creator && formObj.color !== state.color) {
            validated = true
        }
        // validates false if operations user does not enter their name
        if (profile.level > 1) {
            if (state.creator === profile.dName) {
                if (formObj.modify) {
                    validated = false
                }
            } else if (state['creator'].length < 3) {
                validated = false
            }
        }

        if (validated) {
            // console.log("Validated: true")
            return setDisabled(false)
        } else {
            // console.log("Validated: false")
            return setDisabled(true)
        }
    }

    const newPost = () => {
        let obj = {}
        Object.keys(formObj.shift.segs).map(key => {
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
                down: formObj.down? formObj.down : 0,
                norm: formObj.norm,
                color: "white",
                tag: {name: formObj.norm, reason: profile.level > 1? formObj.reason:"Vacation", color: "white"},
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
        let creator = formObj.creator
        if (profile.level > 1) {
            creator = profile.dName
        }
        if (formObj.norm) {
            setState(prev => ({
                ...prev,
                id: formObj.id,
                pos: formObj.pos.id,
                date: formObj.date,
                down: formObj.down,
                creator: creator,
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
                creator: creator,
                shift: formObj.shift,
                seg: formObj.seg,
                slots: formObj.slots,
            }))
        }
    }

    const modifyPost = () => {
        let creator = formObj.creator
        if (profile.level > 1) {
            creator = profile.dName
        }
        if (formObj.norm) {
            setState(prev => ({
                ...prev,
                id: formObj.id,
                pos: formObj.pos.id,
                date: formObj.date,
                down: formObj.down,
                creator: creator,
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
                creator: creator,
                shift: formObj.shift,
                seg: formObj.seg,
                slots: formObj.slots
            }))
        }
        setSel(!sel)
    }

    const fill = (e) => {
        e.preventDefault()
        let date = new Date().getTime()
        if (date < state.down) {
            setState(prev => ({...prev, down: date}))
        }
        return setSel(!sel)
    }

    const sortBids = (key) => {
        if (key) {
            state.seg[key].bids.sort((a, b) => {
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

    useEffect(() => {
        if (formObj.id) {
            // console.log("formObj: " , formObj)
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
        // console.log("State: " , state)
        // console.log(sel)
        if (state.down > 0) {
            const date = new Date(state.down)
            let month = date.getMonth() + 1
            if (month < 10) {
                month = `0${month}`
            }
            let day = date.getDate()
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

        for (const key in state.seg) {
            if (state.seg[key].bids) {
                sortBids(key)
            }
        }

        if (state.id) {
            validate()
        }
    },[state])

    const handleClick = (e) => {
        // console.log(e.target.value)
        e.preventDefault()
        let obj = {}
        if (state.seg[e.target.value]) {
            for (const i in state.seg) {
                if (i !== e.target.value) {
                    obj[i] = state.seg[i]

                } else {
                    if (e.target.id && formObj.norm) {
                        if (state.seg[i].name === "N/F") {
                            obj[i] = {...state.seg[i], name: ''}
                        } else {
                            obj[i] = {...state.seg[i], name: "N/F"}
                        }
                    }
                }
            }
        } else {
            obj = {...state.seg, [e.target.value]: {name: '', forced: false, trade: false}}
        }
        return setState(prev => ({...prev, seg: obj}))
    }

    const handleChange = (e) => {
        // console.log(e.target.value)
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
                    let num = new Date(e.target.value)
                    num.setHours(9)
                    console.log(new Date(state.date))
                    num = num.getTime() + (24*60*60*1000)
                    if (num < state.date + (11*60*60*1000)) {
                        setState(prev => ({...prev, down: num}))
                        if (formObj.modify && !formObj.filled) {
                            let obj = {}
                            const date = new Date(num)
                            let month = date.getMonth() + 1
                            let day = date.getDate()
                            Object.keys(state.seg).map(key => {
                                if (state.seg[key].name !== formObj.norm) {
                                    obj[key] = {...state.seg[key], name:`Down: ${month}/${day}`}
                                } else {
                                    obj[key] = state.seg[key]
                                }
                            })
                            setState(prev => ({...prev, seg:obj}))
                        }
                    } else {
                        let newDown = new Date(state.date)
                        newDown.setHours(10)
                        newDown = newDown.getTime()
                        setState(prev => ({...prev, down: newDown}))
                        if (formObj.modify && !formObj.filled) {
                            let obj = {}
                            const date = new Date(newDown)
                            let month = date.getMonth() + 1
                            let day = date.getDate()
                            Object.keys(state.seg).map(key => {
                                if (state.seg[key].name !== formObj.norm) {
                                    obj[key] = {...state.seg[key], name:`Down: ${month}/${day}`}
                                } else {
                                    obj[key] = state.seg[key]
                                }
                            })
                            setState(prev => ({...prev, seg:obj}))
                        }
                        dispatch({
                            type: "ARR-PUSH",
                            name: "errors",
                            load: {
                                type:-1,
                                message: `Down Date updated to ${new Date(newDown).toDateString().slice(3,15)}, if needed please select a different date prior to ${new Date(state.date).toDateString().slice(3,15)}`,
                                code: 264,
                            }
                        })
                    }
                } else {
                    setState(prev => ({...prev, down: 0}))
                }
                break
            case "creator":
                let value = ''
                if (e.target.value) {
                    value = `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
                }
                setState(prev => ({...prev, creator: value, editor: value}))
                break
            default:
                e.target.name ?
                console.log(e.target.name)
                :
                console.log("No Name")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        setDisableCanc(true)
        let post = {
            id: formObj.id,
            shift: formObj.shift.id,
            pos: formObj.pos.id,
            norm: formObj.norm,
            date: formObj.date,
            down:state.down,
            created: new Date().getTime(),
            creator: state.creator,
        }
        let obj = state.seg
        if (formObj.modify) {
            post.seg = obj
            post["lastMod"] = profile.level > 1? state.creator : profile.dName
            post["modDate"] = new Date().getTime()
            if (sel) {
                post["filled"] = true
            }
        } else {
            let downRef = new Date(state.down)
            let filled = true
            for (let key in formObj.shift.segs) {
                if (key !== "full"){
                    if (state.seg[key]) {
                        if (state.seg[key].name === "N/F") {
                            obj[key] = state.seg[key]
                        } else {
                            obj[key] = {name: `${downRef.getMonth()+1}/${downRef.getDate()}`, forced: false, trade: false}
                            filled = false

                        }
                    } else {
                        obj[key] = {name: state.norm? state.norm : "N/F", forced: false, trade: false}
                    }
                }
            }
            if (filled) {
                post["filled"] = filled
                post.down = new Date().getTime()
            }
            post.seg = obj
        }

        post.color = state.color
        if (state.tag) {
            post.tag = state.tag
        }

        // console.log(post)
        // if callin go to fill mode without posting
        if (profile.level > 1) {
            if (!formObj.modify) {
                // console.log(state.tag)
                dispatch({
                    type: "SET-OBJ",
                    name: "formObj",
                    load: {
                        ...formObj,
                        modify: true,
                        filled: true,
                        tag: state.tag,
                        seg: post.seg,
                        down: post.down,
                        color: post.color,
                    }
                })
                // setSel(true)
                return
            }
        }

        const data = {
        coll: `${formObj.dept.toString()}-posts`,
        doc: post.id,
        data: [post]
        }

        await fetch(`${url}/setPost`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then((res) => {
            // console.log(res.text())
            closeForm()
        })
        .catch((err) => {
            console.warn(err)
        })
    }

    const deletePost = async (e) => {
        e.preventDefault()

        const request = {
            coll: `${dept}-posts`,
            doc: formObj.id,
        }

        let prompt = confirm(`Are you sure you want to DELETE the posting for ${formObj.shift.label}, ${formObj.pos.label} on ${new Date(formObj.date).toDateString()}?`)

        if (prompt) {
            setDisabled(true)
            setDisableCanc(true)
            console.log("Confirmed")
            await fetch(`${url}/deleteDoc`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(request)
            })
            .then((res) => {
                console.log(res.text())
                closeForm()
            })
            .catch((err) => {
                console.warn(err)
            })
        } else {
            console.log("Cancelled")
        }
    }

    const closeForm = () => {
        setSel(false)
        setModify(false)
        setDownDate(0)
        setDisabled(true)
        if (profile.level > 1) {
            dispatch({
                type: "CLOSE-FORM",
                name: "show",
            })
        } else {
            dispatch(
                {
                    type: "CLOSE-FORM",
                    name: "show",
                }
            )
        }
    }

    const styles = {
        backDrop: ` h-screen w-full fixed top-0 left-0 z-50 bg-clearBlack flex items-center justify-center `,
        form: `relative text-todayGreen bg-white h-max max-h-[80%] w-400 overflow-auto mt-.02 p-.02 rounded-xl flex-column `,
        field:`font-bold text-xl my-10`,
        button:`${button.green} w-[45%] p-.01 disabled:border disabled:text-green`,
        fullSeg:`${button.green} w-full my-10 py-[5px]`,
        check:`bg-[#AEB6BF] border-2 border-clearBlack text-black p-.02 rounded font-bold text-xl text-center `,
        nf:`bg-clearRed border-2 border-clearBlack text-white text-md p-.02 rounded-md`,
        selected:`${button.green} p-.02 font-sm shadow-clearBlack shadow-sm rounded border-2 border-green text-center `,
        segBtn:`${button.green} w-max p-[10px]`,
        btnCont: `flex justify-around py-.01 rounded-md`,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        deleteBtn:`${button.red} w-.5 p-10 text-xl`,
        submitBtn:`${button.green} p-10 text-xl w-${modify? '': 'full'}`,
        bid:`text-black text-lg flex justify-between`,
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
            value={`${formObj?.pos.label} ${formObj?.shift.label}` }
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
                disabled={formObj.modify && state.down <= new Date().getTime()}
                value={downDate}
                onChange={(e) => handleChange(e)}
                />
            </FormInputCont>
            { formObj.norm &&
                state.down > 0 &&
                <div className={styles.tagCont}>
                    {
                        formObj.norm &&
                    <div className={`flex flex-col`}>
                        <FormInputCont
                        styling={`${styles.field} w-full flex flex-col justify-between`}
                        label='Color'
                        valiTag={1 === 0? "*Required":undefined}
                        >
                            <ColorPicker
                            value={state.tag.color}
                            setValue={handleChange}
                            />
                        </FormInputCont>
                        <FormInput
                        style={styles.field}
                        value={state.tag.name}
                        type="text"
                        name="tag"
                        id="name"
                        label="Filling for"
                        disabled
                        />
                        <FormInput
                        style={styles.field}
                        value={state.tag.reason}
                        // valiTag={state.tag.reason.length === 0? "*Required":undefined}
                        type="text"
                        name="tag"
                        id="reason"
                        label="Reason"
                        setValue={handleChange}
                        />
                    </div>
                    }
                </div>
            }
            { formObj.modify ?
                <>
                { sel ?
                    <div className={`font-bold`}>
                        { state.seg["one"] &&
                        <ModLine
                        state={state}
                        seg="one"
                        setState={setState}
                        sel={sel}
                        />
                        } { state.seg["two"] &&
                        <ModLine
                        state={state}
                        seg="two"
                        setState={setState}
                        sel={sel}
                        />
                        } { state.seg["three"] &&
                        <ModLine
                        state={state}
                        seg="three"
                        setState={setState}
                        sel={sel}
                        />
                        }
                        { profile.level > 1 &&
                        <FormInput
                        style={styles.field}
                        value={state.editor}
                        valiTag={state.editor.length < 3? "*Required":undefined}
                        type="text"
                        name="creator"
                        label="Your Name"
                        setValue={handleChange}
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
                { state.shift.id &&
                    <FormInputCont
                    styling={styles.field}
                    label="Hours to Fill"
                    valiTag={Object.keys(state.seg).length === 0? "*Required":undefined}
                    >
                        <div className={`flex flex-wrap justify-around text-center`}>
                            { formObj.shift.segs.one?
                                <FillLine
                                seg="one"
                                shift={formObj.shift}
                                state={state}
                                handleClick={handleClick}
                                />
                            : null }
                            { formObj.shift.segs.two?
                                <FillLine
                                seg="two"
                                shift={formObj.shift}
                                state={state}
                                handleClick={handleClick}
                                />
                            : null }
                            { formObj.shift.segs.three?
                                <FillLine
                                seg="three"
                                shift={formObj.shift}
                                state={state}
                                handleClick={handleClick}
                                />
                            : null }

                        </div>
                    </FormInputCont>
                }

            </>
            }
            <div >
                { errors.length > 0 &&
                    errors.map(error => (
                        <p
                        className={styles.error + error.type > 0? "bg-clearRed":"bg-clearYellow"}
                        key={error.code}
                        >
                            {error.message}
                        </p>
                    ))
                }
            </div>
            <div className={`h-50 w-full flex justify-around mt-35`}>
                { formObj.modify &&
                    profile.level < 2 &&
                    <button
                    className={styles.deleteBtn}
                    variant="contained"
                    type='delete'
                    disabled={disableCanc}
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
                    {formObj.modify? 'Save Changes': profile.level > 1? 'Next':'Create Post'}
                </button>
            </div>
            </form>
            }
        </div>
    );
}

export default PopUpForm;