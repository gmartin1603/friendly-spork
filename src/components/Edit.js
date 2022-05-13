import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';

function Edit(props) {

    const [{view,users, profile}, dispatch] = useAuthState()

    

    const handleSubmit = async (obj) => {
        let url = URLs.userApp
        console.log(url)
        console.log(obj)
        if (obj.id) {
            
            await fetch(`${url}/updateUser`,{
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'text/plain',},
                body: JSON.stringify(obj) 
            })
            .then(res => {
                console.log(res)
            })
        } else {

            await fetch(`${url}/newUser`,{
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'text/plain',},
                body: JSON.stringify(obj) 
            })
            .then(res => {
                console.log(res.body)
            })
        }
    }

    return (
        <div className={`flex flex-wrap w-full justify-center`}>
            {
             profile.level < 1 &&
             <>
                <EeForm
                label="User Edit"
                view={view}
                users={users[view[0].dept]}
                URLs={URLs}
                onSubmit={handleSubmit}
                />
                <EeForm
                label="Admin Edit"
                view={view}
                users={users.admin}
                admin
                URLs={URLs}
                onSubmit={handleSubmit}
                /> 
             </>
           } 
           {
               profile.level < 2 &&
                <JobForm/>
           }
        </div>
    );
}

export default Edit;





