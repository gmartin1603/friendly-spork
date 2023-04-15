import React from 'react';
import { input } from '../context/style/style';

function FormInput({type, setValue, value, id, label, disabled, name, pattern, placeHolder,style, group, valiTag, chngTag}) {




    return (
        <div className={style}>
            <div className={`flex`}>
                <h6 className={"w-full text-left"}>{label}</h6>
                <p className={input.valiTag}>{valiTag}</p>
            </div>
            <input
            className={`w-full h-max text-black text-center font-semibold text-xl border-b border-l bg-white`}
            style={valiTag? {border: "2px solid red"}:chngTag? {border: "2px solid green"}:{}}
            type={type}
            value={value}
            name={name}
            id={id}
            data-group={group}
            disabled={disabled}
            onChange={(e) => setValue(e)}
            pattern={pattern}
            placeholder={placeHolder}
            />
        </div>
    );
}

export default FormInput;