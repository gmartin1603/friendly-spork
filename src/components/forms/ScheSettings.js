import React, { useEffect, useState } from 'react';
import { GithubPicker } from 'react-color';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button, input } from '../../context/style/style';
import FormInput from '../FormInput';
import FormInputCont from '../inputs/FormInputCont';
import colors from '../../assets/colors'
import FormNav from '../FormNav';
import { async } from '@firebase/util';

function ScheSettings(props) {
    const [{rota, shifts, users}, dispatch] = useAuthState()

    const [active, setActive] = useState({})
    const [fields, setFields] = useState({})
    const [disabled, setDisabled] = useState(true);
    const [disableCanc, setDisableCanc] = useState();

    const URL ="http://localhost:5001/overtime-management-83008/us-central1/fsApp"
    // const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/setPost"

    // resets active and fields on view change
    useEffect(() => {
        clear()
    }, [rota]);

    useEffect(() => {
        const validated = validate()
        console.log(validated)

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [fields, active]);

    const clear = () => {
        setActive({})
        setFields({})
        setDisableCanc(false)
    }

    const validate = () => {
        let val = true
        if (new String(active.label).length < 1) {
            val = false
        }
        for (const i in active.segs) {
            if (active.segs[i].length < 1) {
                val = false
            }
        }
        Object.keys(fields).map(group => {
            for (const key in fields[group]) {
                if (fields[group][key].length < 1) {
                    val = false
                }
            }
        })
        return val
    }

    const buildKeys = () => {
        let arr = []
        for (const group in fields) {
            // list of field keys in alphabetical order
            let keys = Object.keys(fields[group]).sort()
            arr.push({label: group, data:fields[group], keys: keys})
        }
        // Sort groups to keep keys in alphabetical order
        arr.sort((a, b) => {
            if (a.keys[0] < b.keys[0]) {
                return -1
            }
            if (a.keys[0] > b.keys[0]) {
                return 1
            }
            // if (a === b)
            return 0
        })
        return arr
    }

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
            case "fields":
                const name = e.target.value
                objUpdate = {...fields[e.target.dataset.group], [e.target.id]:name}
                console.log(objUpdate)
                setFields(prev => ({...prev, [e.target.dataset.group]: objUpdate}))
                break
            default:
                console.log("ScheSettings handleChange, No Name")
        }
    }

    const updatePosts = async (e) => {
        e.preventDefault()
        const load = {
            coll: `${rota.dept}-posts`,
        }
        await fetch(`${URL}/${e.target.id}`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(load)
        })
        .then(res => {
            console.log(res.json())
            // clear()
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisableCanc(true)
        const load = {
            id: rota.id,
            dept: rota.dept,
            shifts: {[active.id]: active},
            fields: {[active.id]: fields}
        }
        await fetch(`${URL}/editRota`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(load)
        })
        .then(res => {
            console.log(res.body)
            props.toggle(false)
            // clear()
        })
    }

    const styles = {
        main:`bg-white relative min-h-[350px] max-h-[600px] min-w-[400px] overflow-auto flex flex-col p-.02 text-green text-center`,
        header:`w-full flex flex-col justify-between mb-.01 border-b border-black`,
        cardCont:`w-full`,
        form:`flex flex-wrap justify-around w-full border-2 p-.02 border-t-0`,
        cont:`w-[50%]`,
        field:`flex flex-col items-center font-bold text-xl my-10`,
        input:`flex items-end justify-between font-semibold`,
        select:`w-.5 text-lg font-semibold text-black text-center rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`,
        btnCont:`w-full flex justify-around`,
        submit:`${button.green} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
        clear:`${button.red} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className="font-bold">Department Settings</h1>
                { active.id?
                <p className="cursor-pointer hover:underline hover:text-black" onClick={() => setActive({})}>{`Main Menu`}</p>
                :
                <>
                <button className={button.green} id="updatePosts" onClick={(e) => {updatePosts(e)}}>Update Posts</button>
                <button className={button.red} id="deleteOldPosts" onClick={(e) => {updatePosts(e)}}>DELETE Out Dated Posts</button>
                <FormInputCont
                styling={`flex w-full justify-between items-center mt-.01`}
                label="Display by"
                >
                    <select
                    className={styles.select}
                    name="sort"
                    value={''}
                    onChange={(e) => {}}
                    >
                        <option value="1">Shift ^</option>
                        <option value="1">Shift v</option>
                        <option value="1">Dept Asc</option>
                        <option value="1">Dept Dec</option>
                    </select>
                </FormInputCont>
                <FormInputCont
                styling={`flex w-full justify-between items-center mt-.01`}
                label="Row Scaling"
                >
                    <div className="w-.5 text-center">
                    Slider
                    </div>
                </FormInputCont>
                </>
                }
            </div>
            {/* main menu */}
            <FormNav
            tabs={shifts}
            active={active}
            setActive={setActive}
            setFields={setFields}
            nav={active?.id? true:false}
            />

            {/* Shift selected */}
            { active?.id?
                <div className={styles.form}>
                    <div className={styles.cont}>
                        <FormInput
                        style={styles.input}
                        valiTag={active.label.length === 0? true:false}
                        label={"Label"}
                        type="text"
                        name="str"
                        id="label"
                        value={active.label}
                        setValue={(e) => handleChange(e)}
                        />
                        <FormInput
                        style={styles.input}
                        valiTag={1 === 0? true:false}
                        label={"Display Order"}
                        type="number"
                        name="order"
                        id="order"
                        value={active.order}
                        setValue={(e) => handleChange(e)}
                        />
                        <FormInputCont
                        styling={`${styles.field} flex-col`}
                        label=''
                        valiTag={1 === 0? "*Required":undefined}
                        >
                            {active?.segs?
                                <FormInput
                                style={styles.input}
                                valiTag={active.segs.full.length === 0? true:false}
                                label={"Full Shift Hours"}
                                type="text"
                                name="segs"
                                id="full"
                                value={active.segs?.full}
                                setValue={(e) => handleChange(e)}
                                />
                            : null}
                            {active?.segs?
                                <FormInput
                                style={styles.input}
                                valiTag={active.segs.one.length === 0? true:false}
                                label={"Segment 1"}
                                type="text"
                                name="segs"
                                id="one"
                                value={active.segs?.one}
                                setValue={(e) => handleChange(e)}
                                />
                            : null}
                            {active?.segs?
                                <FormInput
                                style={styles.input}
                                valiTag={active.segs.two.length === 0? true:false}
                                label={"Segment 2"}
                                type="text"
                                name="segs"
                                id="two"
                                value={active.segs?.two}
                                setValue={(e) => handleChange(e)}
                                />
                            : null}
                            {Object.keys(active?.segs).length === 4?
                                <FormInput
                                style={styles.input}
                                valiTag={active.segs.three.length === 0? true:false}
                                label={"Segment 3"}
                                type="text"
                                name="segs"
                                id="three"
                                value={active.segs?.three}
                                setValue={(e) => handleChange(e)}
                                />
                            : null}
                        </FormInputCont>
                    </div>
                    {/* rotation name edit fields */}
                    <div className={styles.cont}>
                        {
                            buildKeys().map(group => (
                                <FormInputCont
                                key={group.label}
                                styling={styles.field}
                                label={group.label.toUpperCase()}
                                valiTag={1 === 0? "*Required":undefined}
                                >
                                    {
                                       group.keys.map(key => (
                                           <FormInput
                                           key={key}
                                           valiTag={fields[group.label][key].length < 1}
                                           style={styles.input}
                                           label={key}
                                           type="text"
                                           name={"fields"}
                                           group={group.label}
                                           id={key}
                                           value={group.data[key]}
                                           setValue={(e) => handleChange(e)}
                                           />
                                       ))
                                    }
                                </FormInputCont>
                            ))
                        }
                    </div>
                    <div className={styles.btnCont}>
                        <button
                        className={styles.submit}
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        >Save Changes</button>
                        <button className={styles.clear}
                        onClick={(e) => clearChanges(e)}
                        disabled={disableCanc}
                        >Discard Changes</button>
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
    const [sync, setSync] = useState(true);

    useEffect(() => {
        console.log(sync)
        if (active.id) {
            setColor(active.color[group][0])
        }
    }, [active, sync]);

    const syncColor = (e) => {
        setSync(!sync)
    }

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
                        <input className={`mr-10`} type="checkbox" name="sync" value={group} onChange={(e) => syncColor(e)}/>
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