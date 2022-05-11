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
// rgb(253, 254, 254)
// rgb(253, 254, 254, 0.8)
// rgb(9, 189, 149 )
// rgb(9, 189, 149, 0.8)
export default Button;