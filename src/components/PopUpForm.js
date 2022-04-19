import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import style, {popUp, button} from '../context/style/style';
import { createPost } from '../firebase/firestore';
import FormInput from './FormInput';
import SegInput from './SegInput';

//************* TODO ******************* */
// 2 button toggle for shift filling *Finish Styling
// 


function PopUpForm({show, posts}) {

    const {formObj, toggleForm} = useAuthState({})

    const [downDate, setDownDate] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [sel, setSel] = useState(false)
    const [modify, setModify] = useState(false)
    const [color, setColor] = useState('rgb(179, 182, 183, 0.7)')
    const [segs, setSegs] = useState({
        one: {name: '', forced: false, trade: false},
        two: {name: '', forced: false, trade: false},
        three: {name: '', forced: false, trade: false},
    })

    useEffect(() => {
        console.log(segs)
        console.log(formObj)
    },[segs,formObj])

    const shifts = {
        0: {label:'1st Shift', segs: {full:'7 AM - 3 PM', one:'7 AM - 11 AM', two:'11 AM - 3 PM'}},
        1: {label:'2nd Shift', segs: {full:'3 PM - 11 PM',one:'3 PM - 7 PM', two:'7 PM - 11 PM'}},
        2: {label:'3rd Shift', segs: {full:'11 PM - 7 AM', one:'11 PM - 3 AM', two:'3 AM - 7 AM'}},
        3: {label:'Night Shift', segs: {full:'7 PM - 7 AM', one:'7 PM - 11 PM', two:'11 PM - 3 AM', three:'3 AM - 7 AM'}},
    }
    // const shifts = {
    //     0: {label:'1st Shift', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']},
    //     1: {label:'2nd Shift', segs: ['3 PM - 11 PM','3 PM - 7 PM', '7 PM - 11 PM']},
    //     2: {label:'3rd Shift', segs: ['11 PM - 7 AM', '11 PM - 3 AM', '3 AM - 7 AM']},
    //     3: {label:'Night Shift', segs: ['7 PM - 7 AM', '7 PM - 11 PM', '11 PM - 3 AM', '3 AM - 7 AM',]},
    // }

    const colors = [
        {
            name: 'Default',
            code: 'rgb(179, 182, 183 0.7)',
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
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const post = {
            id: formObj.id,
            shift: formObj.shift,
            seg: segs,
            pos: formObj.pos,
            date: formObj.date,
            created: new Date(),
            color:color,
            tag: {name:"DJ", reason: "Vacation", color: color}
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
                {...prev, one: {...segs.one, name:`Down:${new Date(downDate).toDateString().slice(3)}`}}
            )))
            setDisabled(false)
        }
    },[ downDate])

    useEffect(() => {
        console.log(formObj)
        if (formObj && posts[formObj.id]) {
            setModify(true)
            if (formObj.current.length > 1) {
                setSel(true)
                setSegs(
                    {
                        one: formObj.current[0],
                        two: formObj.current[1],
                        three: formObj.current[2],  
                    }
                )
            }
        } 
    },[formObj])

    

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
        
        let prompt = confirm(`Are you sure you want to DELETE the posting for ${shifts[formObj.shift].label}, ${formObj.posLabel} on ${new Date(formObj.date).toDateString()}?`) 
        
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
        toggleForm()
        setSel(false)
        setModify(false)
        setSegs({one:{name: '', forced: false, trade: false},two:{name: '', forced: false, trade: false},three:{name: '', forced: false, trade: false},})
        setColor('rgb(179, 182, 183, 0.7)')
        setDownDate(0)
        setDisabled(true)
        document.getElementById('date-picker').value = null
    }

    useEffect(() => {
        console.log({one:segs.one,two:segs.two,three:segs.three})
        if (segs.one?.name || segs.two?.name || segs.three?.name) {
            setDisabled(false)
        }
    },[segs])

    return (
        show ?
        <div className={popUp.backDrop}>
            <form 
            onSubmit={(e) => handleSubmit(e)} 
            className={popUp.form}
            action="posting"
            >

            <div className={` h-50 w-full flex justify-end mb-10`}>
                <div 
                className={button.greenText}
                onClick={() => closeForm()}>
                    <p>Close</p>
                </div>
            </div>

            <FormInput 
            id="standard-basic" 
            label="Position" 
            disabled 
            value={`${formObj?.posLabel} ${shifts[formObj.shift].label}` }
            />
            
            <FormInput 
            id="standard-basic"
            type="text"
            value={new Date(formObj?.date).toDateString()} 
            disabled
            label='Date of Vacantcy' 
            />

            <FormInput 
            type="date"
            id="date-picker" 
            label='Down Date'
            setValue={(e) => setDownDate(new Date(e.target.value).getTime()+(24*60*60*1000))} 
            
            />
            <div className={`w-full font-bold text-xl`}>                    
                <label className={`text-center`} >
                    <h6>Color</h6>
                    <select
                    className={`w-full text-center text-lg font-semibold text-black`} 
                    style={{backgroundColor:color}}  
                    onChange={(e) => setColor(e.target.value)} 
                    name="color" 
                    > 
                    {
                        colors.map(color => (
                            <option value={color.code}  style={{backgroundColor:color.code}} >
                            {color.name}  
                            </option>
                        ))
                    }
                    </select>

                </label>
                <label className={`text-center`}>
                    <h6>Fill Method</h6>
                    <div className={`flex w-full justify-around`}>
                        <button disabled={!sel} className={`${button.green} w-.5 disabled:border disabled:text-green`} onClick={(e)=> {e.preventDefault(); setSel(false)}}>Whole Shift</button>
                        <button disabled={sel} className={`${button.green} w-.5 disabled:border disabled:text-green`} onClick={(e)=> {e.preventDefault(); setSel(true)}}>Segments</button>
                    </div>
                </label>    
            </div>
            <div className={`flex-column m-.05 font-bold`}>
                <SegInput
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
                    className={`${button.red} w-.5`} 
                    variant="contained"
                    type='delete'
                    onClick={() => deletePost()}
                    >
                    Delete Posting
                    </button>
                }
                <button
                className={`${button.green} w-${modify? '.5': 'full'}`} 
                variant="contained"
                type='submit'
                disabled={disabled}
                >
                    {modify? 'Save Changes':'Create Post'}
                </button>
            </div>
            </form>
        </div>
        :''
    );
}

export default PopUpForm;

