import React, { useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import FormInput from './FormInput';
import ScheSettings from './forms/ScheSettings';

function WeekBar(props) {
    const [{today},dispatch] = useAuthState()
    const [show, setShow] = useState(false)

    const updateContext = (e, type, name, load) => {
        // console.log(type, name)
        e.preventDefault();

        dispatch({
          type: type,
          name: name,
          load: load
        })
    }

    const handleChange = (e) => {
      if (e.target.value) {
        updateContext(e,"SET-TODAY", "today",new Date(new Date(e.target.value).getTime() + (24*60*60*1000)))
      } else {
        updateContext(e,"SET-TODAY", "today",new Date())
      }
    }

    const handleClick = (e) => {
      e.preventDefault()
      if (show) {
        setShow(false)
      } else {
        setShow(!show)
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
        drawer:`bg-clearBlack absolute w-max max-w-[60%] p-.01 h-max`,
        open:`transition translate-y-[-100%] translate-x-[0%] duration-1000`,
        closed:`transition translate-y-[400px] translate-x-[50%] duration-1000`,
        button:`${button.green} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>
            <div className={`${styles.drawer} ${show? styles.open : styles.closed}`}>
              <ScheSettings/>
            </div>
            <button
            className={styles.button}
            onClick={(e) => {updateContext(e, "PREV-WEEK")}}
            >
                {`<<`} {'Week'}
            </button>
            <button
            className={styles.button}
            id="settings"
            onClick={(e) => handleClick(e)}
            >
              Settings
            </button>
            <FormInput
            style={`flex w-[210px] px-.01 flex-wrap items-center justify-between text-white p-[5px] mb-[10px]`}
            label="Date Search"
            type="date"
            setValue={(e) => handleChange(e)}
            />
            <button
            className={styles.button}
            onClick={(e) => {updateContext(e, "NEXT-WEEK")}}
            >
                {'Week'}  {`>>`}
            </button>
        </div>
    );
}

export default WeekBar;