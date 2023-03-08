import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import Select from '../inputs/Select';

function JobForm() {

    const [{view, shifts, users, posts}, dispatch] = useAuthState()

    let url = ""
    if (process.env.NODE_ENV === "production") {
        url ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp"
    } else {
        url ="http://localhost:5001/overtime-management-83008/us-central1/fsApp"
    }


    const initialState = {
        label:"",
        group:"misc",
        order: view.length,
        dept: view[0].dept,
        // test collection
        // dept: "messages",
    }
    const initialFilter = {
        groups: ["misc"],
        shifts: [],
    }

    const [disabled, setDisabled] = useState(true)
    const [disableCanc, setDisableCanc] = useState(false)
    const [state, setState] = useState(initialState)
    const [uids, setUids] = useState([])
    const [prevUids, setPrevUids] = useState([])
    const [mode, setMode] = useState(-1)
    const [filter, setFilter] = useState(initialFilter)
    const [options, setOptions] = useState([])

    const clear = (e) => {
        if (e) {
            e.preventDefault()
        }
        setState(initialState)
        setFilter(initialFilter)
        setDisableCanc(false)
        setUids([])
        setMode(-1)
    }

    const handleFilterChange = (e) => {
        e.preventDefault()
        let arr = []
        switch (e.target.name) {
            case "group":
                if (filter.groups.includes(e.target.value)) {
                    filter.groups.forEach(str => {
                        if (str !== e.target.value) {
                            arr.push(str)
                        }
                    })
                } else {
                    arr = [...filter.groups, e.target.value]
                }
                return setFilter(prev => (
                    {...prev, groups: arr}
                ))
            default:
                console.log("filter change switch default")
                setFilter(initialFilter)
        }
    }

    const findUsers = (id) => {
        let arr = []
        users[view[0].dept].map(user => {
            if (user.quals.includes(id)) {
                arr.push(user.id)
            }
        })
        setUids(arr)
        // setPrevUids(arr)
    }

    const updateProfiles = (id, arr) => {
        let update = []
        console.log(arr)
        users &&
        users[view[0].dept].map(user => {
            if (user.quals.includes(id)) {
                if (!arr.includes(user.id)) {
                    let arr = []
                    user.quals.forEach(qual => {
                        if (qual !== id) {
                            arr.push(qual)
                        }
                    })
                    update.push({id: user.id, quals: arr})
                }
            } else {
                if (arr.includes(user.id)) {
                    update.push({id: user.id, quals: [...user.quals, id]})
                }
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

        fetch(`${url}/updateField`,init)
        .then(res => {
            console.log(res.text())
            clear()
        })

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
            case "job":
                view.slice(1).map(job => {
                    let obj = {}
                    if (job.id === e.target.value) {
                        obj = {...state,
                            label:job.label,
                            id:job.id,
                            group:job.group,
                            order: job.order,
                        }
                        // console.log(job)
                        shifts.map(shift => {
                            if (job[shift.id]) {
                                obj[shift.id] = job[shift.id]
                            }
                        })
                        setState(obj)
                    }
                })
                findUsers(e.target.value)
                setMode(2)
                break
            default:
            // console.log(e.target.name)
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        setDisabled(true)
        setDisableCanc(true)
        let load = {}
        if (!state.id) {
            // job id assign
            let randNum = Math.floor(Math.random() * (2000))
            for (const i in view) {
                if (view[i].id === state.group+randNum) {
                    load = {...state, id:`${state.group}${randNum++}`}
                } else {
                    load = {...state, id:`${state.group}${randNum}`}
                }

            }
        } else {
            load = {...state}
        }

        // console.log(url)
        // console.log(load)

        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        fetch(`${url}/mkDoc`,init)
        .then(res => {
            console.log(res.text())
            updateProfiles(load.id,uids)
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let prompt = confirm(`Are you sure you want to delete ${state.label.toUpperCase()} from the database?`)
        let arr = []
        if (prompt) {
            let prompt2 = confirm(`Deleting ${state.label.toUpperCase()} will also permenetly delete ALL postings created for this job. Continue with ${state.label.toUpperCase()} DELETE?`)
            if (prompt2) {
                setDisabled(true)
                setDisableCanc(true)
                setUids([])
                // setDisabled(true)
                // setDisableCanc(true)
                Object.keys(posts).forEach(key => {
                    // console.log(posts[key])
                    if (posts[key].pos === state.id) {
                        // console.log("DELETE", posts[key].id)
                        arr.push(posts[key].id)
                    }
                })
                // console.log(arr)
            } else return
        } else return
        const load = {
            dept: state.dept,
            posts: arr,
            job: state.id,
        }
        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        console.log(load)
        fetch(`${url}/deleteJob`,init)
        .then(res => {
            console.log(res.text())
            updateProfiles(load.job, [])
        })
    }

    useEffect(() => {
        // console.log("STATE: ", state)
        // console.log(uids)
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

    useEffect(() => {
        // console.log(view[0])
        let arr = []
        if (view.length > 0) {
            view.slice(1).map(job => {
                if (filter.groups.includes(job.group)){
                    arr.push(job)
                }
            })
            setOptions(arr)
        }
    },[view, filter])

    const styles = {
        main:`bg-white rounded-xl text-green rounded border-4 border-clearBlack w-[400px] h-min p-.02 m-.01`,
        banner:`text-center text-2xl font-bold`,
        initCont:``,
        btnCont:`w-full flex justify-around`,
        field:`font-bold text-xl`,
        h3:`text-center text-xl font-semibold my-10`,
        check:`bg-[#AEB6BF] border-2 border-clearBlack p-.02 rounded font-bold text-xl text-center `,
        checkWrapper:`flex flex-wrap w-full justify-around my-10`,
        shiftWrapper:`border-2 mt-10`,
        submit:`${button.green} w-full text-xl mt-20 p-.01 rounded`,
        cancel:`${button.red} w-full text-xl mt-20 p-.01 rounded`,
        selected:`shadow-clearBlack shadow-inner font-semibold text-white`,
        default:`bg-gray-light`,
        filterBtn:`${button.green} p-10 my-.01`,
        select:`w-full text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`,

    }
    return (
        <form className={styles.main}>
            <h1 className={styles.banner}>Job Form</h1>
            {mode < 0?
                // mode = -1
                <div className={styles.initCont}>
                    <h3 className={styles.h3}>
                        Schedule Group Filter
                    </h3>
                    <div className={styles.btnCont}>
                        { view.length > 0 &&
                            view[0].groups.map(group => (
                                <button
                                className={`${styles.filterBtn} ${filter.groups.includes(group)? styles.selected : styles.default}`}
                                value={group}
                                key={group}
                                name="group"
                                onClick={(e) => handleFilterChange(e)}
                                >
                                    {group.toUpperCase()}
                                </button>
                            ))
                        }
                    </div>
                    <select
                    name="job"
                    className={styles.select}
                    value={state.label}
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="" default >Select Job</option>
                        {options.length > 0 &&
                            options.map(option => (
                                <option
                                value={option.id}
                                key={option.id}
                                >
                                    {option.label}
                                </option>
                            ))
                        }
                    </select>
                    <button
                    className={styles.submit}
                    onClick={(e) => {e.preventDefault(); setMode(1)}}
                    >
                        Create New Misc Job
                    </button>
                </div>
            :
                // mode > 0
                <>
                <h1 className={styles.banner}>{mode < 2? "Create Job":"Modify Job"}</h1>
                <FormInput
                style={styles.field}
                label="Job Name"
                name="label"
                type="text"
                value={state.label}
                setValue={handleChange}
                />

                {/* <Select
                label="Schedule Group"
                name="group"
                value={state.group}
                setValue={handleChange}
                >
                    <option value="misc" default >Misc</option>
                </Select> */}
                <div className={styles.shiftWrapper}>
                    <h3 className={styles.h3}>
                        Assign Possible Shifts
                    </h3>
                    <div
                    className={styles.checkWrapper}
                    >
                    {
                        shifts.map(shift => (
                            <button
                            name="shift"
                            key={shift.label}
                            className={`${styles.filterBtn} ${state[shift.id]? styles.selected : styles.check}`}
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
                    Assign Qualified Employees
                </h3>
                    {
                        users &&
                        users[view[0].dept].map(user => {
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
                <div className={styles.btnCont}>
                    <button
                    className={styles.submit}
                    type="submit"
                    disabled={disabled}
                    onClick={(e) => handelSubmit(e)}
                    >
                        {mode < 2? "Create New Job":"Save Changes"}
                    </button>
                    <button
                    className={styles.cancel}
                    type="submit"
                    disabled={disableCanc}
                    onClick={(e) => clear(e)}
                    >
                        Cancel
                    </button>
                </div>
                {mode > 1 &&
                    state.group === "misc" &&
                    <button
                    className={styles.cancel}
                    onClick={(e) => handleDelete(e)}
                    disabled={disableCanc}
                    >
                        Delete Job
                    </button>
                }
            </>
            }
        </form>
    );
}

export default JobForm;