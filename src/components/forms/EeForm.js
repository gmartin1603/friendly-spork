
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
    const {view, colls} = useAuthState()

    const [disabled, setDisabled] = useState(true)
    const [auth,setAuth] = useState(initalState.auth)
    const [state, setState] = useState(initalState.profile)

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

    const clearForm = () => {
        setState(initalState.profile)
        setAuth(initalState.auth)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        props.onSubmit({profile:state,auth:auth})
        clearForm()
        
    }

    const getProfile = async (e) => {
        let url = `${props.URLs.userAppLocal}/getUser`
        await fetch(url,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'text/plain',},
            body: e.target.value 
        })
        .then(res => {
            console.log(res.json())
            let obj = res
            setState({
                name: {first:obj.name.first,last:obj.name.last},
                dName: obj.dName,
                startDate:obj.startDate,
                phone: obj.phone,
                quals: [],
                role: obj.role,
                level:obj.level,
                dept:obj.dept,
            })
        })
    }
    
    const handleChange = async (e) => {
        let update = {}
        switch (e.target.name) {
            case "date":
                setState(prev=>({...prev, startDate:new Date(e.target.value).getTime()}))
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
                console.log(update)
                setState(prev => ({
                    ...prev, 
                    [update.key]:update.prop, 
                    [e.target.name]:update.name,
                }))
                
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
        if (state.role === "op" && state.dName && auth.email && auth.password) {
            setDisabled(false)
        }
        else if (state.level >= 0 && state.dName && state.name.first && state.name.last && state.startDate && auth.email && auth.password ){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[state])

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

    return (
        <form className={`bg-purple w-max p-.02 m-.01`}>
            <h1>EE Modify Form</h1>
            <Select
            label="User Select"
            name='user'
            setValue={handleChange}
            id=''
            >
                <option default value="">Select User</option>
                {
                    props.users &&
                    props.users.map(user => (
                        <option key={user.id} value={user.id}> {user.dName} </option>
                    ))
                }
            </Select>
            <Select
            label="Role"
            name='role'
            value={state.role}
            setValue={handleChange}
            id=''
            >
                <option  value="default">-Select-</option>
            {
                roles.map(role => (
                    
                    <option key={role.role} value={JSON.stringify({key:"level",prop:role.level,name:role.role})}>{role.label}</option>
                ))
            }</Select>

            <FormInput label="First"
            type="text"
            value={state.name.first}
            name='name'
            id='first'
            setValue={handleChange}
            />

            <FormInput label="Last"
            type="text"
            value={state.name.last}
            name='name'
            id='last'
            setValue={handleChange}
            />

            <FormInput label="Display Name"
            type="text"
            value={state.dName}
            name='dName'
            id='dName'
            setValue={handleChange}
            />

            <FormInput label="Email"
            type="email"
            value={auth.email}
            name='auth'
            id='email'
            setValue={handleChange}
            />

            <FormInput label="Password"
            type="text"
            value={auth.password}
            name='auth'
            id='password'
            setValue={handleChange}
            />

            <FormInput label="Start Date"
            type="date"
            name='startDate'
            id='startDate'
            setValue={handleChange}
            />

            <FormInput label="Phone Number"
            type="tel"
            value={state.phone}
            name='phone'
            id='phone'
            setValue={handleChange}
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            placeHolder='(123)-456-7890'
            />
            
            <div className={`flex justify-center mt-20`}>
                    {
                        <button 
                        className={button.green}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >SUBMIT</button>
                    }    
                </div>
            
        </form>
    );
}

export default EeForm;