import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import FormInput from './FormInput';

function WeekBar(props) {
    const [{today},dispatch] = useAuthState()

    const updateContext = (e, type, name, load) => {
        console.log(type, name)
        if (e) {
            e.preventDefault();
        }

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
    
    const styles = {  
        foot:`bg-clearBlack 
        border-2 
        border-black 
        flex 
        items-start justify-around
        h-[115px]
        fixed 
        bottom-0 
        left-0 
        w-full`,
        button:`${button.green} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>        
            <button 
            className={styles.button} 
            onClick={(e) => {updateContext(e, "PREV-WEEK")}}
            >
                {`<<`} {'Week'} 
            </button> 
            <FormInput
            style={`sticky left-0 flex w-[275px] px-.01 items-center justify-between text-white p-[5px] mb-[10px]`}
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