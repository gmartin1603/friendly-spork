import React from 'react';

function FormInput({type, setValue, value, id, label, disabled}) {


    

    return (
        <div className={`w-full font-bold text-xl`}>
         <h6>{label}</h6>
         <input
         className={`text-black font-semibold text-lg border-b bg-white`} 
         type={type} 
         value={value}
         id={id}
         disabled={disabled}
         onChange={(e) => setValue(e)}
         />   
        </div>
    );
}

export default FormInput;