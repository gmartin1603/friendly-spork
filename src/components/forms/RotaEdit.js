import React, { useState, useEffect } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button, input } from '../../context/style/style';
import FormInputCont from '../inputs/FormInputCont';

function RotaEdit(props) {
    const [{view},dispatch] = useAuthState()

    const [state, setState] = useState({})

    const url = "http://localhost:5000/overtime-management-83008/us-central1/fsApp"
    // const url = "https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp"

    const handleChange = (e) => {
        setState(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)

        const load = {
            dept: view[0].dept,
            id: "rota",
            load: state
        }

        const init = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(load)
        }
        fetch(`${url}/editRota`,init)
        .then(res => {
            console.log(res.body)
        })
    }

    useEffect(() => {
        let obj = {}
        if (view[0]) {
            Object.keys(view[0]).map((key) => {
                if (key.length === 2 && key !== "id") {
                   obj[key] = view[0][key] 
                }
            })
            setState(obj)
        }
    },[view])

    const styles = {
        main:`bg-white text-green rounded border-4 border-clearBlack w-[400px] h-min p-.02 m-.01`, 
        submit:`${button.green} w-full text-xl mt-20 p-.01 rounded`,
        h1:`text-center text-2xl font-bold`,
        field:`font-bold text-xl flex`,
    }

    return (
        <form className={styles.main}>
            <h1 className={styles.h1}>Rotation Edit</h1>
            {
                Object.keys(state).map((key) => (
                    <FormInputCont
                    label={key}
                    key={key}
                    styling={styles.field}
                    >
                        <input 
                        type="text" 
                        className={input.text}
                        id={key}
                        value={state[key]}
                        onChange={(e) => handleChange(e)}
                        />
                    </FormInputCont>
                ))
            }
            <button
            className={styles.submit}
            onClick={(e) => handleSubmit(e)}
            >
                Save Changes
            </button>
        </form>
    );
}

export default RotaEdit;