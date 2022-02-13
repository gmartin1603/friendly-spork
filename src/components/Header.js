import React, { useState } from 'react';
import styled from 'styled-components'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useAuthState } from '../context/auth/AuthProvider';
import { getRoles } from '@testing-library/react';

function Header({name, role, tabs}) {
    const [value, setValue] = useState(0);
    const {logOff} = useAuthState()
    return (
        <Container>
            
                <Nav>
                    <Tabs
                    value={value}
                    
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                        {
                            tabs &&
                            tabs.map(tab => (
                                <Tab label={tab} />

                            ))
                        }
                    </Tabs>
                </Nav>
                 <h3>{`${name.first[0]}. ${name.last}`}</h3>       
                <button onClick={() => logOff()} >Log Out</button>
            
        </Container>
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
`
const Nav = styled.div`
    background-color: white;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
`