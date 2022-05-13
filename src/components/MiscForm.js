import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import FormInput from './FormInput';
import DayBox from './inputs/DayBox';
import Select from './inputs/Select';

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
            
        } else if (e.target.id === "date"){
            setState((prev) => (
                {
                    ...prev,
                    down: new Date(e.target.value).getTime() + (24*60*60*1000)
                }
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
        // console.log(state)
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
    }
    
    const styles = {
        backDrop: ` h-full w-full fixed top-0 left-0 z-10 bg-clearBlack flex items-center justify-center `,
        main:`bg-gray-light w-max rounded border justify-center flex-column  p-.01`,
        headContainer:`bg-todayGreen  text-center flex items-center justify-end  w-full border`,
        inputContainer:`h-max px-.01 py-.02 rounded my-10 flex justify-around  items-end bg-white border-2`,
        field:`font-bold text-xl`,
        weekContainer:`min-w-[1100px] w-max flex justify-around text-center  my-20`,
        submit:`${button.green} p-10 text-2xl`,
    }

    return (
        <div className={styles.backDrop} >
            <div className={styles.main}>
                
                <div className={styles.headContainer}>
                    <h1 
                    className={`w-.8 text-2xl font-bold`}
                    >
                        Post by Week
                    </h1>
                    <div 
                    className={`${button.redText}`}
                    onClick={() => close()}
                    >
                        <p>Close</p>
                    </div>
                </div>

                    <div className={styles.inputContainer}>
                        {
                            formObj.pos?
                            <FormInput 
                            type="text"
                            style={styles.field} 
                            width=".25"
                            label="Position" 
                            disabled={formObj.pos? true : false} 
                            value={formObj.pos? `${formObj.pos.label} ${shifts[formObj.shift].label} Shift`: ''}
                            
                            />
                            :
                            <>
                            {
                                formObj.options &&
                            <Select label="Position"
                            width=".25"
                            setValue={handleChange} 
                            name="job" 
                            id="job" 
                            > 
                            <option value="" hidden> Select Job </option>
                            {
                                formObj.options.length > 0?
                            
                                formObj.options.map((job,i) => {
                                    if (job[shifts[formObj.shift].id]) {
                                        return (
                                            <option value={job.id}  >
                                            {`${job.label} ${shifts[formObj.shift].label} Shift`}  
                                            </option>
                                        )
                                    }
                                })
                                :
                                <option value="" >No Misc Jobs Created</option>
                            }
                            </Select>
                            }
                            </>
                        }
                        
                            <FormInput label="Down Date"
                            style={styles.field}
                            type="date" 
                            setValue={handleChange} 
                            id="date" 
                            />
                            {
                                formObj.pos && formObj.pos.group !== "misc" &&
                                <>
                                <Select label="Color"
                                width=".25"
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
                                        <option value={color.code} key={color.code}  style={{backgroundColor:color.code}} >
                                        {color.name}  
                                        </option>
                                    )})
                                }
                                </Select>
                                
                                <FormInput 
                                style={styles.field}
                                type="text" 
                                label="Tag Name" 
                                // disabled 
                                name="name"
                                setValue={handleChange}
                                value={postTag.name}
                                />
                                <FormInput 
                                style={styles.field}
                                type="text" 
                                label="Tag Reason"
                                name="reason"
                                setValue={handleChange}
                                value={postTag.reason}
                                
                                />
                                </>
                            }
                    </div>

                    <div className={styles.weekContainer}>
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
                <div className={`flex justify-center`}>
                    {
                        state.job.length > 0 &&
                        <button 
                        className={styles.submit}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >Create Postings</button>
                    }    
                </div>
                </div>
                
        </div>
    );
}

export default MiscForm;



