import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import Select from '../inputs/Select';

function JobForm(props) {

    const [{view}, dispatch] = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [state, setState] = useState({
        label:"",
        id:"",
        group:"misc",
        order: view.length,
        dept: view[0].dept,
    })

    const clear = () => {
        setState({
            label:"",
            id:"",
            group:"misc",
            order: view.length
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
            default:
            // console.log(e.target.name)
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        let load = state
        let randNum = Math.floor(Math.random() * (200))
        for (const i in view) {
            if (view[i].id === state.group+randNum) {
                load = {...load, id:`${state.group}${randNum++}`}
            } else {
                load = {...load, id:`${state.group}${randNum}`}
            }
            
        }
        // console.log(load)
        
        const request = `https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/mkDoc`
        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        fetch(request,init)
        .then(res => {
            console.log(res.json)
            clear()
        })
    }

    useEffect(() => {
        // console.log(state)
        if (state.label.length > 0) {
            if (state.first || state.second || state.third || state.night) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(true)
        }
    },[state])

    const styles = {
        main:`bg-purple rounded border-4 border-clearBlack w-300 h-min p-.02 m-.01`,
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