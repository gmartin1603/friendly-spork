import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components'

function AddPos(props) {
    const [state, setState] = useState({
        pack : false,
        op: false,
        po: false,
        util : false,
        misc : false,
        first: "",
        last: "",
        user: "",
        password: ""
    })


    const handleChange = (e) => {
        if (e.target.checked) {
            setState({ ...state, [e.target.name]: e.target.checked })
            console.log(state)
        }
        else if (e.target.value) {
            setState({ ...state, [e.target.name]: e.target.value })
            console.log(state)
        }
        else (console.log(state))
    } 

    return (
        <Container>
            <form action="">
            <h3>Create Position</h3>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={state.pack}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="pack"
                        />
                    }
                    label="Packaging Operator"
                    />
                </Box>
                <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={state.op}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="op"
                        />
                    }
                    label="CSST Operator"
                    />
                </Box>
                <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checke={state.po}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="po"
                        />
                    }
                    label="CASC Operator"
                    />
                </Box>
                <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={state.util}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="util"
                        />
                    }
                    label="Utility"
                    />
                </Box>
                <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={state.misc}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="misc"
                        />
                    }
                    label="Misc"
                    />
                </Box>
                
            </form>
        </Container>
    );
}

export default AddPos;

const Container = styled.div`
    min-width: 150px;
    form {
        width: 75%;
        padding: 50px;
        display: flex;
        flex-direction: column;
}
`
const Box =styled.div`

`