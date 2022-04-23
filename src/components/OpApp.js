import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Header from './Header';
import Schedual from './Schedual';

//*************** TODO ************* */
// render correct schedual
// callin wizard functionallity
// casc op name cedwmlo 

function OpApp({rows, profile}) {

    console.log(rows)
    
    return (
        <div >
            <Header name={profile.dName}/>
            {
                rows &&
                <Schedual
                profile={profile}
                rows={rows.slice(1)}
                rota={rows[0]}
                />
            }    
            
        </div>
    );
}

export default OpApp;