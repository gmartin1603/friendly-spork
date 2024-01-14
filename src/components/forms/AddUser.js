import React, { useEffect, useState } from "react";
import { useAuthState } from "../../context/auth/AuthProvider";
import { button, input } from "../../context/style/style";
import { getUsers } from "../../firebase/firestore";
import commonService from "../../common/common";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormInputCont from "../inputs/FormInputCont";
import usersDashoardService from "../../common/usersDashoardService";

function AddUser(props) {
  const initalState = {
    profile: {
      name: { first: "", last: "" },
      dName: "",
      startDate: "",
      phone: "",
      quals: [],
      role: "",
      level: -1,
      dept: [],
    },
    auth: { email: "", password: "" },
  };
  const [{ view, colls, profile, users }, dispatch] = useAuthState();

  const [disabled, setDisabled] = useState(true);
  const [disableCanc, setDisableCanc] = useState(false);
  const [auth, setAuth] = useState(initalState.auth);
  const [state, setState] = useState(initalState.profile);
  const [dNameValid, setDNameValid] = useState(false);

  const roles = [
    { label: "Employee", role: "ee", level: 3 },
    { label: "Control Room", role: "op", level: 2 },
    { label: "Supervisor", role: "sup", level: 1 }
  ];

  if (profile.level < 1) {
    roles.push({ label: "Admin", role: "admin", level: 0 });
  }

  const clearForm = (e) => {
    if (e) {
      e.preventDefault();
    }
    setState(initalState.profile);
    setAuth(initalState.auth);
    props.closeModal()
  };

  const handleCall = async (obj) => {
    // console.log(obj);
    await usersDashoardService.addUser(obj).then((res) => {
      // console.log(res.message);
      if (res.message.toLowerCase().includes("error")) {
        toast.error(res.message);
        // console.log(res);
        setDisableCanc(false);
        setDisabled(false);
      } else {
        toast.success(res.message);
        clearForm();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(state)
    setDisableCanc(true);
    setDisabled(true);

    let authUpdate = {};
    if (auth.email.length > 5) {
      authUpdate.email = auth.email;
    }
    if (auth.password.length > 5) {
      authUpdate.password = auth.password;
    }
    handleCall({ id: state?.id, profile: state, auth: authUpdate });
  };

  const handleChange = async (e) => {
    e.preventDefault();
    let update = {};
    switch (e.target.name) {
      case "startDate":
        let str = e.target.value;
        let num = new Date(str).getTime() + 24 * 60 * 60 * 1000;
        setState((prev) => ({ ...prev, startDate: num }));
        break;
      case "name":
        update = { ...state[e.target.name], [e.target.id]: e.target.value };
        setState((prev) => ({ ...prev, [e.target.name]: update }));
        break;
      case "auth":
        setAuth((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        break;
      case "role":
        update = roles.find((role) => role.role === e.target.value);
        // console.log(update)
        setState((prev) => ({
          ...prev,
          level: update.level,
          role: update.role,
        }));
        break;
      case "quals":
        if (state.quals.includes(e.target.id)) {
          let update = [];
          for (let qual in state.quals) {
            if (state.quals[qual] !== e.target.id) {
              update.push(state.quals[qual]);
            }
          }
          setState((prev) => ({ ...prev, quals: update }));
        } else {
          let update = state.quals;
          update.push(e.target.id);
          setState((prev) => ({ ...prev, quals: update }));
        }
        break;
      case "group":
        let arr = state.quals;
        view.map((job) => {
          if (job.group === e.target.id) {
            if (!state.quals.includes(job.id)) {
              arr.push(job.id);
            }
          }
        });
        setState((prev) => ({ ...prev, quals: arr }));
        break;
      case "phone":
        // console.log(e.target.value);
        let formattedPhone = formatPhoneNumber(e.target.value);
        // console.log(formattedPhone);
        setState((prev) => ({ ...prev, phone: formattedPhone }));
        break;
      case "dName":
        checkName(e.target.value);
        setState((prev) => ({ ...prev, dName: e.target.value }));
      default:
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const formatPhoneNumber = (str) => {
    // Format input as: (xxx) xxx-xxxx
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return str;
  };

  const checkName = (name) => {
    let validated = true;
    users.map((user) => {
      if (user.dName === name) {
        // console.log("Name Taken");
        validated = false;
      }
    });
    setDNameValid(validated);
  }

  // const handleDateChange = (date) => {
  //   console.log(date);
  //   let num = new Date(date).getTime();
  //   setState((prev) => ({ ...prev, startDate: num }));
  // };

  const validate = () => {
    // console.log(state)
    if (
      state.level >= 0 &&
      state.dName &&
      dNameValid &&
      state.name.first &&
      state.name.last &&
      state.startDate &&
      auth.email &&
      auth.password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validate();
    // console.log(state)
  }, [state]);

  useEffect(() => {
    if (state.level > 2) {
      setState((prev) => ({ ...prev, dept: [view[0].dept] }));
    } else {
      let arr = [];
      const defaultDept = view[0].dept;
      arr.push(defaultDept);
      colls.forEach((dept) => {
        if (dept[0].dept !== defaultDept) {
          arr.push(dept[0].dept);
        }
      });
      setState((prev) => ({ ...prev, dept: arr }));
    }
  }, [view, state.role, props.users]);

  const styles = {
    form: `bg-white text-todayGreen rounded border-4 border-clearBlack w-[98%] h-min p-.02 m-10 rounded-xl`,
    button: `text-xl p-.01 w-full`,
    field: `font-bold text-xl`,
    qualContainer: `flex p-2 w-full justify-around`,
    group: `flex flex-wrap justify-center mx-2 w-full`,
    groupBtn: `${button.green} w-full my-10 h-max py-2`,
    selected: `shadow-clearBlack shadow-inner font-semibold text-white`,
    default: `bg-gray-light`,
    filterBtn: `${button.green} p-10`,
  };

  return (
    <form className={styles.form}>
      <div className={`flex flex-col justify-around`}>
        <div className={`w-full`}>
          <h1 className={`text-2xl font-bold text-center pb-.02`}>
            Add New User
          </h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="name"
                id="first"
                label="First Name"
                variant="standard"
                color="success"
                value={state.name.first}
                onChange={(e) => handleChange(e)}
                helperText={state.name.first.length === 0 ? "*Required" : undefined}
                error={state.name.first.length === 0}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="name"
                id="last"
                label="Last Name"
                variant="standard"
                value={state.name.last}
                onChange={(e) => handleChange(e)}
                helperText={state.name.last.length === 0 ? "*Required" : undefined}
                error={state.name.last.length === 0}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="dName"
                name="dName"
                label="Display Name"
                variant="standard"
                value={state.dName}
                onChange={(e) => handleChange(e)}
                helperText={state.dName.length === 0 ? "*Required" : dNameValid ? undefined : "* Name Taken"}
                error={state.dName.length === 0 || !dNameValid}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="auth"
                id="email"
                label="Email"
                type="email"
                variant="standard"
                color="success"
                value={auth.email}
                onChange={(e) => handleChange(e)}
                helperText={auth.email.length === 0 ? "*Required" : undefined}
                error={auth.email.length === 0}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="auth"
                id="password"
                label="Password"
                variant="standard"
                color="success"
                value={auth.password}
                onChange={(e) => handleChange(e)}
                helperText={auth.password.length === 0 ? "*Required" : undefined}
                error={auth.password.length === 0}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="phone"
                id="phone"
                label="Phone Number"
                variant="standard"
                color="success"
                value={state.phone}
                onChange={(e) => handleChange(e)}
                helperText={state.phone.length === 0 ? "*Required" : undefined}
                error={state.phone.length < 12}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role"
                  name="role"
                  color="success"
                  value={state.role}
                  onChange={(e) => handleChange(e)}
                  label="Role"
                  error={state.role.length === 0}
                >
                  {roles.map((role, i) => (
                    <MenuItem
                      key={role.role}
                      value={role.role}
                    >
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputCont
                styling={styles.field}
                label={"Start Date"}
                valiTag={state.startDate === "" ? "*Required" : undefined}
              >
                <input
                  type="date"
                  className={input.text}
                  name="startDate"
                  id="startDate"
                  // value={state.name.last}
                  onChange={(e) => handleChange(e)}
                />
              </FormInputCont>
              {/* <DatePicker
                name="startDate"
                className="text-center"
                showIcon
                todayButton="Today"
                fixedHeight
                selected={state.startDate}
                onChange={(date) => handleDateChange(date)}
                dateFormat="MM/dd/yyyy"
              /> */}
            </Grid>
          </Grid>
        </div>
        {state.role === "ee" && (
          <div className={styles.qualContainer}>
            <Grid container spacing={2}>
              {view[0].groups.map((group) => (
                // <div className={styles.group} key={group}>
                <Grid item xs={12} sm={4} key={group}>
                  <button
                    className={styles.groupBtn}
                    name="group"
                    id={group}
                    onClick={(e) => handleChange(e)}
                  >
                    {group.toUpperCase()}
                  </button>
                  <div className={`p-[2px] flex flex-wrap `}>
                    {view &&
                      view.map((job) => {
                        if (job.group === group || job.subGroup === group) {
                          return (
                            <button
                              key={job.id}
                              name="quals"
                              id={job.id}
                              className={`w-.5 cursor-pointer border-2 border-clearBlack my-[5px] p-[5px] rounded font-semibold text-white ${state.quals.includes(job.id)
                                ? "bg-todayGreen p-.02 shadow-clearBlack shadow-inner"
                                : "bg-gray-light"
                                }`}
                              onClick={(e) => handleChange(e)}
                            >
                              {job.label}
                            </button>
                          );
                        }
                      })}
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
      <div className={` w-full mt-20 flex`}>
        <button
          className={`${button.green} ${styles.button}`}
          disabled={disabled}
          onClick={(e) => handleSubmit(e)}
        >
          Create User
        </button>

        <button
          className={`${button.red} ${styles.button}`}
          onClick={(e) => clearForm(e)}
          disabled={disableCanc}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default AddUser;
