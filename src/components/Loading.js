import React from 'react';

function Loading(props) {
    return (
        <div className={`w-screen h-screen flex justify-center items-center bg-clearBlack `}>
            <h1
            className={`text-white text-xl`}
            >LOADING...</h1>
        </div>
    );
}

export default Loading;