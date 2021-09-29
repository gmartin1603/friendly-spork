import React, { useState } from 'react';
import styled from 'styled-components'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Header(props) {
    const [value, setValue] = useState(0);
    return (
        <Container>
            
                <Nav>
                    <Tabs
                    value={value}
                    onChange
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                        <Tab label="Home" />
                        <Tab label="Add EE" />
                        <Tab label="Edit EE" />
                        <Tab label="Add Position" />
                        <Tab label="Edit Position" />
                        {/* <Tab label="" />
                        <Tab label="" /> */}
                    </Tabs>
                </Nav>
            
        </Container>
    );
}

export default Header;

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: green;
    height: 20%;
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