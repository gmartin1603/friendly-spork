import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
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
        <div className={`mt-70 p-0.2`}>
            <PopUpForm
            show={show}
            posts={view && view[0].posts}
            shifts={view && view[0].shifts}
            />
            <div className={`w-full flex p-0.2`}>
                <div className={`bg-todayGreen w-max px-20 py-10 flex justify-center rounded-lg mx-.02 `}>
                    <select name="dept" onChange={(e) => handleChange(e)}
                    className={`w-100 text-center  m-.02 bg-transparent border text-2xl`}
                    >
                        {
                            rows.map((dept,i) => (
                                <option value={i} key={dept}>{dept[0].dept.toUpperCase()}</option>
                            ))
                        }
                    </select>
                </div>
                {/* <MiscForm/> */}
            </div>
            
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