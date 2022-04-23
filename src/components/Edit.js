import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'

function Edit(props) {

    const {view} = useAuthState()

    const call = async (obj) => {
        let url = ''
        console.log(url)
        console.log(obj)
        if (obj.id) {

        } else {
            url = `${URLs.userAppLocal}/newUser`
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
           onSubmit={call}
           /> 
        </div>
    );
}

export default Edit;





