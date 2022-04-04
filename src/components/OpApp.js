import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Header from './Header';
import Schedual from './Schedual';

//*************** TODO ************* */
// render correct schedual
// callin wizard functionallity
// casc op name cedwmlo 

function OpApp({rows}) {

    console.log(rows)
    
    return (
        <div className={`mt-70`}>
            <h1>Op App View</h1>
            {
                rows &&
                <Schedual
                rows={rows.slice(1)}
                rota={rows[0]}
                />
            }    
            
        </div>
    );
}

export default OpApp;