import React, { useEffect, useState } from "react";
import { useAuthState } from "../../context/auth/AuthProvider";
import { button, input } from "../../context/style/style";
import { getUsers } from "../../firebase/firestore";
import FormInput from "../FormInput";
import FormInputCont from "../inputs/FormInputCont";
import Select from "../inputs/Select";

function EeForm(props) {
  let url = "";
  if (process.env.NODE_ENV === "production") {
    url =
      "https://us-central1-overtime-management-83008.cloudfunctions.net/app";
  } else {
    url = "http://localhost:5001/overtime-management-83008/us-central1/app";
  }

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
  const [{ view, colls, profile }, dispatch] = useAuthState();

  const [filter, setFilter] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disableCanc, setDisableCanc] = useState(false);
  const [auth, setAuth] = useState(initalState.auth);
  const [state, setState] = useState(initalState.profile);
  const [mode, setMode] = useState(-1);

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
    setMode(-1);
    setState(initalState.profile);
    setAuth(initalState.auth);
  };

  const filterUsers = (e) => {
    e.preventDefault();
    if (filter === e.target.value) {
      setFilter("");
    } else {
      setFilter(e.target.value);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const prompt = confirm(
      `Are you sure you want to DELETE ${state.dName}'s User Account and Profile data?`
    );
    if (prompt) {
      setDisableCanc(true);
      setDisabled(true);
      await fetch(`${url}/deleteUser`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: state.id,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.parse(data).message);
          clearForm();
        })
        .catch((error) => {
          error && console.log(error.message);
        });
    }
  };

  const handleCall = async (obj) => {
    if (obj.id) {
      await fetch(`${url}/updateUser`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.parse(data).message);
        })
        .catch((error) => {
          error && console.log(error.message);
        });
    } else {
      await fetch(`${url}/newUser`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.parse(data).message);
        })
        .catch((error) => {
          error && console.log(error.message);
        });
    }
    setDisableCanc(false);
    clearForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(state)
    setDisableCanc(true);
    setDisabled(true);

    if (auth.email || auth.password) {
      let authUpdate = {};
      if (auth.email.length > 5) {
        authUpdate.email = auth.email;
      }
      if (auth.password.length > 5) {
        authUpdate.password = auth.password;
      }
      handleCall({ id: state?.id, profile: state, auth: authUpdate });
    } else {
      handleCall({ id: state.id, profile: state });
    }
  };

  const getProfile = (e) => {
    let obj = JSON.parse(e.target.value);

    setState((prev) => ({
      ...prev,
      name: obj.name,
      dName: obj.dName,
      startDate: obj.startDate,
      phone: obj.phone ? obj.phone : "",
      quals: obj.quals,
      role: obj.role,
      level: obj.level,
      dept: obj.dept,
      id: obj.id,
    }));
    return setMode(2);
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
        update = JSON.parse(e.target.value);
        // console.log(update)
        setState((prev) => ({
          ...prev,
          [update.key]: update.prop,
          [e.target.name]: update.name,
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
        let newChar = e.target.value.charAt(e.target.value.length - 1);
        let newStr = state.phone;
        // console.log(newChar);
        if (e.target.value.length > state.phone.length) {
          if (Number.isInteger(parseInt(newChar)) && state.phone.length < 12) {
            if (state.phone.length === 3) {
              setState((prev) => ({
                ...prev,
                [e.target.name]: `${state.phone}-${newChar}`,
              }));
            } else if (state.phone.length === 7) {
              setState((prev) => ({
                ...prev,
                [e.target.name]: `${state.phone}-${newChar}`,
              }));
            } else {
              setState((prev) => ({
                ...prev,
                [e.target.name]: `${state.phone}${newChar}`,
              }));
            }
          }
        } else {
          if (e.target.value.charAt(e.target.value.length - 1) === "-") {
            setState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value.slice(0, -1),
            }));
          } else {
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          }
        }
        break;

      default:
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const validate = () => {
    // console.log(state)
    let validated = false;
    if (mode === 1) {
      if (
        state.level >= 0 &&
        state.dName &&
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
    } else if (mode === 2) {
      if (
        state.level >= 0 &&
        state.dName &&
        state.name.first &&
        state.name.last &&
        state.startDate
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validate();
    // console.log(state)
  }, [state]);

  useEffect(() => {
    let date = new Date(state.startDate);
    // console.log(date)

    if (mode > 0) {
      if (date.getMonth() + 1 < 10) {
        if (date.getDate() < 10) {
          document.querySelector(
            'input[name="startDate"]'
          ).value = `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-0${date.getDate()}`;
        } else {
          document.querySelector(
            'input[name="startDate"]'
          ).value = `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-${date.getDate()}`;
        }
      } else {
        if (date.getDate() < 10) {
          document.querySelector(
            'input[name="startDate"]'
          ).value = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-0${date.getDate()}`;
        } else {
          document.querySelector(
            'input[name="startDate"]'
          ).value = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`;
        }
      }
      roles.forEach((o, i) => {
        if (o.role === state.role) {
          document.querySelector('select[name="role"]').selectedIndex = `${
            i + 1
          }`;
        }
      });
    } else if (mode < 0) {
      setDisableCanc(false);
    }
  }, [mode]);

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
    form: `bg-white text-todayGreen rounded border-4 border-clearBlack w-max max-w-[600px] h-min p-.02 m-10 rounded-xl`,
    button: `text-xl p-.01 w-full`,
    field: `font-bold text-xl`,
    qualContainer: `p-[5px] w-.5`,
    group: `flex flex-wrap justify-center`,
    groupBtn: `${button.green} w-full my-10 py-[5px]`,
    selected: `shadow-clearBlack shadow-inner font-semibold text-white`,
    default: `bg-gray-light`,
    filterBtn: `${button.green} p-10`,
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      {/* initial state, select or create user */}
      {mode < 0 && (
        <div className={`w-max min-w-[200px] flex-column text-center my-.02`}>
          <h1 className={`text-center text-2xl font-bold`}>{props.label}</h1>
          {!props.admin && (
            <div className={`w-full flex justify-around`}>
              <button
                className={`${styles.filterBtn} ${
                  filter === "op" ? styles.selected : styles.default
                }`}
                onClick={(e) => filterUsers(e)}
                value="op"
              >
                Control <br /> Room
              </button>
              <button
                className={`${styles.filterBtn} ${
                  filter === "ee" ? styles.selected : styles.default
                }`}
                onClick={(e) => filterUsers(e)}
                value="ee"
              >
                Employees
              </button>
              <button
                className={`${styles.filterBtn} ${
                  filter === "sup" ? styles.selected : styles.default
                }`}
                onClick={(e) => filterUsers(e)}
                value="sup"
              >
                Supervisors
              </button>
            </div>
          )}
          <Select name="user" setValue={getProfile} id="">
            <option default value="">
              Select User
            </option>
            {props.users &&
              props.users.map((user) => {
                if (props.admin) {
                  if (user.level === 0) {
                    return (
                      <option key={user.id} value={JSON.stringify(user)}>
                        {" "}
                        {user.dName}{" "}
                      </option>
                    );
                  }
                } else if (user.dept[0] === view[0].dept) {
                  if (filter) {
                    if (user.role === filter) {
                      return (
                        <option key={user.id} value={JSON.stringify(user)}>
                          {" "}
                          {user.dName}{" "}
                        </option>
                      );
                    }
                  } else {
                    return (
                      <option key={user.id} value={JSON.stringify(user)}>
                        {" "}
                        {user.dName}{" "}
                      </option>
                    );
                  }
                }
              })}
          </Select>
          {/* create user not avalible when admin = true */}
          {!props.admin && (
            <>
              <h3 className={`font-bold text-xl py-.02`}>OR</h3>
              <button
                className={`${button.green} ${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMode(1);
                }}
              >
                Create New User
              </button>
            </>
          )}
        </div>
      )}
      {/* modify / create mode */}
      {mode > 0 && (
        <div className={`flex justify-around`}>
          <div className={`w-[200px]`}>
            <h1 className={`text-2xl font-bold text-center pb-.02`}>
              {mode > 1 ? "Modify User" : "New User"}
            </h1>
            <FormInputCont
              styling={styles.field}
              label={mode < 2 ? "Email" : "New Email"}
              valiTag={
                mode < 2 && auth.email.length < 8
                  ? "*Valid Email Required"
                  : undefined
              }
            >
              <input
                type="email"
                className={input.text}
                name="auth"
                id="email"
                value={auth.email}
                onChange={(e) => handleChange(e)}
              />
            </FormInputCont>
            <FormInputCont
              styling={styles.field}
              label={mode < 2 ? "Password" : "New Password"}
              valiTag={
                mode < 2 && auth.password.length < 8
                  ? "*Min 8 Characters long"
                  : undefined
              }
            >
              <input
                type="text"
                className={input.text}
                name="auth"
                id="password"
                value={auth.password}
                onChange={(e) => handleChange(e)}
              />
            </FormInputCont>
            <FormInputCont
              label="Role"
              styling={styles.field}
              valiTag={state.role === "" ? "*Required" : undefined}
            >
              <Select name="role" setValue={handleChange} id="">
                <option value="default">-Select-</option>
                {roles.map((role) => (
                  <option
                    key={role.role}
                    value={JSON.stringify({
                      key: "level",
                      prop: role.level,
                      name: role.role,
                    })}
                  >
                    {role.label}
                  </option>
                ))}
              </Select>
            </FormInputCont>
            <FormInputCont
              styling={styles.field}
              label={"First Name"}
              valiTag={state.name.first.length === 0 ? "*Required" : undefined}
            >
              <input
                type="text"
                className={input.text}
                name="name"
                id="first"
                value={state.name.first}
                onChange={(e) => handleChange(e)}
              />
            </FormInputCont>
            <FormInputCont
              styling={styles.field}
              label={"Last Name"}
              valiTag={state.name.last.length === 0 ? "*Required" : undefined}
            >
              <input
                type="text"
                className={input.text}
                name="name"
                id="last"
                value={state.name.last}
                onChange={(e) => handleChange(e)}
              />
            </FormInputCont>
            <FormInputCont
              styling={styles.field}
              label={"Display Name"}
              valiTag={state.dName.length === 0 ? "*Required" : undefined}
            >
              <input
                type="text"
                className={input.text}
                name="dName"
                id="dName"
                value={state.dName}
                onChange={(e) => handleChange(e)}
              />
            </FormInputCont>
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
            <FormInputCont styling={styles.field} label={"Phone Number"}>
              <input
                type="tel"
                className={input.text}
                name="phone"
                id="phone"
                value={state.phone}
                onChange={(e) => handleChange(e)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="(123)-456-7890"
              />
            </FormInputCont>
            {/* if modifing user */}
            {mode > 1 && (
              <div className={` w-full mt-20 flex`}>
                <button
                  className={`${button.red} ${styles.button}`}
                  onClick={(e) => deleteUser(e)}
                >
                  DELETE USER
                </button>
              </div>
            )}
          </div>
          {state.role === "ee" && (
            <div className={styles.qualContainer}>
              {view[0].groups.map((group) => (
                <div className={styles.group} key={group}>
                  <button
                    className={styles.groupBtn}
                    name="group"
                    id={group}
                    onClick={(e) => handleChange(e)}
                  >
                    {" "}
                    {group.toUpperCase()}{" "}
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
                              className={`w-.5 cursor-pointer border-2 border-clearBlack my-[5px] p-[5px] rounded ${
                                state.quals.includes(job.id)
                                  ? "bg-todayGreen p-.02 shadow-clearBlack shadow-inner font-semibold text-white"
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {mode > 0 && (
        <div className={` w-full mt-20 flex`}>
          <button
            className={`${button.green} ${styles.button}`}
            type={mode > 1 ? "submit" : "button"}
            disabled={disabled}
            onClick={(e) => handleSubmit(e)}
          >
            {mode > 1 ? "Save Changes" : "Create User"}
          </button>

          <button
            className={`${button.red} ${styles.button}`}
            onClick={(e) => clearForm(e)}
            disabled={disableCanc}
          >
            CANCEL
          </button>
        </div>
      )}
    </form>
  );
}

export default EeForm;
