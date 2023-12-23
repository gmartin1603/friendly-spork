import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from "../../context/style/style";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import commonService from '../../common/common';
import { toast } from 'react-toastify';

function EditJob({ refreshJobs, closeModal }) {
    const [{ view, shifts, users, profile }, dispatch] = useAuthState();

    const initialState = {
        name: "",
        group: "misc",
        order: view.length,
        dept: view[0].dept,
        // test collection
        // dept: "messages",
    };

    const [disabled, setDisabled] = useState(true);
    const [disableCanc, setDisableCanc] = useState(false);
    const [state, setState] = useState(initialState);
    const [uids, setUids] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        switch (e.target.name) {
            case "shift":
                if (state[e.target.value]) {
                    setState((prev) => ({
                        ...prev,
                        [e.target.value]: !prev[e.target.value],
                    }));
                } else {
                    setState((prev) => ({ ...prev, [e.target.value]: true }));
                }
                break;
            case "user":
                let arr = [];
                if (uids.includes(e.target.value)) {
                    for (const uid in uids) {
                        if (uids[uid] !== e.target.value) {
                            arr.push(uids[uid]);
                        }
                    }

                    setUids(arr);
                } else {
                    setUids((prev) => [...prev, e.target.value]);
                }
                break;
            default:
                // console.log(e.target.name)
                setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        let job = {
            users: uids,
        };
        for (const key in state) {
            if (key === "name") {
                job['label'] = state[key];
            } else {
                job[key] = state[key];
            }
        }
        console.log(job);

        commonService.addJob(job).then((data) => {
            console.log(data);
            if (data.status) {
                toast.success(data.message);
                refreshJobs();
                clear();
            }
        })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const clear = (e) => {
        if (e) {
            e.preventDefault();
        }
        setState(initialState);
        setDisableCanc(false);
        setUids([]);
        closeModal();
    };

    useEffect(() => {
        console.log("STATE: ", state)
        // console.log(uids)
        if (state.name.length > 0) {
            if (state.first || state.second || state.third || state.night) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        } else {
            setDisabled(true);
        }
    }, [state, uids]);

    const styles = {
        main: `bg-white rounded-xl text-green rounded border-4 border-clearBlack w-[400px] h-min p-.02 m-.01`,
        banner: `text-center text-2xl font-bold`,
        initCont: ``,
        btnCont: `w-full flex justify-around`,
        field: `font-bold text-xl`,
        h3: `text-center text-xl font-semibold my-10`,
        check: `bg-[#AEB6BF] border-2 border-clearBlack p-.02 rounded font-bold text-xl text-center `,
        checkWrapper: `flex flex-wrap w-full justify-around my-10`,
        shiftWrapper: `border-2 mt-10`,
        submit: `${button.green} w-full text-xl mt-20 p-.01 rounded`,
        cancel: `${button.red} w-full text-xl mt-20 p-.01 rounded`,
        selected: `shadow-clearBlack shadow-inner font-semibold text-white`,
        default: `bg-gray-light`,
        filterBtn: `${button.green} p-10 my-.01`,
        select: `w-full text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`,
    };
    return (
        <form className={styles.main}>
            <h1 className={styles.banner}>Create Job</h1>
            <>
                <FormControl variant="filled" sx={{ mb: 2, width: "100%" }}>
                    <TextField
                        id="add-job-name"
                        label="Job Name"
                        name="name"
                        variant='filled'
                        color="success"
                        value={state.name}
                        onChange={(e) => handleChange(e)}
                        error={state.name.length === 0}
                    />
                </FormControl>

                <FormControl variant="filled" sx={{ width: "100%" }}>
                    <InputLabel id="dept-select-label">Deptartment</InputLabel>
                    <Select
                        labelId="dept-select-label"
                        id="add-job-dept-select"
                        name="dept"
                        color="success"
                        value={state.dept}
                        onChange={(e) => handleChange(e)}
                        error={state.dept.length === 0}
                    >
                        {profile.dept.map((dept, i) => (
                            <MenuItem
                                key={dept}
                                value={dept}
                            >
                                {dept.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <Select
                label="Schedule Group"
                name="group"
                value={state.group}
                setValue={handleChange}
                >
                    <option value="misc" default >Misc</option>
                </Select> */}
                <div className={styles.shiftWrapper}>
                    <h3 className={styles.h3}>Assign Possible Shifts</h3>
                    <div className={styles.checkWrapper}>
                        {shifts.map((shift) => (
                            <button
                                name="shift"
                                key={shift.label}
                                className={`${styles.filterBtn} ${state[shift.id] ? styles.selected : styles.check
                                    }`}
                                type="checkbox"
                                value={shift.id}
                                onClick={(e) => handleChange(e)}
                            >
                                {shift.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className={styles.h3}>Assign Qualified Employees</h3>
                    {users &&
                        users.map((user) => {
                            if (user.dept[0] === state.dept && user.role === "ee") {
                                return (
                                    <button
                                        className={`w-.5 cursor-pointer border-2 border-clearBlack my-[5px] p-[5px] rounded ${uids.includes(user.id)
                                            ? "bg-todayGreen p-.02 shadow-clearBlack shadow-inner font-semibold text-white"
                                            : "bg-gray-light"
                                            }`}
                                        value={user.id}
                                        name="user"
                                        onClick={(e) => handleChange(e)}
                                        key={user.id}
                                    >
                                        {user.dName}
                                    </button>
                                );
                            }
                        })}
                </div>
                <div className={styles.btnCont}>
                    <button
                        className={styles.submit}
                        type="submit"
                        disabled={disabled}
                        onClick={(e) => handelSubmit(e)}
                    >
                        {"Create Job"}
                    </button>
                    <button
                        className={styles.cancel}
                        type="submit"
                        disabled={disableCanc}
                        onClick={(e) => clear(e)}
                    >
                        Cancel
                    </button>
                </div>
            </>
        </form>
    );
}

export default EditJob;