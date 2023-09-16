import React, { useState, useEffect } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button, input } from '../../context/style/style';
import FormInputCont from '../inputs/FormInputCont';

function RotaEdit(props) {
    const [{view, shifts},dispatch] = useAuthState()

    const [state, setState] = useState({})
    const [disabled, setDisabled] = useState(false)

    const url = ""
    if (process.env.NODE_ENV === "development") {
        url = "http://127.0.0.1:5001/overtime-management-83008/us-central1/fsApp"
    } else {
        url = "https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp"
    }

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

    const validate = () => {
        let validated = true
        Object.keys(state).forEach(key => {
            if (state[key].length === 0) {
                validated = false
            }
        })
        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        validate()

    },[state])

    useEffect(() => {
        let stateObj = {}
        if (view[0]) {
            Object.keys(view[0]).map((key) => {
                if (key.length === 2 && key !== "id") {
                   stateObj[key] = view[0][key]
                }
            })
            const ordered = Object.keys(stateObj).sort().reduce(
                (obj, key) => {
                  obj[key] = stateObj[key];
                  return obj;
                },
                {}
              )
            setState(ordered)
        }
    },[view])

    const styles = {
        main:`bg-white rounded-xl text-green rounded border-4 border-clearBlack w-max h-min p-.02 m-.01`,
        submit:`${button.green} w-full text-xl mt-20 p-.01 rounded`,
        h1:`text-center text-2xl font-bold`,
        field:`w-[150px] font-bold text-xl select-none flex flex-col justify-around m-10 border-b-2 border-l-2`,
        text:`text-center text-black font-semibold`,
        h3:`text-center text-xl font-semibold my-10 border-b-2 font-extrabold`,
        container:`flex flex-wrap justify-around`,
        shiftCont:`w-min mx-[5px]`,
    }

    return (
        <form className={styles.main}>
            <h1 className={styles.h1}>Rotation Edit</h1>
            <div className={styles.container}>
                { shifts.map(shift => (
                    <div
                    className={styles.shiftCont}
                    key={shift.index}
                    >
                        <h3
                        className={styles.h3}
                        >
                            {`${shift.label} Shift`}
                        </h3>
                        {
                            Object.keys(state).map((key) => {
                                if (parseInt(key.charAt(0)) === shift.index+1) {
                                    return (
                                    <FormInputCont
                                    label={`${key}`}
                                    key={key}
                                    styling={styles.field}
                                    valiTag={state[key].length === 0? "*Required":undefined}
                                    >
                                        <input
                                        type="text"
                                        className={styles.text}
                                        id={key}
                                        key={key}
                                        value={state[key]}
                                        onChange={(e) => handleChange(e)}
                                        />
                                    </FormInputCont>

                                    )
                                }
                            })
                        }
                    </div>
                ))
                }
            </div>
            <button
            className={styles.submit}
            onClick={(e) => handleSubmit(e)}
            disabled={disabled}
            >
                Save Changes
            </button>
        </form>
    );
}

export default RotaEdit;