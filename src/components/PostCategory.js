import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Post from './Post';

function PostCategory({job,shift}) {
    
    const [pend,setPend] = useState([])
    const today = new Date().getTime()
    
    const [{view, profile}, dispatch] = useAuthState()
    const posts = usePostsListener(view[0].dept, profile.id)

    // console.log(posts)
    // console.log(job)

    useEffect(() => {
        let keys = Object.keys(posts)
        let arr = []
        keys.forEach(key => {
            if (posts[key].pos === job.id) {
                    if (posts[key].down > today) {
                    // console.log(job.id)
                    if (posts[key].shift === shift.index) {

                        arr.push(posts[key])
                    }
                }
            }
        })
        
        setPend(arr)
        
    },[posts,job])

    useEffect(() => {
        // console.log(pend)
    },[pend])

    const styles= {
        main:`rounded h-max text-lg text-white border-2 text-center m-10 max-w-[45%]`,
        h1:`bg-todayGreen font-bold text-xl p-10`,
        container:`flex flex-wrap justify-around`,
    }
    return pend.length > 0 && (
        <div className={styles.main}>
            <h1 className={styles.h1}>{job.label}</h1>
            <div className={styles.container}>
            {
                pend.map(post => {
                    if (post.down) {
                        return (
                            <Post post={post} label={job.label}/>
                        )
                    }
                })
            }
            </div>
        </div>
    )
}

export default PostCategory;