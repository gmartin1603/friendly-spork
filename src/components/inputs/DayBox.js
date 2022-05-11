import {useState, useEffect} from 'react'
import { button } from '../../context/style/style'
import FormInput from '../FormInput'
import SegInput from '../SegInput'
import Button from './Button'


const DayBox = ({label,segments, day, state, setState, color}) => {
    const initalSegs = {
        one: {name:'', forced:false,trade:false}, 
        two: {name:'', forced:false,trade:false}, 
        three: {name:'', forced:false,trade:false}
    }
    
    const [show, setShow] = useState(false)
    const [sel, setSel] = useState(false)
    const [segTog, setSegTog] = useState(0)

    const [value, setValue] = useState('')

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


    const clear = () => {
        setPost({})
        setSegs(initalSegs)
        setSel(false)
    }

    useEffect(() => {
        if (state.down > 0) {
            let dateRef=`Down: ${new Date(state.down).getMonth()+1}/${new Date(state.down).getDate()}`
            if (state.norm) {

            } else {
                if (!sel) {
                    setSegs(prev => ({...prev, one: {name: dateRef, forced:false,trade:false}}))
                    
                } else {
                    setSegs(initalSegs)
                }
            }
        } else {
            setSegs(initalSegs)
        }
    },[state.down, sel, show])

    useEffect(() => {
        if (show) {
            if (state[day].id) {
                setPost(state[day])
                if (state[day].seg) {
                    setSegs(state[day].seg)
                }
            } else {
                setPost(((prev) => (
                    {
                        ...prev, 
                        id: `${state.job} ${label} ${state.shift}`,
                        date: label,
                        seg: segs
                    }
                    )))
            }

        } else {
            clear()
        }
    },[show])
    
    useEffect(() => {
        if (show) {
            setPost(prev => ({...prev, seg:segs}))
            if (!sel) {
                setValue(segs.one.name)
            } else if (state.shift < 3) {
                setValue(`${segs.one.name} / ${segs.two.name}`)
            } else {
                setValue(`${segs.one.name} / ${segs.two.name} / ${segs.three.name}`)

            }
        }
    },[segs])

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
        main:` bg-${color} border w-200 h-max px-.01 py-.02 m-.01`,
        showBtn:[`${show? button.red : button.green} w-.5`],
        selBtn:[`${button.green} w-[45%]`],
        field:`font-bold text-xl `,
    }
    
    return (
        <div className={styles.main}>
            <h6
            className={`font-bold text-lg text-white mb-.05`}
            >
                {new Date(label).toDateString().slice(0,3)} <br /> {new Date(label).toDateString().slice(3,10)}
            </h6>
            <Button 
            name="showTog"
            type="toggle" 
            style={styles.showBtn}
            label={show? "Cancel":"Fill"}
            value={show}
            action={handleChange}
            />
            
            {
            show &&
                <div>
                    <div className={`flex w-full justify-around mt-.05`}>
                        <Button 
                        name="selTog"
                        style={styles.selBtn}
                        disabled={!sel} 
                        label="Full"
                        value={!sel}
                        action={handleChange}
                        />
                        
                        <Button 
                        name="selTog"
                        style={styles.selBtn}
                        disabled={sel}
                        label="Part"
                        value={!sel}
                        action={handleChange}
                        />
                    </div>
                    {
                        state.down ?

                        <>
                        <FormInput
                        style={styles.field}
                        type="text"
                        name="one"
                        value={segs.one.name}
                        setValue={handleChange}
                        label={sel? segments.one : segments.full}
                        />
                        { 
                            sel &&
                            <>
                            <FormInput
                            style={styles.field}
                            type="text"
                            name="two"
                            setValue={handleChange}
                            value={segs.two.name}
                            label={segments.two}
                            />
                            {
                                state.shift === 3 &&
                                <FormInput
                                style={styles.field}
                                type="text"
                                name="three"
                                setValue={handleChange}
                                value={segs.three.name}
                                label={segments.two}
                                />

                            }
                            </>
                        }
                        </>
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
