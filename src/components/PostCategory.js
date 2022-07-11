import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Post from './Post';

function PostCategory({job, shift, down}) {
    
    const [pend,setPend] = useState([])
    const [conflicting, setConf] = useState([])
    
    // const today = useRef(new Date().getTime())
    
    const [{profile, posts, cols, count, today}, dispatch] = useAuthState()

    useEffect(() => {
        console.log(count)
        let keys = []
        let arr = []
        if (posts) {
            keys = Object.keys(posts)
        }
        keys.forEach(key => {
            if (posts[key].date >= cols[0].label && posts[key].date <= cols[6].label) {
                if (posts[key].pos === job.id) {
                    if (down) {
                        if (posts[key].down < (today * count)) {
                            // console.log(new Date(posts[key].down))
                            if (posts[key].shift === shift.index) {
                                arr.push(posts[key])
                                
                            }
                        }
                    } else {
                        if (posts[key].down > today * count) {
                            // console.log(new Date(posts[key].down))
                            if (posts[key].shift === shift.index) {
                                arr.push(posts[key])
                                
                            }
                        }
                    }
                }
            }
        })
        setPend(arr)
    },[posts, count])

    useEffect(() => {
        // console.log(pend)
    },[pend])

    const styles= {
        main:`cursor-default rounded h-min text-lg text-white border-4 border-todayGreen text-center m-[5px] `,
        h1:`bg-todayGreen font-[600] text-xl p-10`,
        container:`flex flex-wrap justify-around`,
    }
    return pend.length > 0 && (
        <div className={styles.main}>
            <h1 className={styles.h1}>{job.label}</h1>
            { profile.quals.includes(job.id) &&
                !down &&
                <p>Click on a post date to sign</p>
            }
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