import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import { auth } from '../firebase/auth';
import { getUser } from '../firebase/firestore';
import FormInput from './FormInput';
import Button from './inputs/Button';
import URLs from '../firebase/funcURLs.json'
import useAuthChange from '../helpers/authStateChange';

//***************** TODO ****************** */
// Login error displaying
// style

function LogIn(props) {
    const [state, setState] = useState({userName: '', password: '',})

    const [errors, setErrors] = useState()
    
    const user = useAuthChange()

    const [{},dispatch] = useAuthState()

    const signin = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
        let user = userCred.user
        console.log(userCred.user)
        getUser(user.uid)
          .then((userDoc) => {
            setState({userName: '', password:''})
            dispatch({
                type:"SET-OBJ",
                load: userDoc,
                name:"profile"
              })
          })
        })
        .catch((error) => {
            if (error){
                setErrors(error.code)
                setState(prev => ({...prev, password:''}))
            }
        })
    }
    
    const passReset = async (email) => {

        await sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Link sent to " + email)
        })
        .catch((error) => {
            if (error){
                console.log(error)
                setErrors(error.code)
                setState(prev => ({...prev, password:''}))
            }
        })
  
      }
    

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
        let email, pass = ['','']
        if (state.userName) {
            email = state.userName.trim()
        }
        if (state.password) {
            pass = state.password.trim()
        }
        if (e.target.id) {
            passReset(email)
            // setState({userName: '', password:''})
        } else {
            signin(email,pass)
        }

    }

    

    // useEffect(() => {
    //     console.log(state)
    // },[state]) 
    const styles = {
        cover:``,
        container:``,
        form:``,
        login:`${button.blue} font-bold text-lg p-.01 w-full border mt-.05`,
        reset:`${button.std} w-full bg-[gray] text-white mt-20 rounded border border-clearBlack font-semibold `,
        field:`font-bold text-xl`,
    }  
    

    return (
        <div 
        className={`bg-cover h-screen flex items-center justify-center`}
        style={{backgroundImage:"url('https://lh3.googleusercontent.com/HP9vG5qMnym4cUblWIMtshPXQLDHiduXdqf7qGGAZqDdNM81GhgBxjiCRHkd09f67-FXaTGugoWE0mNlGq7R0oyckwCDe_bR1Ky_QkPawRsB9IFQR3nCg5N8jMVkS4hE6SMVAnJRVA=w2400')" }}
        >
            <div 
            className='bg-todayGreen w-[300px] h-max p-.02  rounded-lg border-4'>
                <form className={` flex-column justify-around`}>
                    
                    <FormInput
                    style={styles.field} 
                    type="email" 
                    label="Email"
                    name="userName"
                    setValue={handleChange}
                    value={state.userName}
                    
                    />
                    <FormInput
                    style={styles.field} 
                    type="password" 
                    label="Password"
                    name="password"
                    setValue={handleChange}
                    value={state.password}
                     
                    />
                    <button 
                    name="login"
                    type="submit" 
                    className={styles.login}
                    onClick={(e) => handleSubmit(e)}
                    >Log In</button>
                    <button 
                    name="reset"
                    type="submit" 
                    className={styles.reset}
                    onClick={(e) => handleSubmit(e)}
                    >Reset Password</button>
                    
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

