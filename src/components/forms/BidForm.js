import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';

function BidForm(props) {

    const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/updateBids"
    // const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/updateBids"


    const [{formObj, profile, view}, dispatch] = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [selections, setSel] = useState([])
    const [prevSel, setPrev] = useState([])
    const [preview, setPre] = useState({})
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
        console.log(preview)
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
        // Add bid obj to correct post segments
        let obj = {name: profile.dName, startDate: profile.startDate}
        
        const load = {
            coll:`${view[0].dept}-posts`,
            doc: formObj.post.id,
            down: formObj.post.down,
            user: obj,
            bids: selections,
        }

        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(load)
        }).then((res) => {
            console.log(res.text())
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
        // close form
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
            
            if (selections.length === 0) {
                validated = false
            }
        } else {
            if (selections.length === 0) {
                validated = false
            }
        }

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        console.log(selections)
        validate()
        for (const prop in preview) {
            if (preview[prop].length > 0) {
                sortBids(prop)
            }
        }
    },[selections])
    
    useEffect(() => {
        initForm()
    },[formObj.post])
    

    const styles = {
        backDrop: ` h-full w-full fixed top-0 left-0 z-10 bg-clearBlack flex items-center justify-center `,
        form: ` text-todayGreen font-semibold text-xl bg-white h-max w-[500px] mt-.02 p-.02 rounded-xl flex-column `,
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