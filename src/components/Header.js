import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useAuthState } from '../context/auth/AuthProvider';
import {header} from '../context/style/style'

function Header({tabs}) {
    const [value, setValue] = useState('');
    const {colls, profile, logOff, view, toggleView} = useAuthState()

    const user = {
        email: '',
        password: '',
        displayName: 'Extrusion Op'
    }

    const update = {
        uid: 'bsBHT1Hkn3T65E84J6mdGUMPcRV2',
        role: 'admin'
    }
    
    const URL = "http://localhost:5000/overtime-management-83008/us-central1/app/getUser"
    
    const post = {
        method: 'POST',
        body: value,
    }

    const fetchData = async () => {
        console.log('Fetching User Info => ' + value) 
        await fetch(URL, post)
        .then((res) => console.log(res.json()))
        
        .catch((err) => {
          console.warn(err)
        })
    }

    // useEffect(() => {
    //     colls.length > 0 &&
    //     toggleView(colls[0])
    // },[colls])

    return (
        <div className={header.container}>
            { 
            colls.length > 1 && 
            <div className={` flex p-0.2`}>
                <div className={`bg-todayGreen py-10 flex justify-center rounded-lg mx-.02 `}>
                    <select name="dept" onChange={(e) => toggleView(colls[e.target.value])}
                    className={`w-100 text-center  m-.02 bg-transparent border text-2xl`}
                    >
                        {
                            
                            colls.map((dept,i) => (
                                <option value={i} key={dept[0].dept}>{dept[0].dept.toUpperCase()}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            }
            {/* <div>
                <button onClick={() => fetchData()}>UID Look Up</button>
                <input type="text" value={value} onChange={(e) => setValue(...value, e.target.value)} />
            </div> */}
                <nav className={header.nav}>
                    
                        {
                            tabs &&
                            tabs.map(tab => (
                                <Link
                                to={tab.link} 
                                key={tab.link} 
                                className={header.tab} 
                                >
                                    {tab.label}
                                </Link>

                            ))
                        }
                    
                </nav>
                 <h3 className={`px-.02 text-xl font-semibold`} >{profile.dName}</h3>       
                <button type="log out" className={header.logOut} onClick={() => logOff()} >Log Out</button>
            
        </div>
    );
}

export default Header;

