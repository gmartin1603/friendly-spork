import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
import { CirclePicker } from 'react-color';
import { GithubPicker } from 'react-color';
import { SketchPicker } from 'react-color';
import { useAuthState } from '../../context/auth/AuthProvider';
import { input } from '../../context/style/style';
import FormInput from '../FormInput';
import FormInputCont from '../inputs/FormInputCont';

function ScheSettings(props) {
    const [{rota, shifts}, dispatch] = useAuthState()

    const [active, setActive] = useState({})

    console.log(active)

    const handleChange = (e) => {
        if (e.target) {
            e.preventDefault()
            console.log(e.target.value)
        } else {
            console.log(e)
        }
    }

    const styles = {
        main:`bg-white relative max-h-[600px] overflow-auto flex flex-wrap p-.02 text-green text-center`,
        header:`w-full mb-.01 pb-.01 border-b border-black`,
        cardCont:`w-full`,
        form:`flex w-full`,
        cont:`w-[50%] m-.02`,
        field:`flex font-bold text-xl my-10`,
        input:`flex`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className="font-bold">ScheSettings</h1>
                <p className="">{`main menu`}</p>
            </div>
            {/* main menu */}
            <div className={styles.cardCont}>
                { shifts.map(shift => (
                    <Card
                    key={shift.id}
                    title={`${shift.label} Shift Settings`}
                    desc="Click to modify schedule settings"
                    data={shift}
                    setActive={setActive}
                    />
                ))}
            </div>
            {/* Shift selected */}
            <div className={styles.form}>
                <div className={styles.cont}>
                    <FormInputCont
                    styling={styles.field}  
                    label='Label'
                    valiTag={0 === 0? "*Required":undefined}
                    >
                        <input 
                        className={input.text}
                        type="text" 
                        name="label"
                        value={active.label + " Shift"} 
                        onChange={(e) => handleChange(e)}
                        />
                    </FormInputCont>
                    <FormInputCont
                    styling={styles.field}  
                    label='Order'
                    valiTag={0 === 0? "*Required":undefined}
                    >
                        <input 
                        className={input.text}
                        type="number" 
                        name="order"
                        value={1} 
                        onChange={(e) => handleChange(e)}
                        />
                    </FormInputCont>
                    <FormInputCont
                    styling={`${styles.field} flex-col`}  
                    label='Segments'
                    valiTag={0 === 0? "*Required":undefined}
                    > 
                    {active?.segs?.full?
                        <FormInput 
                        className={styles.input}
                        label={"Full Shift"}
                        type="text" 
                        name="full" 
                        value={active.segs.full}
                        onChange={(e) => handleChange(e)}
                        />
                     : null}
                    {active?.segs?.one?
                        <FormInput 
                        className={styles.input}
                        label={"Segment 1"}
                        type="text" 
                        name="full" 
                        value={active.segs.one}
                        onChange={(e) => handleChange(e)}
                        />
                     : null}
                    {active?.segs?.two?
                        <FormInput 
                        className={styles.input}
                        label={"Segment 2"}
                        type="text" 
                        name="full" 
                        value={active.segs.two}
                        onChange={(e) => handleChange(e)}
                        />
                     : null}
                    {active?.segs?.three?
                        <FormInput 
                        className={styles.input}
                        label={"Segment 3"}
                        type="text" 
                        name="three" 
                        value={active.segs.three}
                        onChange={(e) => handleChange(e)}
                        />
                     : null}
                    </FormInputCont>
                    <FormInputCont
                    styling={`${styles.field} flex-col`}  
                    label='Color'
                    valiTag={0 === 0? "*Required":undefined}
                    >
                        {active.color?
                        rota.groups.map(group => (
                            <ColorPicker
                            key={group}
                            group={group}
                            active={active}
                            setActive={setActive}
                            />
                            ))
                        :''}
                    </FormInputCont>
                </div>
                <div className={styles.cont}>
                    <FormInputCont
                    styling={styles.field}  
                    label={"key groups"}
                    valiTag={0 === 0? "*Required":undefined}
                    >
                        <FormInput 
                        className={styles.input}
                        label={"rotaKey"}
                        type="text" 
                        name={"rotaKey"} 
                        value={"Dave"}
                        onChange={(e) => handleChange(e)}
                        />
                    </FormInputCont>
                </div>
            </div>
        </div>
    );
}

export default ScheSettings;

function ColorPicker({group, active, setActive}) {
    const [show, setShow] = useState(false)
    const [color, setColor] = useState(active.color[group][0])

    const handleColorChange = (color, e) => {
        console.log(color.rgb)
        let rgb = color.rgb
        const newColor = color.hex
        // const newColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        const arrUpdate = [newColor, newColor]
        const stateUpdate = {...active.color, [group]:arrUpdate}
        // console.log({...active, color: stateUpdate})
        setActive(prev => ({...prev, color: stateUpdate}))
        setColor(newColor)
        setShow(false)
    }

    const colors = [
        // '#4D4D4D', 
        // '#999999', 
        '#F44E3B', 
        '#FE9200', 
        '#FCDC00', 
        '#DBDF00', 
        '#A4DD00', 
        '#68CCCA', 
        '#73D8FF', 
        '#AEA1FF', 
        // '#FDA1FF', 
        // '#333333', 
        // '#808080', 
        // '#cccccc', 
        '#D33115', 
        '#E27300', 
        '#FCC400', 
    '#B0BC00', 
    '#68BC00', 
    '#16A5A5', 
    '#009CE0', 
    '#7B64FF', 
    '#FA28FF', 
    // '#000000', 
    // '#666666', 
    // '#B3B3B3', 
    '#9F0500', 
    '#C45100', 
    '#FB9E00', 
    '#808900', 
    '#194D33', 
    '#0C797D', 
    '#0062B1', 
    '#653294', 
    '#AB149E',
    '#FFFFFF', 
]

    const styles = {
        main:``,
        h2:`font-bold text-green`,
        button: `bg-[${color}] cursor-pointer border-2 border-clearBlack shadow-inner shadow-[rgb(253,254,254,0.7)]`,
    }
    return (
        <div className={styles.main}>
            <div
            key={group}
            className={input.text}
            // className={`w-[40%] flex items-center justify-around`}
            >
                <div className={`flex justify-around p-.01`}>
                    <h2 className={styles.h2}>{group.toUpperCase()}</h2>
                    <label className={`flex w-max items-center justify-around`} htmlFor="sync">
                        <input className={`mr-10`} type="checkbox" name="sync" id={group} />
                        <p className={`text-sm`}>Sync Group Color Across All Shifts</p>
                    </label>
                </div>
                <div
                key={group}
                className={styles.button}
                onClick={() => setShow(!show)}
                >
                    Change Color
                </div>
            </div>
            { show? 
                <GithubPicker 
                width="250px"
                colors={colors}
                onChange={(color,e) => handleColorChange(color,e)}
                />
                : null
            }
        </div>
    )
}

function Card({title, data, desc, setActive, active}) {
    // console.log(data)
    const handleClick = (e) => {
        e.preventDefault()
        // console.log(data)
        setActive(data)
    }
    const styles = {
        main:`bg-green pl-.02 m-.02 w-full min-w-[100px] cursor-pointer text-white text-left
        border hover:border-clearBlack shadow-inner hover:shadow-black`,
        h1:`underline underline-offset-2`,
        p:`font-base text-base`,
    }
    return (
        <div className={styles.main}
        onClick={(e) => handleClick(e)}
        >
            <h1 className={styles.h1}>
                {title}
            </h1>
            <p className={styles.p}>{desc}</p>
        </div>
    )
}