import React, { useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

//***************** TODO ****************** */
// Login error displaying
// style

function LogIn(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const {signin} = useAuthState()

        
    

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='bg-todayGreen w-min h-min p-.05 flex '>
                <form>
                    <div className="username">
                        <label htmlFor="username">User Name</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    </div>
                    <div className="mb-.05">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='bg-blue p-.01 w-full border' type="submit" onClick={(e) => {e.preventDefault(); signin(userName, password)}}>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;

