import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';

function WeekBar(props) {
    const [{today},dispatch] = useAuthState()

    const updateContext = (e, type, name, load) => {
        console.log(type, name)
        e.preventDefault();
        dispatch({
          type: type,
          name: name,
          load: load
        })
    }

    // const buildColumns = () => {
    //     //Daylight Savings check
    //     const jan = new Date(today.getFullYear(), 0, 1);
    //     // const jul = new Date(today.getFullYear(), 6, 1);
    //     // console.log(`Daylight Savings => ${today.getTimezoneOffset() < jan.getTimezoneOffset()}`)
    //     let day = 24 * 60 * 60 * 1000
    //     //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset 
    //     let time = (today - ((today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()))+(today.getTimezoneOffset() < jan.getTimezoneOffset()? (60*60*1000) : 0)
    //     let d = today.getDay()
    //     if (d === 0) {
    //       d = 7
    //     }
    //     //monday = time - (day of the week * ms in a day) + 1 day in ms
    //     let mon = time - (d * day) + day
    //     let columns = [
    //       {tag:'Monday', id: 1, label: mon + (day * count),  align: "center", },
    //       {tag:'Tuesday', id: 2, label: (mon + day) + (day * count), align: "center", },
    //       {tag:'Wednesday', id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
    //       {tag:'Thursday', id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
    //       {tag:'Friday', id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
    //       {tag:'Saturday', id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
    //       {tag:'Sunday', id: 7, label: (mon + (day * 6)) + (day * count) , align: "center", },
    //     ]
    //     return columns
    //     // setCols(columns)
    //     // updateContext({
    //     //   type:"SET-ARR",
    //     //   name:"cols",
    //     //   load: columns
    //     // })
    //   }
    
    const styles = {  
        foot:`sticky left-0 h-[50px] flex justify-around w-full items-center`,
        button:`${button.green} px-.01 py-[2px] rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>        
            <button 
            className={styles.button} 
            onClick={(e) => {updateContext(e, "PREV-WEEK")}}
            >
                {`<<`} {'Week'} 
            </button> 
            {/* <button 
            className={styles.button} 
            onClick={(e) => {e.preventDefault(); screen <= 500? setScreen(550) : setScreen(499)}}
            > 
                {screen <= 500? 'Week View':'Day View'} 
            </button>  */}
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