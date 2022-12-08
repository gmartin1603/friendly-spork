import React, { useEffect, useState } from 'react';
import { GithubPicker } from 'react-color';
import { useAuthState } from '../../context/auth/AuthProvider';
import { input } from '../../context/style/style';
import FormInput from '../FormInput';
import FormInputCont from '../inputs/FormInputCont';
import colors from '../../assets/colors'
import FormNav from '../FormNav';

function ScheSettings(props) {
    const [{rota, shifts}, dispatch] = useAuthState()

    const [active, setActive] = useState({})

    console.log(active)

    const handleChange = (e) => {
        e.preventDefault()
        let objUpdate = {}
        let arrUpdate = []
        switch (e.target.name) {
            case "str":
                setActive(prev => ({...prev, [e.target.id]: e.target.value}))
                break
                case "order":
                let order = e.target.value
                if (order == 0) {
                    order = shifts.length
                } else if (order > shifts.length) {
                    order = 1
                }
                setActive(prev => ({...prev, [e.target.id]: parseInt(order)}))
                break
            case "segs":
                objUpdate = {...active.segs, [e.target.id]: e.target.value}
                setActive((prev) => ({...prev, segs: objUpdate}))
                break
            default:
                console.log("ScheSettings handleChange, No Name")
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
                <h1 className="font-bold">Department Settings</h1>
                <p className="" onClick={() => setActive({})}>{`main menu`}</p>
            </div>
            {/* main menu */}
            <FormNav
            tabs={shifts}
            active={active}
            setActive={setActive}
            nav={active?.id? true:false}
            />

            {/* Shift selected */}
            { active?.id?
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
                            name="str"
                            id="label"
                            value={active.label}
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
                            id="order"
                            value={active.order}
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
                            name="segs"
                            id="full"
                            value={active.segs.full}
                            setValue={(e) => handleChange(e)}
                            />
                        : null}
                        {active?.segs?.one?
                            <FormInput
                            className={styles.input}
                            label={"Segment 1"}
                            type="text"
                            name="segs"
                            id="one"
                            value={active.segs.one}
                            setValue={(e) => handleChange(e)}
                            />
                        : null}
                        {active?.segs?.two?
                            <FormInput
                            className={styles.input}
                            label={"Segment 2"}
                            type="text"
                            name="segs"
                            id="two"
                            value={active.segs.two}
                            setValue={(e) => handleChange(e)}
                            />
                        : null}
                        {active?.segs?.three?
                            <FormInput
                            className={styles.input}
                            label={"Segment 3"}
                            type="text"
                            name="segs"
                            id="three"
                            value={active.segs.three}
                            setValue={(e) => handleChange(e)}
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
                : null
            }
        </div>
    );
}

export default ScheSettings;

function ColorPicker({group, active, setActive}) {
    const [show, setShow] = useState(false)
    const [color, setColor] = useState(active.color[group][0])

    useEffect(() => {
        console.log(active)
        if (active.id) {
            setColor(active.color[group][0])
        }
    }, [active]);

    const handleColorChange = (color, e) => {
        console.log(color.rgb)
        let rgb = color.rgb
        // const newColor = color.hex
        const newPrimary = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        const newSecondary = `rgb(${rgb.r},${rgb.g},${rgb.b},0.8)`
        const arrUpdate = [newPrimary, newSecondary]
        const stateUpdate = {...active.color, [group]:arrUpdate}
        // console.log({...active, color: stateUpdate})
        setActive(prev => ({...prev, color: stateUpdate}))
        setColor(newPrimary)
        setShow(false)
    }

    const styles = {
        main:``,
        h2:`font-bold text-green`,
        button: `cursor-pointer border-2 border-clearBlack shadow-inner shadow-[rgb(253,254,254,0.7)]`,
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
                style={{backgroundColor:color}}
                onClick={() => setShow(!show)}
                >
                    Change Color
                </div>
            </div>
            { show?
                <GithubPicker
                width="250px"
                colors={colors}
                onChangeComplete={(color,e) => handleColorChange(color,e)}
                />
                : null
            }
        </div>
    )
}