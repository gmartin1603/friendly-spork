import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';

function Edit(props) {
  const [{view,users, profile}, dispatch] = useAuthState()

    return (
        <div className={`flex flex-wrap w-full overflow-auto py-10 justify-center`}>
          { profile.level < 1 &&
              <>
                <EeForm
                label="User Edit"
                view={view}
                users={users[view[0].dept]}
                profile={profile}
                URLs={URLs}
                />
                <EeForm
                label="Admin Edit"
                view={view}
                users={users.admin}
                profile={profile}
                admin
                URLs={URLs}
                /> 
              </>
          } 
          { profile.level < 2 &&
            <JobForm 
            users={users[view[0].dept]}
            />
          }
        </div>
    );
}

export default Edit;