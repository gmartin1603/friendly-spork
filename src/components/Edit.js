import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import { auth } from '../firebase/auth';
import { getUsers } from '../firebase/firestore';

function Edit(props) {

    const [{view,users}, dispatch] = useAuthState()

    

    

    const handleSubmit = async (obj) => {
        let url = ''
        console.log(url)
        console.log(obj)
        if (obj.id) {

        } else {
            url = `${URLs.userApp}/newUser`
            await fetch(url,{
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'text/plain',},
                body: JSON.stringify(obj) 
            })
            .then(res => {
                console.log(res)
            })
        }
    }

    return (
        <div>
           <EeForm
           view={view}
           users={users[view[0].dept]}
           URLs={URLs}
           onSubmit={handleSubmit}
           /> 
        </div>
    );
}

export default Edit;





