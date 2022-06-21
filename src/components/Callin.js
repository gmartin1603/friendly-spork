import React, {useEffect, useState} from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import style, { button } from '../context/style/style';
import FormInput from './FormInput';

function Callin(props) {
    const initialState = {
        id: '',
        shift: -1,
        norm: '',
        pos: '',
        seg: {},
        date: 0,
        color:'',
        tag: {name: '', reason: "Call-In"},
        creator:'',
    }
    const [{formObj, shifts}, dispatch] = useAuthState()

    const [state, setState] = useState(initialState)

    const closeForm = (e) => {
        dispatch({
            type: "CLOSE-FORM",
            name: "showCallin"
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        window.open(
            "",
            "_blank",
            "width=600,height=400,left=200,top=200"
        )
        closeForm()
    }

    useEffect(() => {
        console.log(formObj)
        setState(prev => ({
            ...prev,
            shift: formObj.shift,
            norm: formObj.norm,
            pos: formObj.pos.id,
            date: formObj.date,
        }))
    },[formObj])

    const styles = {
        main:``,
        head:`flex justify-between items-start`,
        backDrop: ` h-screen w-full fixed top-0 left-0 z-50 bg-clearBlack flex items-center justify-center `,
        field:`font-bold text-xl my-10`,
        h3:`font-bold text-xl`,
        submit:`${button.green} p-10 text-xl w-.5`,
        cancel:`${button.red} w-.5 p-10 text-xl`,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        form: `relative text-todayGreen bg-white h-max max-h-full w-400 overflow-auto mt-.02 p-.02 rounded-xl flex-column `,
    }
    return (
        <div className={styles.backDrop}>
            <div className={styles.form}>
                <div className={styles.head}>
                    <h1 className={`text-2xl font-bold`}>Start Call In</h1>
                    <div 
                    className={styles.closeBtn}
                    onClick={() => closeForm()}>
                        <p>Close</p>
                    </div>
                </div>
                <FormInput 
                label="Job:"
                type="text"
                className={styles.field}
                value={`${formObj.pos.label} - ${shifts[formObj.shift].label} Shift`}
                />
                <FormInput 
                label="On:"
                type="text"
                className={styles.field}
                value={new Date(state.date).toDateString()}
                disabled
                />
                <FormInput 
                label="For:"
                type="text"
                className={styles.field}
                value={state.norm}
                />
                <FormInput 
                label="Reason:"
                type="text"
                className={styles.field}
                value={state.tag.reason}
                />
                <h3 className={styles.h3}>Hours to Fill</h3>
                <div className={styles.btnCont}>
                    { 
                        Object.keys(shifts[formObj.shift].segs).map(seg => {
                            if (seg !== "full") {
                                return (
                                    <button 
                                    className={styles.submit}
                                    onClick={(e) => handleClick(e)}
                                    >
                                        {shifts[formObj.shift].segs[seg]}
                                    </button>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.btnCont}>
                    <button 
                    className={styles.submit}
                    onClick={(e) => handleSubmit(e)}
                    >
                        Continue
                    </button>
                    <button className={styles.cancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Callin;