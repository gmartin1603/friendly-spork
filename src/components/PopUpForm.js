import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';
import style from '../context/style/style';

//************* TODO ******************* */
// 2 button toggle for shift filling *Finish Styling
// 


function PopUpForm({posts, show}) {

    const {formObj, toggleForm} = useAuthState({})
    const [downDate, setDownDate] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [sel, setSel] = useState(false)
    const [one, setOne] = useState({name:'', forced: false})
    const [two, setTwo] = useState({name:'', forced: false})
    const [three , setThree] = useState({name:'', forced: false})
    const [color, setColor] = useState('rgb(179, 182, 183, 0.7)')

    const shifts = {
        1: {label:'1st Shift', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']},
        2: {label:'2nd Shift', segs: ['3 PM - 11 PM','3 PM - 7 PM', '7 PM - 11 PM']},
        3: {label:'3rd Shift', segs: ['11 PM - 7 AM', '11 PM - 3 AM', '3 AM - 7 AM']},
        4: {label:'Night Shift', segs: ['7 PM - 7 AM', '7 PM - 11 PM', '11 PM - 3 AM', '3 AM - 7 AM',]},
    }

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
        let value = ''
        if(e.target.value) {
            value = `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
        }

        switch (e.target.name) {
            case 'one':
                setOne((prev)=>({...prev,name:value}))
            break;
            case 'two':
                setTwo((prev)=>({...prev,name:value}))
                break;
            case 'three':
                setThree((prev)=>({...prev,name:value}))
            default:
                console.warn('NO TARGET NAME')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let temp = {}
        if (sel) {
            if(one.name.length > 0) {
                temp.one = one
            } else  temp.one = {name:formObj.current, forced:false}
            
            if(two.name.length > 0) {
                temp.two = two
            } else  temp.two = {name:formObj.current, forced:false}
            if (formObj.shift === 4) {
                if(three.name.length > 0) {
                    temp.three = three
                } else  temp.three = {name:formObj.current, forced:false}
            } else {
                temp.three = {name: '', forced: false}
            }
            
        } else {
            temp = {
                one: one,
                two: two,
                three: three,
            }

        }
        const post = {
            id: formObj.id,
            shift: formObj.shift,
            seg: temp,
            pos: formObj.pos,
            date: formObj.date,
            created: new Date(),
            color:color,
        }
        console.log(post)
        const data = {
            coll: formObj.dept.toString(),
            // coll: 'messages',
            doc: 'rota',
            field: 'posts',
            data: [post],
        }

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
    }

    useEffect(() => {
        if (downDate > 0) {
            setOne({name:`Down:${new Date(downDate).toDateString().slice(3)}`})
            setDisabled(false)
        }
    },[ downDate])

    useEffect(() => {
        console.log(formObj?.current)
        if (typeof(formObj?.current) === 'object') {
            if (formObj.current[1]?.name.length > 0){
                setSel(true)
                if(formObj.current[2]?.name.length > 0){
                    setOne(formObj.current[0])
                    setTwo(formObj.current[1])
                    setThree(formObj.current[2])
                }
                else {
                    setOne(formObj.current[0])
                    setTwo(formObj.current[1])
                }
            } else {
                setOne(formObj.current[0])
            }
        } 
        
    },[formObj ])

    const deletePost = async () => {
        console.log(formObj)
        const request = {
            coll: formObj.dept.toString(),
            doc: "rota",
            field: formObj.id,
            nestedObj: "posts",
        }
        // test request load pointing to a non production collection in firestore
        const tRequest = {
            coll: 'messages',
            doc: "XjUnZSWgy67XrX2ESn6i",
            nestedObj: "junk",
            field: 'foo',
        }

        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/deleteDocField"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/deleteDocField"
        
        let prompt = confirm(`Are you sure you want to DELETE the posting for ${shifts[formObj.shift].label}, ${formObj.posLabel} on ${new Date(formObj.date).toDateString()}?`) 
        
        if (prompt) {
            console.log("Confirmed")
            await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'text/plain',
                },
                // **REQUIRED** Double Quotes for JSON keys
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
        setOne({name:'', forced: false})
        setTwo({name:'', forced: false})
        setThree({name:'', forced: false})
        setColor('rgb(179, 182, 183, 0.7)')
        setDownDate(0)
        document.getElementById('date-picker').value = null
    }

    useEffect(() => {
        console.log({one:one,two:two,three:three})
        if (one.name.length > 0 || two.name.length > 0 || three.name.length > 0) {
            setDisabled(false)
        }
    },[one,two,three])

    return (
        show ?
        <BackDrop>
            <Form onSubmit={(e) => handleSubmit(e)} action="posting">
                {
                    posts[formObj.id] &&
                    <div 
                    className={`${style.button} `}
                    onClick={() => deletePost()}
                    > 
                    Delete Posting 
                    </div>
                }
                <Close onClick={() => closeForm()}>
                    <p className={`mr-.05 font-extrabold text-lg`} >Close</p>
                </Close>
                <h1 >New Overtime Posting</h1>
            <TextField 
            id="standard-basic" 
            label="Position" 
            variant="standard" 
            value={`${formObj?.posLabel} ${shifts[formObj.shift].label}` }
            InputLabelProps={{
                shrink: true,
              }}
            />
            <span>
            <TextField 
            id="standard-basic"
            type="text"
            value={new Date(formObj?.date).toDateString()} 
            variant="standard"
            label='Date of Vacantcy' 
            InputLabelProps={{
                shrink: true,
              }}
            />
            </span>
            <Row>

            <TextField 
            id="standard-basic" 
            label="Shift" 
            variant="standard" 
            value={shifts[formObj.shift].label }
            InputLabelProps={{
                shrink: true,
              }}
            />
            <input type="date" name="" id="date-picker" onChange={(e) => setDownDate(new Date(e.target.value).getTime())} />
                <div className={`w-full `}>
                     
                <label htmlFor="">
                    <h6>Color</h6>
                    <select style={{backgroundColor:color}}  onChange={(e) => setColor(e.target.value)} name="color" >
                        
                        {
                            colors.map(color => (
                                <option value={color.code}  style={{backgroundColor:color.code}} >
                                {color.name}  
                                </option>
                            ))
                        }
                    </select>

                </label>
                <label htmlFor="">
                    <h6>Fill Method</h6>
                    <div className={`flex`}>
                        <div className={!sel? `${style.button} w-.5 cursor-none`: `${style.button} w-.5 bg-gray-dark text-white`} onClick={(e)=> {e.preventDefault(); setSel(false)}}>Whole Shift</div>
                        <div className={sel? `${style.button} w-.5 cursor-none`: `${style.button} w-.5 bg-gray-dark text-white`} onClick={(e)=> {e.preventDefault(); setSel(true)}}>Segments</div>
                    </div>
                </label>
                    
                </div>
            <div className={`flex-column m-.05 `}>
                <label htmlFor="one"> {sel ? shifts[formObj.shift].segs[1] : shifts[formObj.shift].segs[0]} </label>
                <div className={`flex `}>
                    <input className={`bg-gray-light w-.5 my-10`} type="text" value={one.name} placeholder={downDate>0? `Down:${new Date(downDate).toDateString().slice(3)}`:formObj.current} name="one" id="one" onChange={(e) => handleChange(e)} />
                    <div className={`flex justify-around text-center w-full`}>
                        <label htmlFor="force_one"> 
                            <h6>Forced</h6>
                            <input type="checkbox" className={`m-.02 `} checked={one.forced} onChange={()=>setOne((prev => ({...prev, forced: !prev.forced})))} />    
                        </label>
                        <label htmlFor="trade_one"> 
                            <h6>Trade</h6>
                            <input type="checkbox" className={`m-.02 `} checked={one.trade} onChange={()=>setOne((prev => ({...prev, trade: !prev.trade})))} />    
                        </label>

                    </div>
                </div>
                    
                {
                    sel &&
                    <div>
                        <label htmlFor="two"> {shifts[formObj.shift].segs[2]} </label> 
                        <div className={`flex`}>
                            <input className={`bg-gray-light w-.5 my-10`} type="text" placeholder={formObj.current} value={two.name} onChange={(e) => handleChange(e)} name="two" id="two" />
                            <div className={`flex justify-around text-center w-full`}>
                                <label htmlFor="force_two"> 
                                    <h6>Forced</h6>
                                    <input type="checkbox" className={`m-.02 `} checked={two.forced} onChange={()=>setTwo((prev => ({...prev, forced: !prev.forced})))} />    
                                </label>
                                <label htmlFor="trade_two"> 
                                    <h6>Trade</h6>
                                    <input type="checkbox" className={`m-.02 `} checked={two.trade} onChange={()=>setTwo((prev => ({...prev, trade: !prev.trade})))} />    
                                </label>
                            </div>
                        </div>  
                    </div>

                }
                {
                    formObj.shift === 4 && sel?
                    
                    <div>
                    <label htmlFor="three"> {shifts[formObj.shift].segs[3]} </label> 
                    <div className={`flex`}>
                        <input 
                        className={`bg-gray-light w-.5 my-10`} 
                        type="text" 
                        placeholder={formObj.current} 
                        value={three.name} 
                        onChange={(e) => handleChange(e)} 
                        name="three" 
                        id="three" />
                        <div className={`flex justify-around text-center w-full`}>
                            <label htmlFor="force_three"> 
                                <h6>Forced</h6>
                                <input type="checkbox" className={`m-.02 `} checked={three.forced} onChange={()=>setThree((prev => ({...prev, forced: !prev.forced})))} />    
                            </label>
                            <label htmlFor="trade_two"> 
                                <h6>Trade</h6>
                                <input type="checkbox" className={`m-.02 `} checked={three.trade} onChange={()=>setThree((prev => ({...prev, trade: !prev.trade})))} />    
                            </label>
                        </div>
                    </div>  
                </div>
                    : ''
                }   
            </div>
                </Row>
                <Button 
                variant="contained"
                type='submit'
                disabled={disabled}
                >Post</Button>
            </Form>
        </BackDrop>
        :''
    );
}

export default PopUpForm;

const BackDrop = styled.div`
    height: 100vh;
    width: 100vw;
    z-index: 100;
    position: fixed;
    top: 0;
    background-color: rgb(9, 0, 12, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    
    
`
    const Form = styled.form`
    color: #228B22;
    background-color: white;
    display: flex;
    align-items: space-around;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: column;
    width: 350px;
    margin-top: 2%;
    padding: 2%;
    border-radius: 50px;
    button {
        background-color: green; 
        color: white;
    }
    button:disabled {
        background-color: light grey;
    }

`
const Close = styled.div`
    width: 100%;
    text-align: right;
    cursor: pointer;
`
const Row = styled.div`

`