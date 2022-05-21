import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Post from './Post';

function PostCategory({job,shift}) {
    
    const [pend,setPend] = useState([])
    
    const today = useRef(new Date().getTime())
    
    const [{view, profile}, dispatch] = useAuthState()
    const posts = usePostsListener(`${view[0].dept}-posts`)
    // const posts = usePostsListener(view[0].dept, profile.id)

    // console.log(posts)
    // console.log(job)

    useEffect(() => {
        
        let keys = Object.keys(posts)
        let arr = []
        keys.forEach(key => {
            if (profile.level > 2) {
                if (profile.quals.includes(job.id) && posts[key].pos === job.id) {
                    if (posts[key].down > today.current) {
                        // console.log(new Date(posts[key].down))
                        if (posts[key].shift === shift.index) {
    
                            arr.push(posts[key])
                        }
                    }
                }
            } else {
                if (posts[key].pos === job.id) {
                    if (posts[key].down > today.current) {
                        // console.log(new Date(posts[key].down))
                        if (posts[key].shift === shift.index) {
    
                            arr.push(posts[key])
                        }
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
        main:`rounded h-min text-lg text-white border-2 text-center m-10 max-w-[800px]`,
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
                            <Post post={post} shift={shift} label={job.label} key={post.id}/>
                        )
                    }
                })
            }
            </div>
        </div>
    )
}

export default PostCategory;