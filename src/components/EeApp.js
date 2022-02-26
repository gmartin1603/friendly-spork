import React from 'react';
import Schedual from './Schedual'

function EeApp({rows}) {

    return (
        <div className={`w-full flex justify-center overflow-auto`} >
            {
                rows.map(dept => (
                    <Schedual
                        rows={dept.slice(1)}
                        rota={dept[0]}
                    />

                ))
            }
        </div>
    );
}

export default EeApp;
