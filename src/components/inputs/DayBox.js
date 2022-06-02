import {useState, useEffect} from 'react'
import { useAuthState } from '../../context/auth/AuthProvider'
import { button } from '../../context/style/style'
import FormInput from '../FormInput'
import SegInput from '../SegInput'
import Button from './Button'
import FormInputCont from './FormInputCont'


const DayBox = ({label, day, state, setState, modify, color, disabled, valiTag}) => {
    const initalSegs = {
        one: {name:'', forced:false,trade:false}, 
        two: {name:'', forced:false,trade:false}, 
        three: {name:'', forced:false,trade:false}
    }
    
    const [show, setShow] = useState(false)
    const [{shifts, formObj}, dispatch] = useAuthState()
    const [sel, setSel] = useState(false)
    
    const [downRef, setDownRef] = useState('')
    const [post, setPost] = useState({})
    const [segs, setSegs] = useState(initalSegs)

    const handleChange = (e) => {
        let value = e.target.value
        let update = {}
        switch (e.target.name) {
            case "showTog":
                setShow(!show)
                break
            case "selTog":
                setSel(!sel)
                break
            case "one":
                update = {...segs[e.target.name], name: value}
                setSegs(prev => ({...prev, [e.target.name]: update}))
                break
            case "two":
                update = {...segs[e.target.name], name: value}
                setSegs(prev => ({...prev, [e.target.name]: update}))
                break
            case "three":
                update = {...segs[e.target.name], name: value}
                setSegs(prev => ({...prev, [e.target.name]: update}))
                break
            default:
                console.log(e.target.name)
        }
    }

    const handleClick = (e) => {
        console.log(e.target.value)
        console.log(formObj)
        e.preventDefault()
        let obj = {}
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
        return setPost(prev => ({...prev, seg: obj}))
    }

    const clear = () => {
        setPost({})
        setSegs(initalSegs)
        setSel(false)
    }

    useEffect(() => {
        if (state[day].id) {
            // console.log(`${day.toUpperCase()} STATE: `, state[day])
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
            if (modify) {
                setPost(state[day])
            } else {
                let obj = {}
                Object.keys(shifts[state.shift].segs).map(key => {
                    if (key !== "full") {
                        obj[key] = {name: downRef, forced: false, trade: false, bids: []}
                    }
                })
                setPost(((prev) => (
                    {
                        ...prev, 
                        id: `${state.job} ${label} ${state.shift}`,
                        date: label,
                        seg: obj
                    }
                    )))
            }

        } else {
            clear()
        }
    },[show])

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
        field:`font-bold text-xl my-10`,
        valiTag:`text-red font-semibold `,
        check:`bg-[#AEB6BF] border-2 border-clearBlack text-black text-base rounded  text-center `,
        selected:`shadow-clearBlack shadow-sm rounded border-2 border-clearBlack text-center text-base`,
        segBtn:`${button.green}`,
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
                    { !modify ?
                        <FormInputCont
                        styling={styles.field}
                        label="Hours to Fill"
                        valiTag={Object.keys(state[day].seg).length === 0? "*Min 1 Segment Required":undefined}
                        >
                            <div className={`flex  justify-around text-center`}>
                                <button 
                                className={(state[day].seg.one? styles.selected : styles.check) + styles.segBtn}
                                value="one"
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.one}
                                </button>
                                <button 
                                className={(state[day].seg.two? styles.selected : styles.check) + styles.segBtn}
                                value="two"
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.two}
                                </button>
                            { shifts[state.shift].segs.three &&
                                <button 
                                className={(state[day].seg.three? styles.selected : styles.check) + styles.segBtn}
                                value="three"
                                onClick={(e) => handleClick(e)}
                                >
                                    {shifts[state.shift].segs.three}
                                </button>
                            }
                            </div>
                        </FormInputCont>
                        :
                        <>
                            <SegInput
                            name="one"
                            segs={segs}
                            dir="column"
                            width="w-full"
                            txtSize="sm"
                            sel={sel}
                            setSegs={setSegs}
                            />
                        {
                            sel &&
                        <>
                            <SegInput
                            name="two"
                            segs={segs}
                            dir="column"
                            width="w-full"
                            sel={sel}
                            setSegs={setSegs}
                            />
                            {
                                state.shift === 3 &&
                                <SegInput
                                name="two"
                                segs={segs}
                                dir="column"
                                width="w-full"
                                sel={sel}
                                setSegs={setSegs}
                                />
                            }
                        </>
                        }
                        </>
                    }      
                </div>
            } 
        </div>        
    )

}

export default DayBox
