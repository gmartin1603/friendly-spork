import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { button } from "../context/style/style";
import { auth } from "../firebase/auth";
import FormInput from "./FormInput";
import { toast } from "react-toastify";

function LogIn(props) {
  const [state, setState] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState("");

  // const local = false;
  const local = process.env.NODE_ENV === "development";

  const admin = process.env.REACT_APP_ADMIN.split(",");
  const supervisor = process.env.REACT_APP_SUPERVISOR.split(",");
  const cascEe = process.env.REACT_APP_CASC_EE.split(",");
  const csstEe = process.env.REACT_APP_CSST_EE.split(",");
  const csstOps = process.env.REACT_APP_CSST_OPERATIONS.split(",");
  const cascOps = process.env.REACT_APP_CASC_OPERATIONS.split(",");

  // console.log(admin, supervisor, cascEe, csstEe, csstOps, cascOps)

  const signin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error) {
        toast.error(error.message, { position: "top-center" });
        setState((prev) => ({ ...prev, password: "" }));
      }
    });
  };

  const passReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Link sent to " + email);
        alert(`Password reset link sent to ${email}`);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          setErrors(error.code);
        }
      });
    setState((prev) => ({ ...prev, password: "" }));
  };

  const handleChange = (e) => {
    let newStr = e.target.value;

    if (newStr.length > state[e.target.name].length) {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let email,
      pass = ["", ""];
    if (state.userName) {
      email = state.userName.trim();
    }
    if (state.password) {
      pass = state.password.trim();
    }
    if (e.target.id) {
      passReset(email);
    } else {
      signin(email, pass);
    }
  };

  const styles = {
    cover: ``,
    container: ``,
    form: ``,
    login: `${button.blue} font-bold text-lg p-.01 w-full border mt-.05`,
    reset: `${button.std} w-full bg-[gray] text-white mt-20 rounded border border-clearBlack font-semibold `,
    field: `font-bold text-xl`,
  };

  return (
    <div
      className={`bg-cover h-screen flex items-center justify-center`}
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/HP9vG5qMnym4cUblWIMtshPXQLDHiduXdqf7qGGAZqDdNM81GhgBxjiCRHkd09f67-FXaTGugoWE0mNlGq7R0oyckwCDe_bR1Ky_QkPawRsB9IFQR3nCg5N8jMVkS4hE6SMVAnJRVA=w2400')",
      }}
    >
      <div className="bg-todayGreen w-[300px] h-max p-.02  rounded-lg border-4">
        {local ? (
          // Quick login buttons for local development
          <div>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(admin[0], admin[1]);
              }}
            >
              ADMIN
            </button>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(supervisor[0], supervisor[1]);
              }}
            >
              SUPERVISOR
            </button>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(csstEe[0], csstEe[1]);
              }}
            >
              CSST EE
            </button>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(cascEe[0], cascEe[1]);
              }}
            >
              CASC EE
            </button>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(csstOps[0], csstOps[1]);
              }}
            >
              CSST OPERATIONS
            </button>
            <button
              className={styles.login}
              onClick={(e) => {
                e.preventDefault();
                signin(cascOps[0], cascOps[1]);
              }}
            >
              CASC OPERATIONS
            </button>
          </div>
        ) : (
          <form
            className={` flex-column justify-around`}
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormInput
              style={styles.field}
              type="email"
              label="Email"
              name="userName"
              setValue={handleChange}
              value={state.userName}
            />
            <FormInput
              style={styles.field}
              type="password"
              label="Password"
              name="password"
              setValue={handleChange}
              value={state.password}
            />
            <button
              name="login"
              type="submit"
              className={styles.login}
              onClick={(e) => handleSubmit(e)}
            >
              Log In
            </button>
            <button
              name="reset"
              id="reset"
              type="submit"
              className={styles.reset}
              onClick={(e) => handleSubmit(e)}
            >
              Reset Password
            </button>
          </form>
        )}
        {errors && (
          <div className={`border-2 border-clearRed bg-clearRed p-.02 mt-.05`}>
            <h4 className={`font-bold`}>ERROR:</h4>
            <h6 className={`font-semibold`}>{errors}</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogIn;
