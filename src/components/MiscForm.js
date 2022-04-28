import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, checkBox, popUp } from '../context/style/style';
import FormInput from './FormInput';

//************ TODO ************** */
// bottom down transition for segment inputs on check
// place holder segment hours depnding on shift selected
// 

function MiscForm({ shifts}) {

    const [{formObj},dispatch] = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [postTag, setPostTag] = useState({
        name: '',
        reason: 'Vacation',
        color: 'white'
    })

    const [state, setState] = useState({
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
    })

    const colors = [
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

    const handleChange = (e) => {

        if (e.target.id === "job") {
            setState((prev) => (
                {...prev, job: e.target.value}
            ))
            
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
        console.log(postTag)
    },[postTag])

    useEffect(() => {
        console.log(state)
        if (state.job && state.shift >= 0 && (state.mon.id||state.tue.id||state.wed.id||state.thu.id||state.fri.id||state.sat.id||state.sun.id)) {
            setDisabled(false)
        }else {
            setDisabled(true)
        }

        
    }, [state])

    const buildPosts = async () => {
        let posts = []
       
    
            for (const property in state) {
    
                if (state[property].id) {
                    console.log(state[property])
                    if (postTag.name) {
                        
                        posts.push(
                            {
                                id: state[property].id,
                                seg: {one: state[property].seg.one, two: state[property].seg.two , three: state[property].seg.three },
                                created: new Date(),
                                down: state.down,
                                color: postTag.color,
                                shift: state.shift,
                                pos: state.job,
                                date: state[property].date,
                                tag: postTag
                            }
                        )   
                    } else {

                        posts.push(
                            {
                                id: state[property].id,
                                seg: {one: state[property].seg.one, two: state[property].seg.two , three: state[property].seg.three },
                                created: new Date(),
                                down: state.down,
                                color: postTag.color,
                                shift: state.shift,
                                pos: state.job,
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
        
       const posts = await buildPosts()
        
       console.log(posts)

        const data = {
            coll: formObj.dept.toString(),
            // coll: 'messages',
            doc: 'rota',
            field: 'posts',
            data: posts,
        }

        // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/updateDoc"
        const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/updateDoc"

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
        }).then((res) => {
            console.log(res)
            dispatch({type: "CLOSE-FORM", name: "showWeek"})
            setState({
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
            })
            setPostTag({name: '', reason: 'Vacation', color: ''})
            document.getElementById('date-picker').value = null
        })
        .catch((err) => {
            console.warn(err)
        })

        
    }

    const close = () => {
        dispatch(
            {
                type: "CLOSE-FORM",
                name: "showWeek",
                
            }
        )
        setState({
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
        })
        setPostTag({name: '', reason: 'Vacation', color: 'white'})
        document.getElementById('date-picker').value = null
    }
    

    return (
        <div className={popUp.backDrop} >
            <div className={`bg-clearBlack rounded  w-max border justify-center flex-column  p-.01`}>
                
                <div className={`bg-todayGreen  text-center flex-column  w-full border`}>

                    <label htmlFor=""
                    className={`w-full flex justify-end items-center`}
                    >
                        <h1 className={`w-.8 text-2xl font-bold`}>Post by Week</h1>
                        <div 
                        className={`${button.redText}`}
                        onClick={() => close()}>
                            <p>Close</p>
                        </div>
                    </label>
                </div>
                <div className={`flex`}>

                    <div className={`h-max px-20 py-35 rounded my-20 flex-column justify-around bg-white `}>
                        {
                            formObj.pos?
                            <FormInput 
                            type="text" 
                            label="Position" 
                            disabled={formObj.pos? true : false} 
                            value={formObj.pos? `${formObj.pos.label} ${shifts[formObj.shift].label} Shift`: ''}
                            
                            />
                            :
                            <label className={`text-center text-xl font-bold flex items-end justify-around`} >
                                <h6 className={`p-.01 border-b-2 border-b-black w-.5 text-left`}>Position</h6>
                                {
                                    formObj.options &&
                                <select
                                className={`w-.5 text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`} 
                                onChange={(e) => handleChange(e)} 
                                name="job" 
                                id="job" 
                                > 
                                <option value="" hidden> Select Job </option>
                                {
                                    formObj.options.length > 0?
                                
                                    formObj.options.map((job,i) => {
                                        
                                        return (
                                        <option value={job.id}  >
                                        {`${job.label} ${shifts[formObj.shift].label} Shift`}  
                                        </option>
                                    )})
                                    :
                                    <option value="" >No Misc Jobs Created</option>
                                }
                                </select>
                                }
                            </label>
                        }
                        
                            <FormInput 
                            type="date" 
                            label="Down Date"
                            onChange={(e) => setState((prev) => (
                                {
                                    ...prev,
                                    down: new Date(e.target.value).getTime() + (24*60*60*1000)
                                }
                                ))} 
                            id="date-picker" 
                            />
                            {
                                formObj.pos &&
                                <>
                                <label className={`text-center text-xl font-bold flex items-end justify-around`} >
                                    <h6 className={`p-.01 border-b-2 border-b-black w-.5 text-left`}>Color</h6>
                                    <select
                                    className={`w-.5 text-center text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`} 
                                    style={{backgroundColor:postTag.color}} 
                                    value={postTag.color} 
                                    onChange={(e) => {handleChange(e)}} 
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
                                    </select>

                                </label>
                                <FormInput 
                                type="text" 
                                label="Tag Name" 
                                // disabled 
                                name="name"
                                setValue={handleChange}
                                value={postTag.name}
                                />
                                <FormInput 
                                type="text" 
                                label="Tag Reason"
                                name="reason"
                                setValue={handleChange}
                                value={postTag.reason}
                                
                                />
                                </>
                            }
                    </div>
                    
                

                <div className={` w-1k`}>
                    <div className={`flex justify-between text-center text-lg my-20`}>
                        {
                            formObj.cols && 
                            state.job &&
                            state.shift >= 0 &&
                            formObj.cols.map((col,i) => (
                                <DayBox
                                key={col.tag}
                                label={col.label}
                                segments={shifts[formObj.shift].segs}
                                day={col.tag.slice(0,3).toLowerCase()}
                                state={state}
                                setState={setState}
                                color={ i % 2 == 0? 'green':'todayGreen'}
                                />
                            ))
                        }
                        
                    </div>   
                </div>
                </div>
                <div className={`flex justify-center`}>
                    {
                        state.job.length > 0 &&
                        <button 
                        className={button.green}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >SUBMIT</button>
                    }    
                </div>
                </div>
                
        </div>
    );
}

export default MiscForm;


function ShiftCheck({label, shift, state, setState}) {

    const [check, setCheck] = useState(false)

    const handleChange = (e) => {
        // e.preventDefault();
        if (state.shift.length > 0 && check) {
            setState((prev) => ({
                ...prev, shift: ''
            }))
            setCheck(!check)
        } else if (!state.shift > 0 && !check) {
            setState((prev) => ({
                ...prev, shift: e.target.name
            }))
            setCheck(!check)
        } 
    }

    useEffect(() => {
        
        if (state.shift === '' && check) {

            setCheck(!check)
        }

    },[state.shift])

    return (
        <div className={`border w-140`}>
            <h6>{label}</h6>
            <input 
            className={checkBox.standard} 
            type="checkbox" 
            name={shift} 
            checked={check}
            onChange={(e) => handleChange(e)}
            />
              
        </div>
    );
}

const DayBox = ({label, segments, day, state, setState, color}) => {

    const [show, setShow] = useState(false)

    let post = {}

    const handleChange = (e) => {
        console.log(e.target.name+' '+e.target.type)
        let update = {}
        
        if (e.target.type === 'checkbox') {
            update = {...state[day]?.seg, [e.target.id]:{...state[day]?.seg[e.target.id], [e.target.name]: e.target.checked},}
        } else {
            update = {...state[day]?.seg, [e.target.id]:{...state[day]?.seg[e.target.id],[e.target.name]: e.target.value}}
        }


        post.id = `${state.job} ${label} ${state.shift}`
        post.date = label
        post.seg = update


        setState(((prev) => (
            {...prev, [day]: post}
        )))

    }

    useEffect(() => {
        if (show && state.down > 0) {
            
            post.id = `${state.job} ${label} ${state.shift}`
            post.date = label
            post.seg = {one: {name:`Down:${new Date(state.down).toDateString().slice(3,10)}`, forced:false,trade:false}, two: {name:'', forced:false,trade:false}, three: {name:'', forced:false,trade:false}}
            setState(((prev) => (
                {...prev, [day]: post}
                )))
        }
        else if (show) {
            post.id = `${state.job} ${label} ${state.shift}`
            post.date = label
            post.seg = {one: {name:'', forced:false,trade:false}, two: {name:'', forced:false,trade:false}, three: {name:'', forced:false,trade:false}}
            setState(((prev) => (
                {...prev, [day]: post}
            )))            
        } else {
            post = {}
            setState(((prev) => (
                {...prev, [day]: {}}
            )))
        }
    },[show,state.down])
    
    return (
        <div className={`bg-${color} border w-140 h-max px-.01 py-.02`}>
            <h6>{new Date(label).toDateString().slice(0,3)} <br /> {new Date(label).toDateString().slice(3,10)}</h6>
            <input type="checkbox" onChange={(e) => setShow(!show)} id="" />
            {
            show &&

                <div >
                    <div>
                        <h6>{segments.one}</h6>
                        <input 
                        className={`w-120 text-center`}
                        placeholder={state.down > 0? `Down:${new Date(state.down).toDateString().slice(3)}`: ''} 
                        type="text" 
                        name='name' 
                        id="one" 
                        value={state[day]?.one}
                        onChange={(e)=> handleChange(e)}
                        />
                        <div className={`flex justify-around`}>
                            <label>
                            <h6>Forced</h6>
                            <input
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="forced" 
                            id="one" 
                            />
                            </label>
                            <label>
                            <h6>Trade</h6>
                            <input 
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="trade" 
                            id="one" 
                            />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h6>{segments.two}</h6>
                        <input 
                        className={`w-120 text-center`}
                        placeholder={state.down > 0? `Down:${new Date(state.down).toDateString().slice(3)}`:''} 
                        type="text" 
                        name='name' 
                        id="two" 
                        value={state[day]?.two}
                        onChange={(e)=> handleChange(e)}
                        />
                        <div className={`flex justify-around`}>
                            <label>
                            <h6>Forced</h6>
                            <input
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="forced" 
                            id="two" 
                            />
                            </label>
                            <label>
                            <h6>Trade</h6>
                            <input 
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="trade" 
                            id="two" 
                            />
                            </label>
                        </div>
                    </div>
                {
                    segments.three &&
                    <div>
                    <h6>{segments.three}</h6>
                    <input 
                    className={`w-120 text-center`}
                    placeholder={state.down > 0? `Down:${new Date(state.down).toDateString().slice(3)}`:''}
                    type="text" 
                    name='name' 
                    id="three" 
                    value={state[day]?.three}
                    onChange={(e)=> handleChange(e)}
                    />
                    <div className={`flex justify-around`}>
                            <label>
                            <h6>Forced</h6>
                            <input
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="forced" 
                            id="three" 
                            />
                            </label>
                            <label>
                            <h6>Trade</h6>
                            <input  
                            onChange={(e) => handleChange(e)} 
                            type="checkbox" 
                            name="trade" 
                            id="three" 
                            />
                            </label>
                        </div>
                    </div>
                }
                </div>

            } 
        </div>        
    )

}


