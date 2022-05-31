import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import Select from '../inputs/Select';

function JobForm({users}) {
    
    const [{view}, dispatch] = useAuthState()

    const urls = {
        fs:{
            local:"http://localhost:5000/overtime-management-83008/us-central1/fsApp",
            prod:"https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp"
        },
        user:{
            local:"http://localhost:5000/overtime-management-83008/us-central1/app",
            prod:"https://us-central1-overtime-management-83008.cloudfunctions.net/app"
        }
    }
    const initialState = {
        label:"",
        id:"",
        group:"misc",
        order: view.length,
        dept: view[0].dept,
        // dept: "messages",
    }

    const [disabled, setDisabled] = useState(true)
    const [state, setState] = useState(initialState)
    const [uids, setUids] = useState([])

    const clear = () => {
        setState(initialState)
        setUids([])
    }

    const updateProfiles = (id) => {
        let update = []

        users &&
        users.map(user => {
            if (uids.includes(user.id)) {
                let obj = {
                    id: user.id, 
                    quals:user.quals
                }

                obj.quals.push(id)
                update.push(obj)
            }
        
            
        })

        const load = {
            coll:"users",
            docs: update,
            field:"quals", 
        }
        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        
        
        console.log(load)
        
        fetch(`${urls.fs.prod}/updateField`,init)
        .then(res => {
            console.log(res.text())
            users.map(user => {
                if (uids.includes(user.id)) {
                    let obj = user
                    obj.quals.push(id)
                    dispatch({
                        type: "ARR-REPLC-ELE",
                        name:"users",
                        dept:view[0].dept,
                        load: obj,
                    })
                } 
            })
        })

        clear()
        
    }

    const handleChange  = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        switch (e.target.name) {
            case "shift":
                if (state[e.target.value]) {
                    setState(prev => ({...prev, [e.target.value]:!prev[e.target.value]}))
                } else {
                    setState(prev => ({...prev, [e.target.value]: true}))
                }
                break
            case "user":
                let arr = []
                if (uids.includes(e.target.value)) {
                    for (const uid in uids) {
                        if (uids[uid] !== e.target.value) {
                            arr.push(uids[uid])
                        }
                    }
                    
                    setUids(arr)
                } else {
                    setUids(prev => ([...prev, e.target.value]))
                }
                break
            default:
            // console.log(e.target.name)
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        let load = state

        let randNum = Math.floor(Math.random() * (2000))
        for (const i in view) {
            if (view[i].id === state.group+randNum) {
                load = {...load, id:`${state.group}${randNum++}`}
            } else {
                load = {...load, id:`${state.group}${randNum}`}
            }
            
        }
        // console.log(load)
        
        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        fetch(`${urls.fs.local}/mkDoc`,init)
        .then(res => {
            console.log(res.body)
            dispatch({
                type: "ARR-PUSH",
                name:"view",
                load:load,
            })
            updateProfiles(load.id)
        })
    }

    useEffect(() => {
        console.log(state)
        console.log(uids)
        if (state.label.length > 0) {
            if (state.first || state.second || state.third || state.night) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(true)
        }
    },[state, uids])

    const styles = {
        main:`bg-purple rounded border-4 border-clearBlack w-[400px] h-min p-.02 m-.01`,
        banner:`text-center text-2xl font-bold`,
        field:`font-bold text-xl`,
        h3:`text-center text-xl font-semibold`,
        check:`bg-[#AEB6BF] border-2 border-clearBlack p-.02 rounded font-bold text-xl text-center `,
        selected:`bg-[#00FF66] p-.02 shadow-clearBlack shadow-inner rounded border-2 border-green font-bold text-xl text-center `,
        checkWrapper:`flex w-full justify-around my-10`,
        shiftWrapper:`border-2 mt-10`,
        submit:`${button.green} w-full text-xl mt-20 p-.01 rounded`,
    }
    return (
        <form className={styles.main}>
            <h1 className={styles.banner}>Add Job</h1>
            <FormInput
            style={styles.field}
            label="Job Label"
            name="label"
            type="text"
            value={state.label}
            setValue={handleChange}
            />
            <Select
            label="Group"
            name="group"
            value={state.group}
            setValue={handleChange}
            >
                <option value="misc" default >Misc</option>
            </Select>
            <div className={styles.shiftWrapper}>
            <h3 className={styles.h3}>
                Possible Shifts
            </h3>
            <div
            className={styles.checkWrapper}
            >
            {
                view[0].shifts.map(shift => (
                    <button
                    name="shift"
                    key={shift.label}
                    className={state[shift.id]? styles.selected : styles.check}
                    type="checkbox"
                    value={shift.id}
                    onClick={(e)=>handleChange(e)}
                    >
                        {shift.label}
                    </button>
                ))
            }
            </div>
            </div>
            <div>
            <h3 className={styles.h3}>
                Qualified Employees
            </h3>
                {
                    users &&
                    users.map(user => {
                        if (user.role === "ee") {
                            return (
                            <button
                            className={`w-.5 cursor-pointer border-2 border-clearBlack my-[5px] p-[5px] rounded ${uids.includes(user.id)? "bg-todayGreen p-.02 shadow-clearBlack shadow-inner font-semibold text-white":"bg-gray-light"}`}
                            value={user.id}
                            name="user"
                            onClick={(e)=> handleChange(e)}
                            key={user.id}
                            >
                                {user.dName}
                            </button>
                            )    
                        }
                    })
                }
            </div>
            <button
            className={styles.submit}
            type="submit"
            disabled={disabled}
            onClick={(e) => handelSubmit(e)}
            >
                Create New Job
            </button>
        </form>
    );
}

export default JobForm;