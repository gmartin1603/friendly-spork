import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from "../../context/style/style";
import FormInput from "../FormInput";
import commonService from '../../common/common';
import { toast } from 'react-toastify';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import jobsDashboardService from '../../common/jobsDashboardService';
import moment from 'moment';

function EditJob({ job, closeModal, refreshJobs }) {
    const [{ view, users, profile, colls }, dispatch] = useAuthState();

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
    const [noshift, setNoshift] = useState(false);
    const [noshiftConfirm, setNoshiftConfirm] = useState(false);
    const [state, setState] = useState(initialState);
    const [uids, setUids] = useState([]);
    const [shifts, setShifts] = useState([]);

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

    const handleSubmit = async (e) => {
      if (e) {
        e.preventDefault();
      }
        let omit = ["details", "key"];
        let job = {};
        let keys = Object.keys(state);
        for (const key in state) {
            if (key === "name") {
                job['label'] = state[key];
            } else if (omit.includes(key)) {
                continue;
            } else {
                job[key] = state[key];
            }
        }

        job['lastModified'] = moment().format("MMM DD, YYYY hh:mm a");

        // console.log(uids)
        // console.log(job);

        jobsDashboardService.editJob({ job: job, users: uids }).then((data) => {
            // console.log(data);
            if (data.status) {
                toast.success(data.message);
                refreshJobs();
                // clear();
            }
        })
            .catch((err) => {
                // console.log(err);
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
        let arr = [];
        colls.forEach((dept) => {
          dept.map((doc) => {
            if (doc.id === "rota" && doc.dept === job.dept) {
              for (const shift in doc.shifts) {
                arr.push(doc.shifts[shift]);
              }
            }
          })
        })
        // sort by display order
        arr.sort((a, b) => a.order - b.order);
        setShifts(arr);
    }, [colls]);

    useEffect(() => {
        if (job) {
            // console.log("JOB: ", job)
            setState(job);
            let arr = [];
            job.details.map((detail) => {
                arr.push(detail.id);
            });
            setUids(arr);
        }
    }, [job]);

    useEffect(() => {
        // console.log("STATE: ", state)
        // console.log(uids)
        if (state.name.length > 0) {
            if (state.first || state.second || state.third || state.night) {
              setNoshift(false);
            } else {
              setNoshift(true);
            }
            setDisabled(false);
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
        noshiftConfirm: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          borderRadius: '10px',
          boxShadow: 24,
          minHeight: '200px',
          width: '475px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
      }
    };
    return (
      <>
        <form className={styles.main}>
            <h1 className={styles.banner}>Modify Job</h1>
            <>
                <FormControl variant="filled" sx={{ mb: 2, width: "100%" }}>
                    <TextField
                        id="edit-job-name"
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
                        id="edit-job-dept-select"
                        name="dept"
                        color="success"
                        value={state.dept}
                        onChange={(e) => handleChange(e)}
                        error={state.dept.length === 0}
                        disabled
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
                            if (user.dept[0] === job.dept && user.role === "ee") {
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
                        onClick={(e) => { e.preventDefault(); noshift? setNoshiftConfirm(true) : handleSubmit(e)}}
                    >
                        {"Save Changes"}
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
        {/* Modals */}
        <Modal
          open={noshiftConfirm}
          onClose={() => setNoshiftConfirm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.noshiftConfirm}>
            <Typography variant='h6'><b> No Shifts Selected </b></Typography>
            <p className="text-center mb-4">
              Postings for this job can not be created without at least one shift assigned. Do you want to continue saving this job?
            </p>
            <div className='w-[90%] flex justify-around'>
              <Button
                variant='contained'
                color="error"
                className={styles.modalBtn}
                onClick={() => setNoshiftConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color="success"
                className={styles.modalBtn}
                onClick={() => {
                  setNoshiftConfirm(false);
                  handleSubmit();
                }}
              >
                Yes
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    );
}

export default EditJob;