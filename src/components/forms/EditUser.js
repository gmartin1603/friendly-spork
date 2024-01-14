import React, { useEffect, useState } from "react";
import { useAuthState } from "../../context/auth/AuthProvider";
import { button, input } from "../../context/style/style";
import commonService from "../../common/common";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormInputCont from "../inputs/FormInputCont";
import { Cancel, Save } from "@mui/icons-material";
import moment from "moment";

function EditUser({ user, closeModal }) {
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
  const [prevState, setPrevState] = useState(initalState.profile);
  const [dNameValid, setDNameValid] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const roles = [
    { label: "Employee", role: "ee", level: 3 },
    { label: "Control Room", role: "op", level: 2 },
    { label: "Supervisor", role: "sup", level: 1 },
    { label: "Admin", role: "admin", level: 0 },
  ];

  const clearForm = (e) => {
    if (e) {
      e.preventDefault();
    }
    setState(initalState.profile);
    setAuth(initalState.auth);
    closeModal()
  };

  const handleCall = async (obj) => {
    await commonService.commonAPI("app/updateUser", obj).then((res) => {
      if (res.message.toLowerCase().includes("error")) {
        toast.error(res.message);
        if (process.env.NODE_ENV !== 'production') console.error(res);
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
    let profileUpdate = { ...state, email: auth.email };
    profileUpdate.dept = [state.dept];
    if (state.level < 3) {
      departmentOptions.map((dept) => {
        if (dept !== state.dept) {
          profileUpdate.dept.push(dept);
        }
      })
    }
    if (state.dept[0] !== prevState.dept[0]) {
      // alert user that the users old depatment qualifications will be removed
      // console.log("Dept Changed")

    }
    let payload = {
      id: state.id,
      profile: profileUpdate,
    }
    if (auth.email !== prevState.email) {
      authUpdate['email'] = auth.email;
      if (auth.password.length > 0) {
        authUpdate['password'] = auth.password;
      }
      payload['auth'] = authUpdate;
    }
    handleCall(payload);
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
        if (e.target.id === "email") {
          validateEmail(e.target.value);
        } else {
          validatePassword(e.target.value);
        }
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
          let update = structuredClone(state.quals);
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
        validatePhone(formattedPhone);
        setState((prev) => ({ ...prev, phone: formattedPhone }));
        break;
      case "dName":
        checkName(e.target.value);
        setState((prev) => ({ ...prev, dName: e.target.value }));
        break;
      case "dept":
        setState((prev) => ({ ...prev, dept: e.target.value }));
        break;
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
    if (name.length < 1 || name === prevState.dName) {
      validated = true;
    }
    // console.log("Display Name Validated: ", validated)
    setDNameValid(validated);
  }

  const validatePhone = (phone) => {
    let validated = true;
    // validate for (xxx) xxx-xxxx
    if (!phone.match(/^\(\d{3}\)\s\d{3}-\d{4}$/)) {
      validated = false;
    }
    if (phone.length === 0) {
      validated = true;
    }
    // console.log("Phone Validated: ", validated)
    setValidPhone(validated);
  };

  const validateEmail = (email) => {
    let validated = true;
    if (email.length < 5) {
      validated = false;
    } else if (!email.match(/@/)) {
      validated = false;
    } else if (!email.match(/\./)) {
      validated = false;
    }
    if (email.length === 0) {
      validated = true;
    }
    // console.log("Email Validated: ", validated)
    setValidEmail(validated);
  };

  const validatePassword = (password) => {
    let validated = true;
    if (password.length < 8) {
      validated = false;
    } else if (!password.match(/[A-Z]/)) {
      validated = false;
    } else if (!password.match(/[0-9]/)) {
      validated = false;
    }
    if (password.length === 0) {
      validated = true;
    }
    // console.log("Password Validated: ", validated)
    setValidPassword(validated);
  };

  const validate = () => {

    let validated = true;
    if (state.name.first.length === 0) {
      // console.log("First Name Invalid: ", state.name.first)
      validated = false;
    } else if (state.name.last.length === 0) {
      // console.log("Last Name Invalid: ", state.name.last)
      validated = false;
    } else if (state.dName.length === 0) {
      // console.log("Display Name Invalid: ", state.dName)
      validated = false;
    } else if (state.phone.length === 0) {
      // console.log("Phone Invalid: ", state.phone)
      validated = false;
    } else if (state.role.length === 0) {
      // console.log("Role Invalid: ", state.role)
      validated = false;
    } else if (state.startDate.length === 0) {
      // console.log("Start Date Invalid: ", state.startDate)
      validated = false;
    } else if (!validEmail) {
      // console.log("IvalidEmail: ", validEmail)
      validated = false;
    } else if (!validPassword) {
      // console.log("IvalidPassword: ", validPassword)
      validated = false;
    } else if (!validPhone) {
      // console.log("IvalidPhone: ", validPhone)
      validated = false;
    } else if (!dNameValid) {
      // console.log("Invalid Display Name: ", dNameValid)
      validated = false;
    }
    let startDate_A = moment(state.startDate).format("MM-DD-YYYY");
    let startDate_B = moment(prevState.startDate).format("MM-DD-YYYY");
    if (state.name.first === prevState.name.first &&
      state.name.last === prevState.name.last &&
      state.dName === prevState.dName &&
      state.phone === prevState.phone &&
      state.role === prevState.role &&
      startDate_A === startDate_B &&
      state.dept === prevState.dept &&
      state.quals.length === prevState.quals.length &&
      auth.email === prevState.email &&
      auth.password === prevState.password) {
      // console.log("No Changes")
      validated = false;
    }
    if (state.role === "ee") {
      let added = false;
      let removed = false;
      state.quals.map((qual) => {
        // console.log("Qual: ", qual)
        if (!prevState.quals.includes(qual)) {
          // console.log("New Qual: ", qual)
          added = true;
        }
      })
      prevState.quals.map((qual) => {
        // console.log("PrevQual: ", qual)
        if (!state.quals.includes(qual)) {
          // console.log("Removed Qual: ", qual)
          removed = true;
        }
      })
      if (added || removed) {
        // console.log("Added or Removed Quals: ", true)
        validated = true;
      }
    }
    // console.log("Validated: ", validated)
    setDisabled(!validated);
  };

  const getDepartmentJobs = () => {
    let arr = [];
    if (state.dept === prevState.dept) {
      setState((prev) => ({ ...prev, quals: prevState.quals }));
    } else {
      setState((prev) => ({ ...prev, quals: [] }));
    }

    colls.map((dept) => {
      if (dept[0].dept === state.dept) {
        setGroups(dept[0].groups)
        dept.map((job) => {
          arr.push(job);
        });
      }
    });
    setJobs(arr);
  };

  const getDepartmentOptions = (deptArray) => {
    let arr = [];
    let defaultDept = deptArray[0];
    arr.push(defaultDept);
    colls.forEach((dept) => {
      if (dept[0].dept === defaultDept) {
        setGroups(dept[0].groups)
      } else {
        arr.push(dept[0].dept);
      }
    });
    setDepartmentOptions(arr);
  };

  useEffect(() => {
    // console.log("State: ", state)
    // console.log("Prev :", prevState)
    validate();
  }, [state, auth]);

  useEffect(() => {
    // console.log(colls)
    if (state.dept.length > 0) {
      getDepartmentJobs();
    }
  }, [colls, state.dept]);

  useEffect(() => {
    setDisableCanc(false);
    if (user) {
      // console.log(user.details)
      getDepartmentOptions(user.dept);
      let quals = user.details.map((qual) => qual.id);
      let obj = {
        id: user.id,
        name: user.name,
        dName: user.displayName,
        startDate: new Date(user.startDate).getTime(),
        phone: user.phone,
        quals: quals,
        role: user.role,
        level: user.level,
        dept: user.dept[0],
      }
      // console.log(obj)
      setAuth({ email: user.email, password: "" });
      setState(obj);
      setPrevState({ ...obj, password: "", email: user.email });
    }
  }, [user]);


  // useEffect(() => {
  //   // Set department options for user roles 0, 1, & 2
  //   if (state.level < 3) {
  //     let arr = [];
  //     let defaultDept = view[0].dept;
  //     if (state.dept.length > 0) {
  //       defaultDept = state.dept[0];
  //     }
  //     arr.push(defaultDept);
  //     colls.forEach((dept) => {
  //       if (dept[0].dept !== defaultDept) {
  //         arr.push(dept[0].dept);
  //       }
  //     });
  //     setState((prev) => ({ ...prev, dept: arr }));
  //   }
  // }, [view, state.role, users]);

  const styles = {
    form: `bg-white text-todayGreen rounded border-4 border-clearBlack w-[98%] h-min p-.02 m-10 rounded-xl`,
    button: `text-xl p-.01 w-full`,
    field: `font-bold text-xl`,
    qualContainer: `flex p-2 w-full justify-around`,
    group: `flex flex-wrap justify-center`,
    groupBtn: `${button.green} w-full my-10 py-[5px]`,
    selected: `shadow-clearBlack shadow-inner font-semibold text-white`,
    default: `bg-gray-light`,
    filterBtn: `${button.green} p-10`,
  };

  return (
    <form className={styles.form}>
      <div className={`flex flex-col justify-around`}>
        <div className={`w-full`}>
          <h1 className={`text-2xl font-bold text-center pb-.02`}>
            Edit User
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
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <InputLabel id="dept-select-label">Deptartment</InputLabel>
                <Select
                  labelId="dept-select-label"
                  id="edit-user-dept-select"
                  name="dept"
                  color="success"
                  value={state.dept}
                  onChange={(e) => handleChange(e)}
                  error={state.dept.length === 0}
                >
                  <MenuItem
                    key="none"
                    value=""
                  >
                    {"None"}
                  </MenuItem>
                  {departmentOptions.map((dept, i) => (
                    <MenuItem
                      key={dept}
                      value={dept}
                    >
                      {dept.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="auth"
                id="email"
                label="Email"
                variant="standard"
                color="success"
                value={auth.email}
                onChange={(e) => handleChange(e)}
                helperText={auth.email.length === 0 ? "*Required" : !validEmail ? "Please enter a valid email address" : undefined}
                error={auth.email.length === 0 || !validEmail}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="auth"
                id="password"
                label="New Password"
                variant="standard"
                color="success"
                value={auth.password}
                onChange={(e) => handleChange(e)}
                helperText={!validPassword ? "*Password must at least 8 characters long and contain at least 1 capitol letter and 1 number." : undefined}
                error={!validPassword}
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
                helperText={state.phone.length === 0 ? "*Required" : !validPhone ? "Please enter a valid phone number" : undefined}
                error={!validPhone || state.phone.length === 0}
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
                  value={moment(state.startDate).format("YYYY-MM-DD")}
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
              {groups.map((group) => (
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
                    {jobs.map((job) => {
                      if (job.group === group || job.subGroup === group) {
                        return (
                          <button
                            key={`${job.id} - ${job.dept}`}
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
        <Button
          className={`${button.green} ${styles.button}`}
          variant="contained"
          color="success"
          disabled={disabled}
          onClick={(e) => handleSubmit(e)}
        >
          <Save /> &nbsp; Save
        </Button>

        <Button
          className={`${button.red} ${styles.button}`}
          variant="contained"
          color="error"
          onClick={(e) => clearForm(e)}
          disabled={disableCanc}
        >
          <Cancel /> &nbsp; CANCEL
        </Button>
      </div>
    </form>
  );
}

export default EditUser;
