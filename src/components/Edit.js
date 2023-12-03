import React, { useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';
import useCollListener from '../helpers/collectionListener';
import useUserListener from '../helpers/usersListener';
import usePostsListener from '../helpers/postsListener';

function Edit(props) {
  const [{ view, users, profile }, dispatch] = useAuthState()

  useCollListener(view[0].dept)
  useUserListener(view[0].dept)
  usePostsListener(`${view[0].dept}-posts`)

  return (
    <div className={`flex flex-wrap w-full h-[93vh] overflow-auto py-10 justify-around`}>
      {profile.level < 1 &&
        <>
          <EeForm
            label="User Edit"
            view={view}
            users={users[view[0].dept]}
            profile={profile}
          />
          <EeForm
            label="Admin Edit"
            view={view}
            users={users.admin}
            profile={profile}
            admin
          />
        </>
      }
      {profile.level < 2 &&
        <JobForm
          users={users[view[0].dept]}
        />
      }
    </div>
  );
}

export default Edit;