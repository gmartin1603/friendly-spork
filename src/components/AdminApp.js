import React from 'react';
import Header from './Header';

function AdminApp({profile}) {

    
    return (
        <div>
            <Header name={profile.name} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
            <h1>Admin App View</h1>
        </div>
    );
}

export default AdminApp;