import React from 'react';
import Schedual from './Schedual'

function EeApp({rows}) {

    return (
        <div className={`flex justify-center`} >
            {
                rows.map((dept,i) => (
                    <Schedual
                        key={i}
                        rows={dept.slice(1)}
                        rota={dept[0]}
                    />

                ))
            }
        </div>
    );
}

export default EeApp;
