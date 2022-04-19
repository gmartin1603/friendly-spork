import React, { useEffect, useState } from 'react';
import { button, checkBox } from '../context/style/style';

//************ TODO ************** */
// bottom down transition for segment inputs on check
// place holder segment hours depnding on shift selected
// 

function MiscForm({cols, jobs, rota}) {

    const [disabled, setDisabled] = useState(true)

    const [state, setState] = useState({
        job: '',
        shift: '',
        down: 0,
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {},
        sun: {},
    })


    const shifts = [
        {label:'1st Shift', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']},
        {label:'2nd Shift', segs: ['3 PM - 11 PM','3 PM - 7 PM', '7 PM - 11 PM']},
        {label:'3rd Shift', segs: ['11 PM - 7 AM', '11 PM - 3 AM', '3 AM - 7 AM']},
        {label:'Night Shift', segs: ['7 PM - 7 AM', '7 PM - 11 PM', '11 PM - 3 AM', '3 AM - 7 AM',]},
    ]

    useEffect(() => {
        console.log(state)
        if (state.job && state.shift && (state.mon.id||state.tue.id||state.wed.id||state.thu.id||state.fri.id||state.sat.id||state.sun.id)) {
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
                    posts.push(
                        {
                            id: state[property].id,
                            seg: {one: state[property].seg.one, two: state[property].seg.two , three: state[property].seg.three },
                            created: new Date(),
                            down: state.down,
                            color: "rgb(214, 102, 255, 0.7)",
                            shift: state.shift,
                            pos: state.job,
                            date: state[property].date,
                        }
                    )   
                } else {
                    console.log(state[property])

                }
            }
            return posts
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
       const posts = await buildPosts()
        
       console.log(posts)

        const data = {
            coll: rota.dept.toString(),
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
            setState({
                job: '',
                shift: '',
                down: 0,
                mon: {},
                tue: {},
                wed: {},
                thu: {},
                fri: {},
                sat: {},
                sun: {},
            })
            document.getElementById('date-picker').value = null
        })
        .catch((err) => {
            console.warn(err)
        })

        
    }

    return (
        <div className={`bg-clearBlack w-.5 min-w-max border justify-center flex-column  p-.01`}>
            
            <div className={`bg-todayGreen text-center flex-column  w-full border`}>
                <h1 className={`text-2xl font-bold`}>Post by Week</h1>
                <select 
                className={` w-.45 my-.01 mx-.02`} 
                value={state.job}
                name="jobs" 
                onChange={(e) => setState((prev) => (
                    {
                        ...prev,
                        job: e.target.value
                    }
                ))}
                >
                    <option value="">Select Position</option>
                    {
                        jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.label}</option>
                        ))
                    }
                </select>
                <input 
                type="date" 
                className={`mx-.02 w-.45 text-center my-.01`}
                
                onChange={(e) => setState((prev) => (
                    {
                        ...prev,
                        down: new Date(e.target.value).getTime() + (24*60*60*1000)
                    }
                ))} 
                id="date-picker" 
                />
                <div className={`w-full flex justify-around text-center my-.02 font-bold`}>
                    
                    {
                        state.job.length > 0 &&
                        rota.shifts.map((shift,i) => (
                            <ShiftCheck
                            key={i}
                            label={shift.label}
                            shift={i}
                            state={state}
                            setState={setState}
                            />
                        ))
                    }
                    
                </div>
                
            </div>

            <div className={` w-max`}>
                <div className={`flex justify-between text-center text-lg my-20`}>
                    {
                        cols && state.shift &&
                        cols.map((col,i) => (
                            <DayBox
                            key={col.tag}
                            label={col.label}
                            segments={shifts[state.shift].segs}
                            day={col.tag.slice(0,3).toLowerCase()}
                            state={state}
                            setState={setState}
                            color={ i % 2 == 0? 'green':'todayGreen'}
                            />
                        ))
                    }
                    
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
                        <h6>{segments[1]}</h6>
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
                        <h6>{segments[2]}</h6>
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
                    segments[3] &&
                    <div>
                    <h6>{segments[3]}</h6>
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


