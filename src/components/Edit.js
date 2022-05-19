import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import EeForm from './forms/EeForm';
import URLs from '../firebase/funcURLs.json'
import JobForm from './forms/JobForm';
import { getUsers } from '../firebase/firestore';

function Edit(props) {

    const [{view,users, profile}, dispatch] = useAuthState()

    console.log(users)

    const recall = async (profile) => {
        let users = {}
        let depts = [...profile.dept, "admin"]
  
        depts.map(async dept => {
          users[dept] = []
          if (dept === "admin") {
            await getUsers("users",profile.dept)
            .then(snapShot => {
              snapShot.forEach(doc => {
                users[dept] = [...users[dept], doc]
              })
            })
  
          }
          await getUsers("users",[dept])
          .then(snapShot => {
            snapShot.forEach(doc => {
              users[dept] = [...users[dept], doc]
            })
          })
          .catch(error => {
            error && console.log(error.message)
          })
          return (
            dispatch(
              {
                type: "SET-OBJ",
                name: "users",
                load: users
              }
            )
          )
        })
      }

    const handleSubmit = async (obj) => {
        let url = URLs.userApp
        
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
            .catch(error => {
                error && console.log(error.message)
            })
        }
        recall(profile)
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
                <JobForm 
                users={users[view[0].dept]}
                />
           }
        </div>
    );
}

export default Edit;





