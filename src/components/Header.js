import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuthState } from '../context/auth/AuthProvider';
import {header} from '../context/style/style'

function Header({name, role, tabs, rows, handleChange}) {
    const [value, setValue] = useState('');
    const {logOff} = useAuthState()

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

    return (
        <div className={header.container}>
            <div className={` flex p-0.2`}>
                <div className={`bg-todayGreen py-10 flex justify-center rounded-lg mx-.02 `}>
                    <select name="dept" onChange={(e) => handleChange(e)}
                    className={`w-100 text-center  m-.02 bg-transparent border text-2xl`}
                    >
                        {
                            rows.map((dept,i) => (
                                <option value={i} key={dept}>{dept[0].dept.toUpperCase()}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/* <div>
                <button onClick={() => fetchData()}>UID Look Up</button>
                <input type="text" value={value} onChange={(e) => setValue(...value, e.target.value)} />
            </div> */}
                <ul className={header.nav}>
                    
                        {
                            tabs &&
                            tabs.map(tab => (
                                <li className={header.tab} key={tab} >
                                    {tab}
                                </li>

                            ))
                        }
                    
                </ul>
                 <h3 className={`px-.02 text-xl font-semibold`} >{name}</h3>       
                <button type="log out" className={header.logOut} onClick={() => logOff()} >Log Out</button>
            
        </div>
    );
}

export default Header;

const Container = styled.div`
    background-color: green;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
`
const Nav = styled.div`
    background-color: white;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
`