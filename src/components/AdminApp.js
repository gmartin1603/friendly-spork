import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Header from './Header';
import MiscForm from './MiscForm';
import PopUpForm from './PopUpForm';
import Schedual from './Schedual';

//************ TODO ************* */
// form for filling misc overtime
// manage users page
//  - add user
//  - assign role
//  - update user
//      - password reset
//      - change roles
// style dept select


function AdminApp({rows}) {

    const {show} = useAuthState()
    const [view, setView] = useState()
    const [depts, setDepts] = useState()
    
    console.log(view)

    useEffect(() => {
        setDepts(rows)
        depts &&
        setView(depts[0])
    },[rows])

    const handleChange = (e) => {
        // e.preventDefault();
        setView(depts[e.target.value])
    }
    
    return (
        <div >
            <Header
            view={view}
            rows={rows}
            handleChange={handleChange}
            />
            <PopUpForm
            show={show}
            posts={view && view[0].posts}
            shifts={view && view[0].shifts}
            />
            
            
                {
                    view &&
                    <Schedual
                    rows={view.slice(1)}
                    rota={view[0]}
                    />
                }

                
            
        </div>
    );
}

export default AdminApp;