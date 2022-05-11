import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import { createPost } from '../firebase/firestore';
import usePostsListener from '../helpers/postsListener';
import FormInput from './FormInput';
import Select from './inputs/Select';
import SegInput from './SegInput';

//************* TODO ******************* */
// 2 button toggle for shift filling *Finish Styling
// 


function PopUpForm({shifts,dept}) {

    const [{formObj}, dispatch] = useAuthState()
    const posts = usePostsListener(dept)
    
    const [downDate, setDownDate] = useState(0)
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

    const [state, setState] = useState({
            id: '',
            shift: -1,
            seg: {},
            pos: '',
            date: 0,
            created: new Date(),
            color:'',
            tag: {}
    })

    useEffect(() => {
        console.log(formObj)

        formObj?.norm &&
        setPostTag((prev) => ({...prev, name: formObj?.norm}))
        
        console.log(postTag)
    },[formObj])

    
    

    const colors = [
        {
            name:'Pink', 
            code: '#ff49db'
        },
        {
            name: 'Sea Foam Green',
            code: 'rgb(15, 255, 157, 0.7)',
        },
        {
            name: 'Sky Blue',
            code: 'rgb(15, 187, 255, 0.7)',
        },
        {
            name: 'Flat Purple',
            code: 'rgb(214, 102, 255, 0.7)',
        },
        {
            name: 'Brite Green',
            code: 'rgb(0, 255, 33, 0.7)',
        },
        {
            name: 'Golden Rod',
            code: 'rgb(240, 180, 13, 0.7)',
        },
    ]

    const handleChange = (e) => {
        console.log(e.target.value)
        setPostTag((prev) => (
            {...prev, [e.target.id]: e.target.value,}
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let post = {}
        if (postTag.name) {
            
            post = {
                id: formObj.id,
                shift: formObj.shift,
                seg: segs,
                pos: formObj.pos.id,
                date: formObj.date,
                created: new Date(),
                color:postTag.color,
                tag: postTag
            }
        } else {
            
            post = {
                id: formObj.id,
                shift: formObj.shift,
                seg: segs,
                pos: formObj.pos.id,
                date: formObj.date,
                created: new Date(),
                color:color,
                
            }
        }
        console.log(post)

        const data = {
            coll: formObj.dept.toString(),
            // coll: 'messages',
            doc: 'rota',
            field: 'posts',
            data: [post],
        }

        // const data = {
        //     coll: "messages",
        //     doc: "rota",
        //     subColl: "posts",
        //     post: formObj.id,
        //     data: post
        // }

        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/updateDoc"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/updateDoc"

        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res)
            closeForm()
        })
        .catch((err) => {
            console.warn(err)
        })

        // createPost(data)
    }

    useEffect(() => {
        if (downDate > 0) {
            setSegs(((prev) => (
                {...prev, one: {...segs.one, name:`Down: ${new Date(downDate).getMonth()+1}/${new Date(downDate).getDate()}`}}
            )))
            setDisabled(false)
        }
    },[ downDate])

    
    useEffect(() => {
        console.log(formObj)
        if (formObj && formObj.modify) {
            setColor(formObj.color)
            setModify(true)
            setSegs(formObj.seg)
            if (formObj.tag) {
                setPostTag(formObj.tag)

            } else {
                setPostTag({name:'',reason:'',color:formObj.color})
            }
            
        } else {
            let dateRef = `Down: ${new Date(downDate).getMonth()+1}/${new Date(downDate).getDate()}`
            if (sel) {
            if (formObj.shift < 3) {
                    setSegs({
                        one: {name: downDate? dateRef:formObj.norm, forced: false, trade: false},
                        two: {name: downDate? dateRef:formObj.norm, forced: false, trade: false},
                        three: {name: '', forced: false, trade: false},
                    })
                } else {
                    setSegs({
                        one: {name: downDate? dateRef:formObj.norm, forced: false, trade: false},
                        two: {name: downDate? dateRef:formObj.norm, forced: false, trade: false},
                        three: {name: downDate? dateRef:formObj.norm, forced: false, trade: false},
                    })

                }

            } else {
                setSegs({
                    one: {name: downDate? dateRef:'', forced: false, trade: false},
                    two: {name: '', forced: false, trade: false},
                    three: {name: '', forced: false, trade: false},
                })
            }
        }
    },[formObj,sel,downDate])

    useEffect(() => {
        if (segs.two.name && segs.two.name.length > 0) {
            setSel(true)
        }
    },[segs])

    

    const deletePost = async () => {
        console.log(formObj)
        const request = {
            coll: formObj.dept.toString(),
            doc: "rota",
            field: formObj.id,
            nestedObj: "posts",
        }
        
        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/deleteDocField"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/deleteDocField"
        
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
                console.log(res.json())
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
        document.getElementById("date-picker").value = null
        dispatch(
            {
                type: "CLOSE-FORM",
                name: "show",
                
            }
        )
    }

    useEffect(() => {
        console.log({one:segs.one,two:segs.two,three:segs.three})
        if (segs.one?.name || segs.two?.name || segs.three?.name) {
            setDisabled(false)
        }
    },[segs])

    const styles = {
        backDrop: ` h-full w-full fixed top-0 left-0 z-10 bg-clearBlack flex items-center justify-center `,
        form: ` text-todayGreen bg-white h-max w-400 mt-.02 p-.02 rounded-xl flex-column `,
        field:`font-bold text-xl`,
        button:`${button.green} w-[45%] p-.01 disabled:border disabled:text-green`,
        deleteBtn:`${button.red} w-.5 p-.01 text-xl`,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        submitBtn:`${button.green} p-.01 text-xl w-${modify? '.5': 'full'}`,
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
            value={`${formObj?.pos.label} ${shifts[formObj.shift].label}` }
            />
            
            <FormInput
            style={styles.field} 
            type="text"
            value={new Date(formObj?.date).toDateString()} 
            disabled
            label='Date of Vacantcy' 
            />

            <FormInput
            style={styles.field} 
            type="date"
            id="date-picker" 
            label='Down Date'
            setValue={(e) => setDownDate(new Date(e.target.value).getTime()+(24*60*60*1000))} 
            
            />
            <div className={`w-full font-bold text-xl`}>                    
            {
                formObj.pos && 
                formObj.pos.group !== "misc" &&
            <div>
                <Select
                label="Color"
                style={{backgroundColor:postTag.color}} 
                value={postTag.color} 
                setValue={(e) => {handleChange(e)}} 
                name="color" 
                id="color" 
                > 
                    <option value="white" style={{backgroundColor:'white'}}>White</option>
                    {
                        colors.map((color,i) => {
                            
                            return (
                            <option value={color.code}  style={{backgroundColor:color.code}} >
                            {color.name}  
                            </option>
                        )})
                    }
                </Select>
                {
                    formObj.norm &&
                <>
                    <FormInput
                    style={styles.field}
                    value={postTag.name}
                    type="text"
                    id="name"
                    label="Filling for"
                    disabled
                    setValue={handleChange}
                    />
                    <FormInput
                    style={styles.field}
                    value={postTag.reason}
                    type="text"
                    id="reason"
                    label="Reason"
                    setValue={handleChange}
                    />
                </>
                }
                </div>
                }
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
                downDate={downDate}
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
                    downDate={downDate}
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
                    downDate={downDate}
                    sel={sel}
                    />  
                    
                }   
            </div>
            <div className={modify? ` h-50 w-full flex justify-around mt-35`:` h-50 w-full flex justify-end mt-35`}>
                {
                    modify &&
                    <button
                    className={styles.deleteBtn} 
                    variant="contained"
                    type='delete'
                    onClick={() => deletePost()}
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

