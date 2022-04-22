
import React, { useEffect, useState } from 'react';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';
import Select from '../inputs/Select';

function EeForm(props) {

    const [state, setState] = useState({
        name: {first:'',last:''},
        userName: '',
        password: '',
        startDate:'',
        phone: '',
        quals: [],
        role: 'ee',
    })

    const quals = [
        {label:"Packaging", qual:"pack"},
        {label:"Operator", qual:"op"},
        {label:"Misc Jobs", qual:"misc"},
    ]

    const roles = [
        {label: "Employee", role:"ee"},
        {label:"Supervisor", role: "sup"},
        {label:"Control Room", role: "op"},
        {label:"Admin", role: "admin"},
    ]
    
    const handleChange = (e) => {

        switch (e.target.name) {
            case "date":
                setState(prev=>({...prev, startDate:new Date(e.target.value).getTime()}))
                break
            case "name":
                let update = {...state.name, [e.target.id]:e.target.value}
                setState(prev => ({...prev, [e.target.name]: update}))
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

    useEffect(() => {console.log(state)},[state])

    return (
        <form className={`bg-purple w-max p-.02 m-.01`}>
            <h1>EE Modify Form</h1>
            <Select
            label="Role"
            name='role'
            setValue={handleChange}
            id=''
            >
                {
                    roles.map(role => (
                        
                        <option value={role.role}>{role.label}</option>
                    ))
                }
            </Select>
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
            <FormInput label="User Name"
            type="text"
            value={state.userName}
            name='userName'
            id='userName'
            setValue={handleChange}
            />
            <FormInput label="Password"
            type="text"
            value={state.password}
            name='password'
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
            
            {/* <label htmlFor="quals">
                <h3>Qualifications</h3>
                {
                    quals.map(qual => (

                        <FormInput label={qual.label}
                        type="checkbox"
                        value=''
                        name={qual.qual}
                        id='name'
                        setValue=''
                        />
                    ))
                }

            </label> */}
            
            <div className={`flex justify-center mt-20`}>
                    {
                        <button 
                        className={button.green}
                        disabled={"disabled"}
                        onClick={(e) => handleSubmit(e)}
                        >SUBMIT</button>
                    }    
                </div>
            
        </form>
    );
}

export default EeForm;