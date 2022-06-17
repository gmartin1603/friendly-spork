import {useState, useEffect} from 'react'
import { useAuthState } from '../../context/auth/AuthProvider'
import { button } from '../../context/style/style'
import Button from './Button'
import FormInputCont from './FormInputCont'


const DayBox = ({label, day, state, setState, modify, color, disabled, valiTag}) => {
    
    const [{shifts, formObj}, dispatch] = useAuthState()

    const [show, setShow] = useState(false)
    const [sel, setSel] = useState(false)
    const [slots, setSlots] = useState(1)
    const [downRef, setDownRef] = useState('')
    const [post, setPost] = useState({})

    const handleChange = (e) => {
        switch (e.target.name) {
            case "showTog":
                setShow(!show)
                break
            case "selTog":
                setSel(!sel)
                break
            default:
                console.log(e.target.name)
        }
    }

    const handleClick = (e) => {
        // console.log(e.target.value)
        // console.log(formObj)
        e.preventDefault()
        let obj = {...state[day].seg}
        if (e.target.id >= 0) {
            if (state[day].seg[e.target.value].segs[e.target.id].name) {
                obj[e.target.value].segs[e.target.id].name = ""
            } else {
                obj[e.target.value].segs[e.target.id].name = downRef
            }
        } else {
            obj = {}
            if (state[day].seg[e.target.value]) {
                for (const i in state[day].seg) {
                    if (i !== e.target.value) {
                        obj[i] = state[day].seg[i] 
                    } 
                }   
            } else {
                obj = {...state[day].seg, 
                    [e.target.value]: {
                        name: downRef, 
                        forced: false, 
                        trade: false
                }}
            }
        }
        return setPost(prev => ({...prev, seg: obj}))
    }

    const changeSlots = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        if (e.target.id > 0) {
            if (slots < 10) {
                setSlots(slots + 1)
            }
        } else {
            if (slots > 1) {
                setSlots(slots - 1)
            }
        }
    }

    const clear = () => {
        setPost({})
        setSel(false)
    }

    useEffect(() => {
        if (state[day].id) {
            console.log(`${day.toUpperCase()} STATE: `, state[day])
        }
        if (state.down > 0) {
            const date = new Date(state.down)
            let month = date.getMonth() + 1
            let day = date.getDate()
            setDownRef(`Down: ${month}/${day}`)
        } else {
            setDownRef('')
        }   
    },[state])

    useEffect(() => {
        if (show) {
            console.log(formObj)
            let obj = {}
            if (modify) {
                setPost(state[day])
            } else {
                if (slots > 1) {
                    let arr = new Array(slots)
                    Object.keys(shifts[state.shift].segs).map(key => {
                        if (key !== "full") {
                            obj[key] = {segs: [],bids:[]}
                            for (let i=0; i<arr.length; i++) {
                                console.log(obj[key])
                                obj[key].segs = [...obj[key].segs, {name: downRef, forced: false, trade: false}]
                            }
                            
                        }
                    })
                } else {
                    Object.keys(shifts[state.shift].segs).map(key => {
                        if (key !== "full") {
                            obj[key] = {name: downRef, forced: false, trade: false, bids: []}
                        }
                    })
                }
                console.log(obj)
                setPost(((prev) => (
                    {
                        ...prev, 
                        id: `${state.job} ${label} ${state.shift}`,
                        date: label,
                        seg: obj,
                        slots: slots
                    }
                )))
            }

        } else {
            clear()
        }
    },[show, slots])

    useEffect(() => {
        if (show) {
            setState(((prev) => (
                {...prev, [day]: post}
            )))
        } else {
            
            setState(((prev) => ({...prev, [day]:{}})))
        }
    },[post])

    const styles = {
        // *Btn: [default, clicked]
        main:` bg-${disabled? "gray":color} border min-w-[180px] w-max h-max px-.01 py-.02 m-.01`,
        showBtn:[`${show? button.red : button.green} w-.5`],
        selBtn:[`${button.green} w-[45%]`],
        field:`font-bold text-white text-xl my-10`,
        valiTag:`text-red font-semibold `,
        check:`bg-[#AEB6BF] border-2 border-clearBlack text-black text-base rounded  text-center `,
        selected:`shadow-clearBlack shadow-sm rounded border-2 border-clearBlack text-center text-base`,
        segBtn:`${button.green}`,
        slotCont:`flex flex-col justify-around`,
    }
    
    return (
        <div className={styles.main}>
            <p className={styles.valiTag}>{valiTag}</p>
            <h6
            className={`font-bold text-lg text-white mb-.05`}
            >
                {new Date(label).toDateString().slice(0,3)} <br /> {new Date(label).toDateString().slice(3,10)}
            </h6>
            { !disabled &&
                <Button 
                name="showTog"
                type="toggle" 
                style={styles.showBtn}
                label={show? "Cancel":"Fill"}
                value={show}
                action={handleChange}
                />
            }
            { !disabled && state[day].id && 
                <div>
                    <FormInputCont
                    styling={styles.field}
                    label="Hours to Fill"
                    valiTag={Object.keys(state[day].seg).length === 0? "*Min 1 Segment Required":undefined}
                    >
                        { slots > 1?
                            state[day].seg.one.segs &&
                            state[day].seg.one.segs.map((slot,i) => (
                                <div className={`flex flex-wrap justify-center`} key={i}>
                                    <h3 className={`w-full text-base`}>{`Slot ${i+1}`}</h3>
                                    <div className={styles.slotCont}>
                                    {/* { state[day].seg.one.segs.map((slot,i) => ( */}
                                        <button 
                                        className={(state[day].seg.one.segs[i].name? styles.selected : styles.check) + styles.segBtn}
                                        value="one"
                                        id={i}
                                        key={`one${i}`}
                                        onClick={(e) => handleClick(e)}
                                        >
                                            {shifts[state.shift].segs.one}
                                        </button>
                                    {/* )) */}
                                    {/* } */}
                                    </div>
                                    <div className={styles.slotCont}>
                                    {/* { state[day].seg.two.segs.map((slot,i) => ( */}
                                            <button 
                                            className={`${(state[day].seg.two.segs[i].name? styles.selected : styles.check)} ${styles.segBtn} my-10`}
                                            value="two"
                                            id={i}
                                            key={`two${i}`}
                                            onClick={(e) => handleClick(e)}
                                            >
                                                {shifts[state.shift].segs.two}
                                            </button>
                                    {/* ))
                                    } */}
                                    </div>
                                { shifts[state.shift].segs.three &&
                                    <div className={styles.slotCont}>
                                    {/* { state[day].seg.three.segs.map((slot,i) => ( */}
                                            <button 
                                            className={`${(state[day].seg.three.segs[i].name? styles.selected : styles.check)} ${styles.segBtn} my-10`}
                                            value="three"
                                            id={i}
                                            key={`three${i}`}
                                            onClick={(e) => handleClick(e)}
                                            >
                                                {shifts[state.shift].segs.three}
                                            </button>
                                    {/* ))
                                    } */}
                                    </div>
                                }
                                </div>
                            ))
                            :
                            <div className={`flex  justify-around text-center`}>
                                <button 
                                className={(state[day].seg.one? styles.selected : styles.check) + styles.segBtn}
                                value="one"
                                id={-1}
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.one}
                                </button>
                                <button 
                                className={(state[day].seg.two? styles.selected : styles.check) + styles.segBtn}
                                value="two"
                                id={-1}
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.two}
                                </button>
                            { shifts[state.shift].segs.three &&
                                <button 
                                className={(state[day].seg.three? styles.selected : styles.check) + styles.segBtn}
                                value="three"
                                id={-1}
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.three}
                                </button>
                            }
                            </div>

                        }
                    </FormInputCont>
                    { formObj.options &&
                        <div className={`p-10`}>
                            <h3 className={`text-white font-bold text-xl`}>Slots</h3>
                            <button 
                            className={`${styles.segBtn} text-xl font-bold px-[5px] mx-[5px]`}
                            id={-1}
                            onClick={(e) => changeSlots(e)}
                            >
                                -   
                            </button>
                            <input 
                            type="num" 
                            className={`w-[50px] text-center bg-white font-bold text-xl`}
                            value={slots}
                            disabled
                            />
                            <button 
                            className={`${styles.segBtn} text-xl font-bold px-[5px]  mx-[5px]`}
                            onClick={(e) => changeSlots(e)}
                            id={1}
                            >
                            +
                            </button>     
                        </div>
                    }
                </div>
            } 
        </div>        
    )

}

export default DayBox
