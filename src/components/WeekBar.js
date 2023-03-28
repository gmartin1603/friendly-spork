import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import useWindowSize from '../helpers/windowSize';
import DatePicker from "react-datepicker";
import ScheSettings from './forms/ScheSettings';
import "react-datepicker/dist/react-datepicker.css";
import FormInputCont from './inputs/FormInputCont';

function WeekBar({setDisabled}) {
    const [{ profile, today, count },dispatch] = useAuthState()
    const [width, height] = useWindowSize([0,0]);
    const [show, setShow] = useState(false)

    const updateContext = (type, name, load) => {
      dispatch({
        type: type,
        name: name,
        load: load
      })
    }

    const handleChange = async (e) => {
      e.preventDefault();

      switch (e.target.id) {
        case "next":
          updateContext("NEXT-WEEK")
          break
        case "prev":
            updateContext("PREV-WEEK")
        break
        default:
          console.log("WeekBar switch Default")
      }
    }

    const handleDateChange = (date) => {
      console.log(date)
      updateContext("SET-TODAY", "today", date)
      // updateContext("SET-TODAY", "count", newCount)
    }

    useEffect(() => {
      if (!show) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }, []);

    const handleClick = (e) => {
      e.preventDefault()
      if (show) {
        setShow(false)
        setDisabled(false)
      } else {
        setShow(!show)
        setDisabled(true)
      }
    }

    const styles = {
        foot:`bg-clearBlack
        border-2
        border-black
        flex
        items-start justify-around
        h-max
        sticky
        bottom-0
        left-0
        pb-[15px]
        w-screen`,
        drawer:`bg-clearBlack absolute w-max max-w-[80%] p-.01 h-max`,
        open:`transition translate-y-[-100%] translate-x-[0%] duration-[1000ms]`,
        closed:`transition translate-y-[-100%] translate-x-[-300%] duration-[1500ms]`,
        button:`${button.green} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
        closeBtn:`${button.red} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>
            { profile.level === 0?
            <div className={`${styles.drawer} ${show? styles.open : styles.closed}`}>
              <ScheSettings
              toggle={setShow}
              show={show}
              />
            </div>
            : null}
            <button
            id="prev"
            className={styles.button}
            onClick={(e) => {handleChange(e)}}
            >
                {`<<`} {'Week'}
            </button>
            { profile.level === 0
            && width > 900?
            <button
            className={show? styles.closeBtn:styles.button}
            id="settings"
            onClick={(e) => handleClick(e)}
            >
              {show? "Close":"Settings"}
            </button>
            : null }
            <FormInputCont
            label="Date Search"
            styling={`flex w-min px-.01 flex-wrap items-center justify-center text-white p-[5px] mb-[10px] font-semibold text-lg bg-clearBlack border-2 border-black rounded-xl`}
            >
              <div className="text-black">
                <DatePicker
                className="text-center"
                showIcon
                todayButton="Today"
                fixedHeight
                selected={today}
                onChange={(date) => handleDateChange(date)}
                dateFormat="MM/dd/yyyy"
                />
              </div>
            </FormInputCont>
            <button
            id="next"
            className={styles.button}
            onClick={(e) => {handleChange(e)}}
            >
                {'Week'}  {`>>`}
            </button>
        </div>
    );
}

export default WeekBar;