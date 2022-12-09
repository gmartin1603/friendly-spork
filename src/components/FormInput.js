import React from 'react';

function FormInput({type, setValue, value, id, label, disabled, name, pattern, placeHolder,style, valiTag}) {




    return (
        <div className={style}>
         <h6 className={"w-full text-left"}>{label}</h6>
         <input
         className={`w-full h-max text-black text-center font-semibold text-xl border-b border-l bg-white`}
         style={valiTag? {border: "2px solid red"}:{}}
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