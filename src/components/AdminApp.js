import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import PopUpForm from './PopUpForm';
import Schedual from './Schedual';

function AdminApp({rows}) {

    console.log(rows)
    const {show} = useAuthState();
    
    return (
        <div>
            <h1>Admin App View</h1>
            <PopUpForm
            show={show}
            type={"posting"}
            />
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

export default AdminApp;