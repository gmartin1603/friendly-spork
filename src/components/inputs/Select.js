import React from 'react';

function Select(props) {
    return (
        <label htmlFor={props.label}
        className={`w-full font-bold text-xl `}
        >
            <h6>{props.label}</h6>
            <select
            className={`min-w-min text-lg font-semibold text-black rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`} 
            onChange={(e) => props.setValue(e)}
            // value={props.value} 
            name={props.name} 
            id={props.id} 
            >
                {props.children}
            </select>
        </label>
    );
}

export default Select;