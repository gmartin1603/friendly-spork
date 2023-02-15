import React, { useEffect, useState } from 'react';
import { GithubPicker } from 'react-color';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button, input } from '../../context/style/style';
import FormInput from '../FormInput';
import FormInputCont from '../inputs/FormInputCont';
import FormNav from '../FormNav';

function ScheSettings({toggle, show, }) {
    const [{rota, shifts, users}, dispatch] = useAuthState()

    const [active, setActive] = useState({})
    const [fields, setFields] = useState({})
    const [unsaved, setUnsaved] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [disableCanc, setDisableCanc] = useState();

    const URL ="http://localhost:5001/overtime-management-83008/us-central1/fsApp"
    // const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/setPost"

    // resets active and fields on view change
    useEffect(() => {
        clear()
    }, [rota, show]);

    useEffect(() => {
        const validated = validate()
        // console.log("Validated: ", validated)
        const changeChk = findChange()
        // console.log("Changed: ", changeChk)

        if (changeChk) {
            setUnsaved(true)
        } else {
            setUnsaved(false)
        }

        if (validated) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [fields, active]);

    const handleClick = (e) => {
        e.preventDefault()
        // console.log(data)
        if (unsaved) {
           const prompt = confirm("Unsaved changes will be discarded, continue?")
           if (prompt) {
            clear()
           }
        } else {
            clear()
        }
    }

    const clear = () => {
        setActive({})
        setFields({})
        setDisableCanc(false)
        // props.toggle(false)
    }

    const findChange = () => {
        let change = false
        if (active.id) {
            if (active.order !== rota.shifts[active.id].order) {
                // console.log("Unsaved Order Change")
                change = true
            }
            if (active.label !== rota.shifts[active.id].label) {
                // console.log("Unsaved Label Change")
                change = true
            }
            for (const prop in fields) {
                for (const field in fields[prop]) {
                    if (fields[prop][field] !== rota.fields[active.id][prop][field]) {
                        // console.log("Unsaved Field Change")
                        change = true
                    }
                }
            }
            for (const prop in active.segs) {
                if (active.segs[prop] !== rota.shifts[active.id].segs[prop]) {
                    // console.log("Unsaved Seg Change")
                    change = true
                }
            }
        }
        return change
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
            clear()
        })
    }

    const styles = {
        main:`select-none bg-white relative min-h-max max-h-[600px] min-w-[400px] overflow-auto flex flex-col p-.02 text-green text-center`,
        header:`w-full flex flex-col justify-between mb-.01 border-b border-black`,
        cardCont:`w-full`,
        form:`flex flex-wrap justify-around w-full border-2 p-.02 border-t-0`,
        cont:``,
        field:`flex flex-col items-between font-bold text-xl my-10`,
        input:`flex items-end justify-between font-semibold`,
        select:`w-.5 text-lg font-semibold text-black text-center rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`,
        btnCont:`w-full flex justify-around`,
        submit:`${button.green} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
        clear:`${button.red} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className="font-bold text-xl p-.01">Department Settings</h1>
                { active.id?
                <p className="cursor-pointer hover:underline hover:text-black" onClick={(e) => handleClick(e)}>{`Main Menu`}</p>
                :
                <>
                <button className={button.green} id="updatePosts" onClick={(e) => {updatePosts(e)}}>Update Posts</button>
                <button className={button.red} id="deleteOldPosts" onClick={(e) => {updatePosts(e)}}>DELETE Out Dated Posts</button>
                {/* <FormInputCont
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
                </FormInputCont> */}
                </>
                }
            </div>
            {/* main menu */}
            <FormNav
            tabs={shifts}
            active={active}
            unsaved={unsaved}
            setActive={setActive}
            setFields={setFields}
            nav={active?.id? true:false}
            />

            {/* Shift selected */}
            { active?.id?
                <div className={styles.form}>
                    <div className={styles.cont}>
                        <FormInputCont
                        styling={`${styles.field}`}
                        label=''
                        valiTag={1 === 0? "*Required":undefined}
                        >
                        <FormInput
                        style={styles.input}
                        valiTag={active.label.length === 0? true:false}
                        chngTag={active.label !== rota.shifts[active.id].label}
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
                        chngTag={active.order !== rota.shifts[active.id].order}
                        label={"Display Order"}
                        type="number"
                        name="order"
                        id="order"
                        value={active.order}
                        setValue={(e) => handleChange(e)}
                        />
                            {active?.segs?
                                <FormInput
                                style={styles.input}
                                valiTag={active.segs.full.length === 0? true:false}
                                chngTag={active.segs.full !== rota.shifts[active.id].segs.full}
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
                                chngTag={active.segs.one !== rota.shifts[active.id].segs.one}
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
                                chngTag={active.segs.two !== rota.shifts[active.id].segs.two}
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
                                chngTag={active.segs.three !== rota.shifts[active.id].segs.three}
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
                                           chngTag={fields[group.label][key] !== rota.fields[active.id][group.label][key]}
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
                        onClick={(e) => clear(e)}
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