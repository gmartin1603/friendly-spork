import React from 'react';

function FormInput({type, setValue, value, id, label, disabled, name, pattern, placeHolder,style}) {


    

    return (
        <div className={style}>
         <h6>{label}</h6>
         <input
         className={`w-full text-black text-center font-semibold text-xl border-b bg-white`} 
         type={type} 
         value={value}
         name={name}
         id={id}
         disabled={disabled}
         onChange={(e) => setValue(e)}
         pattern={pattern}
         placeholder={placeHolder}
         />   
        </div>
    );
}

export default FormInput;