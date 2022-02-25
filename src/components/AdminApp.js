import React from 'react';
import Header from './Header';
import Schedual from './Schedual';

function AdminApp({rows}) {

    console.log(rows)
    
    
    return (
        <div>
            <h1>Admin App View</h1>
            {
                rows.map(dept => (
                    <Schedual
                        rows={dept}
                        rota={dept[0]}
                    />

                ))
            }
        </div>
    );
}

export default AdminApp;