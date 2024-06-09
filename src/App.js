import { useEffect, useState } from "react";
import "./App.css";
import "./style/forms.css";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import { useAuthState } from "./context/auth/AuthProvider";
import { getArchive, getData, getUser, getUsers, writeArchive, writeData } from "./firebase/firestore";
import { Outlet } from "react-router-dom";
import useAuthChange from "./helpers/authStateChange";
import PopUpForm from "./components/PopUpForm";
import MiscForm from "./components/MiscForm";
import Loading from "./components/Loading";
import BidForm from "./components/forms/BidForm";
import CallIn from "./components/forms/CallIn";
import RenderInWindow from "./components/RenderInWindow";
import colors from "./assets/colors";
import WeekBar from "./components/WeekBar";
import tabs from "./assets/tabs.json";
import { toast } from "react-toastify";
import CallInModal from "./components/modals/CallInModal";
import commonService from "./common/common";

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
      app_colors,
    },
    dispatch,
  ] = useAuthState();

  const user = useAuthChange();

  const [disabled, setDisabled] = useState(false);

  // ****** Firestore update operation from json files **************
  // const update = async () => {
  //   toast.info("Update Function Running")

  //   // import each json file from the casc folder
  //   // const {DOC_NAME} = await import("./private/{FOLDER}/{DOC}.json");

  //   const CASC = [];

  //   // await writeArchive("casc", "Mon Sep 11 2023", archiveDoc.default);

  //   // await getArchive("casc", "Mon Sep 11 2023").then((doc) => {
  //   //   console.log(doc);
  //   // });


  //   CASC.map(async (doc) => {
  //     console.log(doc.id)
  //     // await writeData("casc", doc);
  //   });

  //   toast.success("Update Function Complete")
  // };

  // useEffect(() => {
  //   // update();
  // }, []);

  // ****************************************************************

  const loadMessage = {
    env: process.env.NODE_ENV,
    version: version,
    notes: `Toast notifications are now enabled.  Please report any bugs to the developer.`,
  };

  const getColorInfo = async (color) => {
    
    const [res, error] = await commonService.getColorInfo(color);
    if (error) {
      console.error(error);
      throw new Error("Error getting color info");
    } else {
      return res
    }
  }

  // app init
  useEffect(() => {
    // Init app colors.
    (async () => {
      if (app_colors.length > 0) {
        return;
      }
      let options = [];
      
      for (let i in colors) {
        let color = colors[i];
        try {
          const res = await getColorInfo(color);
          if (i > 0 && i < 5) {
            // console.log("Color Info", res);
          }
          options.push({
            name: res.colors[0].name,
            text: res.colors[0].bestContrast,
            code: color,
          });
        } catch (error) {
          console.error(error);
        }
      }
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log("Color Options", options);
      dispatch({
        type: "SET-ARR",
        name: "app_colors",
        load: options,
      });
      
    })();


    const users = async () => {
      let users = await getUsers("users");
      return dispatch({
        type: "SET-OBJ",
        name: "users",
        load: users,
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
              className={`w-full flex flex-col justify-center items-center overscroll-none`}
            >
              {show && formObj && (
                <PopUpForm dept={view[0].dept} shifts={view[0].shifts} />
              )}
              {/* {showCallin && (
                // <CallInModal show={showCallin} />
                // <RenderInWindow>
                  // <CallIn />
                // </RenderInWindow>
              )} */}
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
