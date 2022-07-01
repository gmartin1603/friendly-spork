import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';
import useCollListener from '../helpers/collectionListener';
import useUserListener from '../helpers/usersListener';
import usePostsListener from '../helpers/postsListener';
import RotaEdit from './forms/RotaEdit';
import { button } from '../context/style/style';

function Edit(props) {
  const [{view,users, profile}, dispatch] = useAuthState()

  const [deleted , setDeleted] = useState(NaN)
  const [disabled, setDisabled] = useState(false)
  
  useCollListener(view[0].dept) 
  useUserListener(view[0].dept)
  usePostsListener(`${view[0].dept}-posts`)

  const DbCleanUp = async (e) => {
    e.preventDefault();
    const prompt = confirm("All Overtime postings more than 30 days old will be permanently Deleted! Do you wish to Continue?")
    
    // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/postsCleanUp"
    const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/postsCleanUp"
          
    const data = {
      // coll: "messages",
      coll: `${view[0].dept.toString()}-posts`,
      now: new Date().getTime() - (30*24*60*60*1000),
    }
    if (prompt) {
      setDisabled(true)
      await fetch(URL, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => setDeleted(data))
      .catch((err) => {
          console.warn(err)
      })
    }
  }


    return (
        <div className={`flex flex-wrap w-full overflow-auto py-10 justify-around`}>
          { profile.level < 1 &&
              <>
                <RotaEdit/>
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
                <div className={`bg-white p-.02 h-max rounded-xl mt-[15px]`}>
                  { Number.isInteger(deleted)? 
                  <p className={`text-center mt-[15px] p-.01 bg-clearGreen rounded text-white font-semibold`}> {`${deleted} postings deleted`} </p>
                  :
                  <button
                  className={`${button.red} h-max p-10`}
                  onClick={(e) => DbCleanUp(e)}
                  disabled={disabled}
                  > 
                    Delete old postings 
                  </button>
                  }
                </div>
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