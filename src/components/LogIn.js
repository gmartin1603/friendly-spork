import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import FormInput from './FormInput';

//***************** TODO ****************** */
// Login error displaying
// style

function LogIn(props) {
    const [state, setState] = useState({userName: '', password: '',})

    const {passReset, signin, errors} = useAuthState()

    const handleChange = (e) => {
        let newStr = e.target.value

        if (newStr.length > state[e.target.name].length) {
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
            
        } else {
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (state.userName && state.password) {
            
            let email = state.userName.trim()
            let pass = state.password.trim()
            
            if (e.target.id) {
                passReset(email)
                setState({userName: '', password:''})
            } else {
                signin(email,pass)
                setState({userName: '', password:''})
            }
        }

    }

    

    // useEffect(() => {
    //     console.log(state)
    // },[state])   
    

    return (
        <div 
        className={`bg-cover h-screen flex items-center justify-center`}
        style={{backgroundImage:"url('https://lh3.googleusercontent.com/HP9vG5qMnym4cUblWIMtshPXQLDHiduXdqf7qGGAZqDdNM81GhgBxjiCRHkd09f67-FXaTGugoWE0mNlGq7R0oyckwCDe_bR1Ky_QkPawRsB9IFQR3nCg5N8jMVkS4hE6SMVAnJRVA=w2400')" }}
        >
            <div 
            className='bg-todayGreen w-min h-max p-.02  rounded-lg border-4'>
                <form className={` flex-column justify-around`}>
                    
                    <FormInput 
                    type="email" 
                    label="Email"
                    name="userName"
                    setValue={handleChange}
                    value={state.userName}
                    
                    />
                    <FormInput 
                    type="password" 
                    label="Password"
                    name="password"
                    setValue={handleChange}
                    value={state.password}
                    
                    />
                    <button 
                    className='bg-blue font-bold text-lg p-.01 w-full border mt-.05' 
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}
                    >
                        Log In
                    </button>
                    <button 
                    className='bg-blue font-bold p-.01 w-full border mt-.05' 
                    id="reset" 
                    onClick={(e) => handleSubmit(e)}
                    >
                        Reset Password
                    </button>
                </form>
                    {
                        errors && 
                        <div className={`border-2 border-clearRed bg-clearRed p-.02 mt-.05`}>
                            <h4 className={`font-bold`}>ERROR:</h4>
                            <h6 className={`font-semibold`}>{errors}</h6>
                        </div>

                    }
            </div>
        </div>
    );
}

export default LogIn;

