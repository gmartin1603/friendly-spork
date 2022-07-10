import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';

function WeekBar(props) {
    const [{},dispatch] = useAuthState()

    const updateContext = (e, type, name, load) => {
        e.preventDefault();
        dispatch({
          type: type,
          name: name,
          load: load
        })
    }
    
    const styles = {  
        foot:`sticky left-0 p-.02 flex justify-around w-full`,
        button:`${button.green} px-.01 py-[2px] rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>        
            <button 
            className={styles.button} 
            onClick={(e) => {updateContext(e, "PREV-WEEK")}}
            >
                {`<<`} {screen <= 500? 'Day' : 'Week'} 
            </button> 
            <button 
            className={styles.button} 
            onClick={(e) => {e.preventDefault(); screen <= 500? setScreen(550) : setScreen(499)}}
            > 
                {screen <= 500? 'Week View':'Day View'} 
            </button> 
            <button 
            className={styles.button} 
            onClick={(e) => {updateContext(e, "NEXT-WEEK")}}
            > 
                {screen <= 500? 'Day' : 'Week'}  {`>>`} 
            </button>  
        </div>
    );
}

export default WeekBar;