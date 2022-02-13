import React, { useEffect } from 'react';
import Header from './Header';

function EeApp({profile}) {

    useEffect(() => {
        console.log(profile)
    },[])

    return (
        <div>
            <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
            <h1>{profile.dName}</h1>
            <h1>{new Date(profile.startDate).toDateString()}</h1>
        </div>
    );
}

export default EeApp;