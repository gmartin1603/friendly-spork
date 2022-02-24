import React from 'react';
import Schedual from './Schedual'

function EeApp({profile}) {

    return (
        <div className={`w-full flex justify-center overflow-auto`} >
            <Schedual/>
        </div>
    );
}

export default EeApp;
