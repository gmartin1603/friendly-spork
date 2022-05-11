import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../context/auth/AuthProvider';
import { auth } from '../firebase/auth';

function Header({tabs}) {
    const [value, setValue] = useState('');

    const[state, dispatch] = useAuthState();

    useEffect(() => {
        dispatch({
            type: "SET-ARR",
            name:"view",
            load:state.colls[0]
        })
    },[])

    const logOff = () => {
        signOut(auth)
    }

    const styles = {
        container: 'sticky top-0 left-0 z-10 select-none flex justify-center items-center  bg-todayGreen h-max  w-full',
        nav: 'flex p-.01 w-.5 px-.2',
        tab: 'bg-white border py-.01 px-.02',
        tab_active: 'bg-todayGreen',
        logOut: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black',
    }
    
    return (
        <div className={styles.container}>
            {  
            <div className={` flex p-0.2 mr-.02`}>
                <div className={`bg-todayGreen py-10 flex justify-center rounded-lg mx-.02 `}>
                    {
                        state.profile.dept.length > 1 &&
                    <select name="dept" onChange={(e) => dispatch({type:"SET-ARR", name:"view", load:state.colls[e.target.value]})}
                    className={`w-100 text-center  m-.02 bg-transparent border text-2xl`}
                    >
                        {
                            
                            state.colls.map((dept,i) => (
                                <option value={i} key={dept[0].dept}>{dept[0].dept.toUpperCase()}</option>
                            ))
                        }
                    </select>
                    }
                </div>
            </div>
            }
            {/* <div>
                <button onClick={() => fetchData()}>UID Look Up</button>
                <input type="text" value={value} onChange={(e) => setValue(...value, e.target.value)} />
            </div> */}
                <nav className={styles.nav}>
                    
                        {
                            tabs &&
                            tabs.map(tab => (
                                <Link
                                to={tab.link} 
                                key={tab.link} 
                                className={styles.tab} 
                                >
                                    {tab.label}
                                </Link>

                            ))
                        }
                    
                </nav>
                 <h3 className={`px-.02 text-4xl font-semibold mr-.05`} >{state.profile.dName}</h3>       
                <button type="log out" className={styles.logOut} onClick={() => logOff()} >Log Out</button>
            
        </div>
    );
}

export default Header;

