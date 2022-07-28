import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, input } from '../context/style/style';
import FormInput from './FormInput';
import FormInputCont from './inputs/FormInputCont';

function Profile(props) {
    // const url = "http://localhost:5000/overtime-management-83008/us-central1/app"
    const url = "https://us-central1-overtime-management-83008.cloudfunctions.net/app"

    const [{profile, view}, dispatch] = useAuthState()

    const [newPhone, setNewPhone] = useState('')
    const [disabled, setDisabled] = useState(true)

    const handleChange = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "phone":
                console.log(e.target.value)
                let newChar = e.target.value.charAt(e.target.value.length - 1)
                let newStr = newPhone
                console.log(newChar)
                if (e.target.value.length > newPhone.length) {
                    if (Number.isInteger(parseInt(newChar)) && newPhone.length < 12) {
                        if (newPhone.length === 3) {
                            newStr = `${newPhone}-${newChar}`
                            // setState(prev => ({...prev, [e.target.name]:`${newPhone}-${newChar}`}))
                        } else if (newPhone.length === 7) {
                            newStr = `${newPhone}-${newChar}`
                            // setState(prev => ({...prev, [e.target.name]:`${newPhone}-${newChar}`}))
                        } else {
                            newStr = `${newPhone}${newChar}`
                            // setState(prev => ({...prev, [e.target.name]:`${newPhone}${newChar}`}))
                        }
                    }
                } else {
                    if (e.target.value.charAt(e.target.value.length - 1) === '-') {
                        newStr = e.target.value.slice(0,-1)
                        // setState(prev => ({...prev, [e.target.name]: e.target.value.slice(0,-1)}))
                    } else {
                        newStr = e.target.value
                        // setState(prev => ({...prev, [e.target.name]:e.target.value}))
                        
                    }
                }
                setNewPhone(newStr)
                break
            default:
                console.log("handleChange Default")
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        const load = {
            id: profile.id,
            profile: {phone: newPhone}
        }
        await fetch(`${url}/updateUser`,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'text/plain',},
            body: JSON.stringify(load) 
        })
        .then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
        let validated = false
        if (newPhone.length ===12) {
            if (newPhone !== profile.phone) {
                validated = true
            }
        }
        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[newPhone])

    const styles = {
        main:`h-[93vh] flex flex-wrap justify-around w-max text-green overflow-auto`,
        h1:`text-2xl font-bold text-center mb-[20px]`,
        qualCont:`bg-white text-center font-semibold text-xl mx-[20px] my-10 py-20 px-[40px] rounded-xl w-max h-min`,
        qual:`my-.02 p-.02 text-white shadow-black shadow-inner  rounded bg-green`,
        submit:`${button.green} w-full p-[5px] mt-[20px]`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.qualCont}>
                <h1 className={styles.h1}>Qualified Jobs</h1>
                <ul className={styles.qualList}>
                    { view &&
                        view.map(job => {
                            if (profile.quals.includes(job.id)) {
                                return (
                                    <li 
                                    className={styles.qual}
                                    key={job.id}
                                    > 
                                        {job.label} 
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div className={styles.qualCont}>
                <h1 className={styles.h1}>Phone Number</h1>
                <FormInputCont
                styling={`my-10`}
                label="Current"
                >
                    <input 
                    type="tel" 
                    className={input.text}
                    name="phone"
                    id="phone"
                    value={profile.phone}
                    disabled
                    onChange={(e) => handleChange(e)}
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                    placeholder='(123)-456-7890'    
                    />
                </FormInputCont>
                <FormInputCont
                styling={`my-10`}
                label="New Phone Number"
                >
                    <input 
                    type="tel" 
                    className={input.text}
                    name="phone"
                    id="phone"
                    value={newPhone}
                    onChange={(e) => handleChange(e)}
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                    placeholder='(123)-456-7890'    
                    />
                </FormInputCont>
                <button
                className={styles.submit}
                disabled={disabled}
                onClick={(e) => updateProfile(e)}
                >
                    Save New Number
                </button>
            </div>
        </div>
    );
}

export default Profile;