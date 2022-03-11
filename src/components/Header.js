import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuthState } from '../context/auth/AuthProvider';
import {header} from '../context/style/style'

function Header({name, role, tabs}) {
    const [value, setValue] = useState(0);
    const {logOff} = useAuthState()
    return (
        <div className={header.container}>
            
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
                 <h3 className={`px-.02 `} >{`${name.first[0]}. ${name.last}`}</h3>       
                <button onClick={() => logOff()} >Log Out</button>
            
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