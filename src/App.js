import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import { useAuthState } from "./context/auth/AuthProvider";
import { getData, getUser, getUsers, writeData } from "./firebase/firestore";
import { Outlet } from "react-router-dom";
import useAuthChange from "./helpers/authStateChange";
import PopUpForm from "./components/PopUpForm";
import MiscForm from "./components/MiscForm";
import Loading from "./components/Loading";
import BidForm from "./components/forms/BidForm";
import Callin from "./components/forms/Callin";
import RenderInWindow from "./components/RenderInWindow";
import WeekBar from "./components/WeekBar";
import tabs from "./assets/tabs.json";

{
  /* ------------ TODO --------------

1. Nofication system for call ins, new postings, posting changes, forces, etc.

*/
}

function App() {
  const [
    {
      formObj,
      view,
      show,
      showWeek,
      showBid,
      showCallin,
      version,
      wkBar,
      profile,
    },
    dispatch,
  ] = useAuthState();

  const user = useAuthChange();

  const [disabled, setDisabled] = useState(false);

  const loadMessage = {
    env: process.env.NODE_ENV,
    version: version,
    notes: `Archive document edit mode added.`,
  };

  // app init
  useEffect(() => {
    const users = async (profile) => {
      let users = {};
      let depts = [...profile.dept, "admin"];

      depts.map(async (dept) => {
        users[dept] = [];
        if (dept === "admin") {
          await getUsers("users", profile.dept)
            .then((snapShot) => {
              snapShot.forEach((doc) => {
                users[dept] = [...users[dept], doc];
              });
            })
            .catch((error) => {
              error && console.log(error.message);
            });
        } else {
          await getUsers("users", [dept])
            .then((snapShot) => {
              snapShot.forEach((doc) => {
                users[dept] = [...users[dept], doc];
              });
            })
            .catch((error) => {
              error && console.log(error.message);
            });
        }
        return dispatch({
          type: "SET-OBJ",
          name: "users",
          load: users,
        });
      });
    };

    const getColls = async (profile) => {
      let colls = [];
      await profile.dept.map(async (col) => {
        await getData(col).then((coll) => {
          colls.push(coll.arr);
        });
        return dispatch({
          type: "INIT",
          colls: colls,
          view: colls[0],
          profile: profile,
        });
      });
    };

    const init = async () => {
      const today = new Date();
      dispatch({
        type: "SET-VALUE",
        name: "today",
        load: today,
      });
      // console.log(user)
      await getUser(user).then((userDoc) => {
        // console.log(userDoc)
        // buildColumns(today)
        getColls(userDoc);
        if (userDoc.level < 3) {
          users(userDoc);
        }
      });
    };

    if (user) {
      console.log(loadMessage);
      init();
    } else {
      // navigate('/')
      dispatch({ type: "CLEAR" });
    }
  }, [user]);

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-auto bg-clearBlack`}
    >
      {user ? (
        view.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Header tabs={tabs[profile.role]} disabled={disabled} />
            <div
              className={`w-full flex flex-col justify-center items-around overscroll-none`}
            >
              {show && formObj && (
                <PopUpForm dept={view[0].dept} shifts={view[0].shifts} />
              )}
              {showCallin && (
                <RenderInWindow>
                  <Callin />
                </RenderInWindow>
              )}
              {showBid && formObj && (
                <BidForm dept={view[0].dept} shifts={view[0].shifts} />
              )}
              {showWeek && formObj && (
                <MiscForm shifts={view && view[0].shifts} />
              )}
              {view.length > 0 && <Outlet />}
              {wkBar && <WeekBar setDisabled={setDisabled} />}
            </div>
          </>
        )
      ) : (
        <LogIn />
      )}
    </div>
  );
}

export default App;
