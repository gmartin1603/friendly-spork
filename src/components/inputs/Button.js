import React, { useState } from 'react';

function Button(props) {
    const [clicked, setClicked] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        
        if (props.toggle) {
            setClicked(!clicked)
            e.target.value = clicked
            return props.action(e)
        } else {
            props.action(e)
        }

    }

    return (
        <button
        name={props.name}
        type={props.type}
        id={props.id}
        value={props.value}
        className={`${clicked? props.style[1]:props.style[0]} ${props.variant}`}
        disabled={props.disabled}
        onClick={(e) => handleClick(e)}
        >
            {props.label}
        </button>
    );
}
export default Button;