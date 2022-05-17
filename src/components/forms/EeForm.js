
import { reauthenticateWithCredential} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import Select from '../inputs/Select';

function EeForm(props) {

    const initalState = {
        profile: {
            name: {first:'',last:''},
            dName: '',
            startDate:'',
            phone: '',
            quals: [],
            role: '',
            level:-1,
            dept:[],
        },
        auth: {email: '',password: ''}
    }
    const [{view, colls, profile},dispatch] = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [auth,setAuth] = useState(initalState.auth)
    const [state, setState] = useState(initalState.profile)
    const [mode, setMode] = useState(-1)

    const quals = [
        {label:"Packaging", qual:"pack"},
        {label:"Operator", qual:"op"},
        {label:"Misc Jobs", qual:"misc"},
    ]

    const roles = [
        {label:"Employee", role:"ee",level:3},
        {label:"Control Room", role: "op",level:2},
        {label:"Supervisor", role: "sup",level:1},
        {label:"Admin", role: "admin",level:0},
    ]

    const clearForm = (e) => {
        if (e) {
            e.preventDefault()
        }
        setMode(-1)
        setState(initalState.profile)
        setAuth(initalState.auth)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(state)
        
        if (auth.email || auth.password) {
            let authUpdate = {}
            if (auth.email.length > 5) {
                authUpdate.email = auth.email
            }
            if (auth.password.length > 5) {
                authUpdate.password = auth.password
            }

            props.onSubmit({id: state?.id, profile:state, auth:authUpdate,})
            
        } else {
            props.onSubmit({id: state.id, profile:state})
        }
        clearForm()
        
    }

    const getProfile = (e) => {
        

        let obj = JSON.parse(e.target.value)
        let date = new Date(obj.startDate)
        
        setState(prev => ({
            ...prev,
            name: obj.name,
            dName: obj.dName,
            startDate:obj.startDate,
            phone: obj.phone? obj.phone:'',
            quals: [],
            role: obj.role,
            level:obj.level,
            dept:obj.dept,
            id: obj.id,
        }))
        
        
        return setMode(2)
    }
    
    const handleChange = async (e) => {
        e.preventDefault()
        let update = {}
        switch (e.target.name) {
            case "startDate":
                let str = e.target.value
                let num = new Date(str).getTime() + (24*60*60*1000)
                setState(prev=>({...prev, startDate:num}))
                break
            case "name":
                update = {...state[e.target.name], [e.target.id]:e.target.value}
                setState(prev => ({...prev, [e.target.name]: update}))
                break
            case "auth":
                setAuth(prev => ({...prev, [e.target.id]: e.target.value}))
                break
            case "role":
                update = JSON.parse(e.target.value)
                // console.log(update)
                setState(prev => ({
                    ...prev, 
                    [update.key]:update.prop, 
                    [e.target.name]:update.name,
                }))
                break
            case "quals":
                if (state.quals.includes(e.target.id)) {
                    let update = []
                    for (let qual in state.quals) {
                        if (state.quals[qual] !== e.target.id) {
                            update.push(state.quals[qual])
                        } 
                    }
                    setState(prev => ({...prev, quals: update}))
                } else {
                    let update = state.quals
                    update.push(e.target.id)
                    setState(prev => ({...prev, quals: update}))
                }
                break
            case "group":
                let update = state.quals
                view.map(job => {
                    if (job.group === e.target.id) {
                        if (!state.quals.includes(job.id)) {
                            update.push(job.id)
                        }
                    }
                })
                setState(prev => ({...prev, quals: update}))
                break
            case "phone":
                console.log(e.target.value)
                let newChar = e.target.value.charAt(e.target.value.length - 1)
                let newStr = state.phone
                console.log(newChar)
                if (e.target.value.length > state.phone.length) {
                    if (Number.isInteger(parseInt(newChar)) && state.phone.length < 12) {
                        if (state.phone.length === 3) {
                            setState(prev => ({...prev, [e.target.name]:`${state.phone}-${newChar}`}))
                        } else if (state.phone.length === 7) {
                            setState(prev => ({...prev, [e.target.name]:`${state.phone}-${newChar}`}))
                        } else {
                            setState(prev => ({...prev, [e.target.name]:`${state.phone}${newChar}`}))
                        }
                    }
                } else {
                    if (e.target.value.charAt(e.target.value.length - 1) === '-') {
                        
                        setState(prev => ({...prev, [e.target.name]: e.target.value.slice(0,-1)}))
                    } else {
                        setState(prev => ({...prev, [e.target.name]:e.target.value}))
                        
                    }
                }
                break
            
            default:
                setState(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }
//  Validate disable
    useEffect(() => {
        console.log(state)
        if (mode === 1) {
            if (state.level >= 0 && state.dName && state.name.first && state.name.last && state.startDate && auth.email && auth.password ){
                setDisabled(false)
            } else {
                setDisabled(true)
            }

        } else if (mode === 2) {
            if (state.level >= 0 && state.dName && state.name.first && state.name.last && state.startDate){
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(true)
        }
    },[state])

    useEffect(() => {
        let date = new Date(state.startDate)
        // console.log(date)

        if (mode > 0) {
            if ((date.getMonth() + 1) < 10) {
                if (date.getDate() < 10) {
                    document.querySelector('input[name="startDate"]').value = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`
                    
                } else {
                    document.querySelector('input[name="startDate"]').value = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`

                }
            } else {
                if ((date.getDate())  < 10) {
                    document.querySelector('input[name="startDate"]').value = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`

                } else {
                    document.querySelector('input[name="startDate"]').value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

                }
                
            }
            roles.forEach((o,i) => {
                if (o.role === state.role) { 
                    document.querySelector('select[name="role"]').selectedIndex = `${i+1}`
                    
                }
            })
        }
    },[mode])

    useEffect(() => {
        if (state.role !== "admin") {
            setState(prev => ({...prev, dept: [view[0].dept]}))
            
        } else {
            let arr = []
            colls.forEach(dept => {
                arr.push(dept[0].dept)
            })
            setState(prev => ({...prev, dept: arr}))
        }
    },[view, state.role])

    const styles = {
        form:`bg-purple rounded border-4 border-clearBlack w-300 h-min p-.02 m-.01`,
        button:`${button.green} text-xl p-.01 w-full`,
        field:`font-bold text-xl`,
        group:`flex flex-wrap`,
        groupBtn:`w-full text-center text-xl font-bold m-.02 p-.02 bg-blue border rounded-xl`,
    }

    return (
        <form className={styles.form}>
            {
                mode < 0 &&
                <div
                className={`w-full flex-column text-center my-.02`}
                >
                <h1 className={`text-center text-2xl font-bold`}>{props.label}</h1>
                    <Select
                    name='user'
                    setValue={getProfile}
                    id=''
                    >
                        <option default value="">Select User</option>
                        {
                            props.users &&
                            props.users.map(user => (
                                <option key={user.id} value={JSON.stringify(user)}> {user.dName} </option>
                            ))
                        }
                    </Select>
                    {
                        !props.admin &&
                        <>
                        <h3 className={`font-bold text-xl py-.02`}>OR</h3>
                        <button
                        className={styles.button}
                        onClick={(e) => {e.preventDefault(); setMode(1)}}
                        >
                            Create New User
                        </button>
                        </>
                    }
                </div>
            }

            {
                mode > 0 &&
                <>
                <h1
                className={`text-2xl font-bold text-center pb-.02`}
                >{mode > 1? "Modify User":"New User"}</h1>
                
                <FormInput
                label="Email"
                style={styles.field}
                type="email"
                value={auth.email}
                name='auth'
                id='email'
                setValue={handleChange}
                />

                <FormInput
                label="Password"
                style={styles.field}
                type="text"
                value={auth.password}
                name='auth'
                id='password'
                setValue={handleChange}
                />
                
                <Select
                label="Role"
                name='role'
                setValue={handleChange}
                id=''
                >
                    <option  value="default">-Select-</option>
                {
                    roles.map(role => (
                        
                        <option key={role.role} value={JSON.stringify({key:"level",prop:role.level,name:role.role})}>{role.label}</option>
                    ))
                }</Select>

                <FormInput
                label="First"
                style={styles.field}
                type="text"
                value={state.name.first}
                name='name'
                id='first'
                setValue={handleChange}
                />

                <FormInput
                label="Last"
                style={styles.field}
                type="text"
                value={state.name.last}
                name='name'
                id='last'
                setValue={handleChange}
                />

                <FormInput
                label="Display Name"
                style={styles.field}
                type="text"
                value={state.dName}
                name='dName'
                id='dName'
                setValue={handleChange}
                />

                <FormInput
                label="Start Date"
                style={styles.field}
                type="date"
                name="startDate"
                id="startDate"
                setValue={handleChange}
                // value=''
                />

                <FormInput
                label="Phone Number"
                style={styles.field}
                type="tel"
                value={state.phone}
                name='phone'
                id='phone'
                setValue={handleChange}
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeHolder='(123)-456-7890'
                />

                {
                    state.role === "ee" &&
                    <div className={styles.qualContainer}>
                        {
                            view[0].groups.map(group => (
                                <div className={styles.group}>
                                    <button
                                    className={styles.groupBtn}
                                    key={group}
                                    name="group" 
                                    id={group} 
                                    onClick={(e) => handleChange(e)}
                                    > {group.toUpperCase()} </button>
                                    {
                                        view.map(job => {
                                            if (job.group === group) {
                                                return (
                                                    <label >
                                                        <p> {job.label} </p>
                                                        <input 
                                                        type="checkbox"
                                                        key={job.id}
                                                        name="quals" 
                                                        id={job.id} 
                                                        checked={state.quals.includes(job.id)}
                                                        onChange={(e) => handleChange(e)}
                                                        />
                                                    </label>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            ))
                        }
                    </div>
                }
                
                <div className={` mt-20`}>
                    
                        <button 
                        className={styles.button}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >{mode > 1? "Save Changes":"Create User"}</button>
                    
                        <button 
                        className={`${button.red} w-full text-xl p-.01 mt-[10px]`}
                        onClick={(e) => clearForm(e)}
                        >CANCEL</button>
                        
                </div>
                
                </>
            }
            
        </form>
    );
}

export default EeForm;