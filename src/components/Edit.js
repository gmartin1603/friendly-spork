import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';
import useCollListener from '../helpers/collectionListener';
import useUserListener from '../helpers/usersListener';
import usePostsListener from '../helpers/postsListener';
import RotaEdit from './forms/RotaEdit';

function Edit(props) {
  const [{view,users, profile}, dispatch] = useAuthState()
  
  useCollListener(view[0].dept) 
  useUserListener(view[0].dept)
  usePostsListener(`${view[0].dept}-posts`)

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
          <RotaEdit/>
        </div>
    );
}

export default Edit;