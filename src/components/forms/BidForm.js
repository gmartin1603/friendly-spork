import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import FormInputCont from '../inputs/FormInputCont'
import Select from '../inputs/Select';

function BidForm(props) {

    // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/updateBids"
    const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/updateBids"


    const [{formObj, profile, view, errors}, dispatch] = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [selections, setSel] = useState([])
    const [prevSel, setPrev] = useState([])
    const [preview, setPre] = useState({})
    const [notes, setNotes] = useState("")
    const [area, setArea] = useState("")
    const [prevNotes, setPrevNotes] = useState({})
    const [options, setOptions] = useState([])
    const [mod, setMod] = useState(false)

    const initForm = () => {
        let selectionInit = []
        let previewInit = {}
        for (const key in formObj.post.seg) {
            let arr = []
            if (formObj.post.seg[key].bids) {
                formObj.post.seg[key].bids.map(bid => {
                    if (bid.name === profile.dName) {
                        selectionInit.push(key)
                    }
                    arr.push(bid)
                    if (bid.notes) {
                        if (bid.notes.area) {
                            setNotes("text")
                            setArea(bid.notes.text)
                            setPrevNotes({notes: "text", area: bid.notes.text})
                        } else {
                            setNotes(bid.notes.text)
                            setPrevNotes({area: '', notes: bid.notes.text})
                        }
                    }
                })
                
                previewInit[key] = arr
            } else {
                previewInit[key] = []
            }
        }
        if (selectionInit.length > 0) {
            setMod(true)
            setPrev(selectionInit)
        }
        
        setPre(previewInit)
        setSel(selectionInit)
    }

    const sortBids = (key) => {
        if (key) {
            preview[key].sort((a, b) => {
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
        // console.log(preview)
    }

    const handleChange = (e) => {
        e.preventDefault()
        // console.log(e.target.value, e.target.id)
        switch (e.target.name) {
            case "area":
                setArea(e.target.value)
            break
            case "noteSel":
                if (e.target.value === "Text") {
                    setNotes("text")
                } else {
                    setNotes(e.target.value)
                }
            break
            default:
                e.target.name?
                console.log(e.target.name, "Not Found in switch")
                :
                console.log("BidForm switch - No Name")
        }
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        if (selections.includes(e.target.value)) {
            let arr = []
            selections.map(str => {
                if (str !== e.target.value) {
                    arr.push(str)
                }
            })
            setSel(arr)
            let pUpdate = []
            preview[e.target.value].map(obj => {
                if (obj.name !== profile.dName) {
                    pUpdate.push(obj)
                }
            })
            setPre(prev => ({...prev, [e.target.value]: pUpdate}))
        } else {
            let arr= preview[e.target.value]
            setSel(prev => ([...prev, e.target.value]))
            arr.push({name: profile.dName, startDate: profile.startDate})
        }
        return sortBids(e.target.value)
    }

    const cancelBids = async (e) => {
       e.preventDefault()
        const load = {
            coll:`${view[0].dept}-posts`,
            doc: formObj.post.id,
            down: formObj.post.down,
            user: {name: profile.dName, startDate: profile.startDate},
            bids: [],
        }
        let prompt = confirm(`Are you sure you want to REMOVE ${selections.length > 1? "ALL signatures":"your signature"} from this post?`)
        if (prompt) {
            await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(load)
            }).then((res) => {
                console.log(res.text())
                closeForm()
            })
            .catch((err) => {
                console.log(`ERROR: ${err}`)
            })    
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        // Add bid obj to correct post segments
        let obj = {
            name: profile.dName, 
            startDate: profile.startDate, 
        }
        if (selections.length > 1) {
            if (notes === "text") {
                obj["notes"] = {area: true, text:area} 
            } else {
                obj["notes"] = {text:notes} 
            }
        } 
        
        const load = {
            coll:`${view[0].dept}-posts`,
            doc: formObj.post.id,
            down: formObj.post.down,
            user: obj,
            bids: selections,
        }
        if (formObj.post.down > new Date().getTime()) {
            await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(load)
            }).then((res) => {
                console.log(res.text())
                // close form
                dispatch(
                    {
                        type: "CLOSE-FORM",
                        name: "showBid",        
                    }
                )
            })
            .catch((err) => {
                console.log(`ERROR: ${err}`)
            })
        } else {
            console.log("declined")
            dispatch({
                type: "ARR-PUSH",
                name: "errors",
                load: {message:"Can't sign post after Down Date"}
            })
        }
    }

    const closeForm = () => {
        
        if (!disabled) {
            let prompt = confirm(`${selections.length > 1? "Signatures":"Signature"} NOT posted, are you sure you want to close?`)
            if (prompt) {
                dispatch(
                    {
                        type: "CLOSE-FORM",
                        name: "showBid",        
                    }
                )
            }
        } else {
            dispatch(
                {
                    type: "CLOSE-FORM",
                    name: "showBid",        
                }
            )
        }
    }

    const validate = () => {
        let validated = true
        if (mod) {
            if (selections.length === prevSel.length) {
                validated = false
                selections.map(str => {
                    if (!prevSel.includes(str)) {
                        validated = true
                    }
                })
                 
            }
            
            if (selections.length > 1) {
                if (notes === "") {
                    validated = false
                }

                if (notes === "text") {
                    validated = false
                    if (area === '') {
                        validated = false
                    } else if (area === prevNotes.area) {
                        validated = false
                    } else {
                        validated = true
                    }
                } 

                if (notes !== "text") {
                    if (notes === prevNotes.notes) {
                        validated = false
                    } else {
                        validated = true
                    }
                } 
            }
            
            
            if (selections.length === 0) {
                validated = false
            }
        } else {
            if (selections.length === 0) {
                validated = false
            }

            if (selections.length > 1) {
                if (notes === "") {
                    validated = false
                }

                if (notes === "text") {
                    validated = false
                    if (area === '') {
                        validated = false
                    } else if (area === prevNotes.area) {
                        validated = false
                    } else {
                        validated = true
                    }
                } 
            }
        }

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        // console.log("notes: ", notes)
        // console.log("area: ", area)
        // console.log(prevNotes)
        validate()
        if (selections.length > 1) {
            let arr = []
            if (selections.length === formObj.shift.segs.length - 1) {
                arr=[`${formObj.shift.segs.full} or None`]
            } else {
                arr=[`All ${selections.length * 4} hrs or None`]
            }
            Object.keys(formObj.shift.segs).map((seg, i) => {
                if (selections.includes(seg)) {
                    arr.push(`${formObj.shift.segs[seg]} Prefered`)
                }
            })
            arr.push("Any Eligable hrs")
            arr.push("text")
            setOptions(arr)
        }
        for (const prop in preview) {
            if (preview[prop].length > 0) {
                sortBids(prop)
            }
        }
    },[selections, notes, area])

    useEffect(() => {
        if (selections.length < 2) {
            setArea("")
            setNotes("")
        }
    },[selections])
    
    useEffect(() => {
        if (notes !== "text") {
            setArea("")
        }
    },[notes])
    
    useEffect(() => {
        console.log("FormObj: ", formObj)
        initForm()
    },[formObj.post])
    

    const styles = {
        backDrop: ` h-screen w-full overflow-auto fixed top-0 left-0 z-50 bg-clearBlack flex items-center justify-center `,
        form: `text-todayGreen font-semibold text-xl bg-white overflow-auto w-[500px] h-max max-h-[90%] mt-.02 p-.02 rounded-xl flex-column `,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        bidCont:`flex justify-around`,
        segCont:`w-full`,
        bidBtn:`w-full cursor-pointer border-2 border-clearBlack my-[5px] p-[5px] rounded`,
        selected:`bg-todayGreen p-.02 shadow-clearBlack shadow-inner font-semibold text-white`,
        default:`bg-gray-light`,
        submit:`${button.green} w-full p-[5px] mt-[20px]`,
        cancel:`${button.red} w-full p-[5px] mt-[20px]`,
    }
    return (
        <div className={styles.backDrop}>
            <form className={styles.form} action="Bid">
                <div className={` h-50 w-full flex justify-end mb-10`}>
                    <div 
                    className={styles.closeBtn}
                    onClick={() => closeForm()}>
                        <p>Close</p>
                    </div>
                </div>
                {errors.length > 0 &&
                    errors.map(error => (
                        <p 
                        className={`bg-red text-black text-center p-.01`}
                        > 
                            {error.message} 
                        </p>
                    ))
                }
                <FormInput
                label="Position"
                value={`${formObj.title}`}
                disabled
                />
                <FormInput
                label="Posting Date:"
                value={`${new Date(formObj.post.date).toDateString()}`}
                disabled
                />
                <FormInput
                label="Posting Down:"
                value={`${new Date(formObj.post.down).toDateString()}`}
                disabled
                />
                <div>
                    <h1 
                    className={`w-full text-center`}
                    >
                        Segment Selection
                    </h1>
                    <div className={styles.bidCont}>
                        { formObj.post.seg.one &&
                            formObj.post.seg.one.name !== (formObj.post.norm || "N/F") &&
                            <div className={styles.segCont}>
                                <button className={`${styles.bidBtn} ${selections.includes("one")? styles.selected : styles.default}`}
                                value="one"
                                onClick={(e) => {handleClick(e)}}
                                > 
                                    {formObj.shift.segs.one} 
                                </button>
                                <ol className={styles.bidList}>
                                    { preview.one &&
                                        preview.one.map(bid => (
                                            <li key={bid.name}> {bid.name} </li>
                                        )) 
                                    }
                                </ol>
                            </div>
                        }
                        { formObj.post.seg.two &&
                            formObj.post.seg.two.name !== (formObj.post.norm || "N/F") &&
                            <div className={styles.segCont}>
                                <button className={`${styles.bidBtn} ${selections.includes("two")? styles.selected : styles.default}`}
                                value="two"
                                onClick={(e) => {handleClick(e)}}
                                > 
                                    {formObj.shift.segs.two} 
                                </button>
                                <ol>
                                    { preview.two &&
                                        preview.two.map(bid => (
                                            <li key={bid.name}> {bid.name} </li>
                                        )) 
                                    }
                                </ol>
                            </div>
                        }
                        {
                            formObj.post.shift === 3 &&
                            preview.three &&
                            formObj.post.seg.three.name !== (formObj.post.norm || "N/F") &&
                            <div className={styles.segCont}>
                                <button className={`${styles.bidBtn} ${selections.includes("three")? styles.selected : styles.default}`}
                                value="three"
                                onClick={(e) => {handleClick(e)}}
                                > 
                                    {formObj.shift.segs.three} 
                                </button>
                                <ol>
                                    {
                                        preview.three.map(bid => (
                                            <li key={bid.name}> {bid.name} </li>
                                        )) 
                                    }
                                </ol>
                            </div>
                        }
                    </div>
                    { selections.length > 1 &&
                        <div 
                        className={styles.notesCont}
                        >
                            {/* <h1>Selection Notes (optional)</h1> */}
                            <FormInputCont
                            styling={``}
                            label="Selection Notes"
                            valiTag={notes === ""? "*Selection Required":undefined}
                            >
                                <select
                                value={notes}
                                className={`w-full text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`}
                                onChange={(e) => handleChange(e)} 
                                name="noteSel" 
                                > 
                                <option value="" hidden>Select an option</option>
                                    { 
                                        options.map((option, i) => (
                                                    <option value={option} key={i}>
                                                        {option.charAt(0).toUpperCase()+option.slice(1)}
                                                    </option>
                                                )
                                            )   
                                    }
                                </select>

                            </FormInputCont>
                            { notes === "text" && 
                                <FormInputCont
                                label="Custom Note"
                                valiTag={area === ''? "*Required":undefined}
                                >
                                    <textarea name="area" 
                                    className={`w-full h-min border border-black`}
                                    placeholder={`E.g. 1st 4 hours preferred, 2nd 4 hours ok.`}
                                    maxLength={160}
                                    onChange={(e) => handleChange(e)}
                                    value={area}
                                    />
                                    <p 
                                    className={`text-black text-sm w-full text-right`}>
                                        {area.length}/160
                                    </p>
                                </FormInputCont>
                            }
                        </div>
                    }
                </div>
                <button 
                className={styles.submit}
                onClick={(e) => handleSubmit(e)}
                disabled={disabled}
                >
                    {mod ? `Save Changes`:`Submit ${selections.length > 1? "Signatures":"Signature"}`}
                </button>
                {
                    mod &&
                    <button 
                    className={styles.cancel}
                    onClick={(e) => cancelBids(e)}
                    >
                        {`Cancel ${selections.length > 1? "All Bids":"Bid"}`}
                    </button>
                }
            </form>
        </div>
    );
}

export default BidForm;