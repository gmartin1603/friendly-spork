import React, {useEffect, useState} from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import PostCategory from './PostCategory';

function Postings(props) {

    const [{view, profile, posts, cols}, dispatch] = useAuthState()

    const [bids, setBids] = useState([])
    const [conflicts, setConflicts] = useState([])
    const [conflict, setConflict] = useState({})

    usePostsListener(`${view[0].dept}-posts`)    
    
    useEffect(() => {
        // console.log(posts)
        let arr = []
        for (const id in posts) {
            if (posts[id].down > new Date().getTime()) {
                if (profile.quals.includes(posts[id].pos)) {
                    let seg = posts[id].seg
                    for (const key in seg) {
                        if (seg[key].bids) {
                            seg[key].bids.map(bid => {
                                if (bid.name === profile.dName) {
                                    const post = posts[id]
                                    // arr.push(post.id)
                                    // arr.push({pos: post.pos, date: post.date, shift: post.shift, seg: key})
                                    arr.push(`${posts[id].shift} ${posts[id].date} ${key}`)
                                }
                            })
                        }
                    }
                }
            }
        }
        // console.log(arr)
        setBids(arr)
    },[posts])

    useEffect(() => {
    const toFindDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index)
    const duplicateElements = toFindDuplicates(bids);
    // console.log(duplicateElements);
    setConflicts(duplicateElements)
    },[bids])

    useEffect(() => {
        let flag = {}
        conflicts.map(str => {
            flag[str.charAt(0)] = true            
        })
        setConflict(flag)
    },[conflicts])
    
    const styles = {
        main:`overflow-auto text-xl text-white flex flex-col cursor-default`,
        container:` rounded mt-10 border-2 flex flex-col`,
        h1:`text-3xl mx-[20px]`,
        postContainer:`flex flex-wrap justify-around`,
    }
    return (
        <div className={styles.main}>
                {
                    view && view[0].shifts.map(shift => (
                        <div 
                        className={styles.container}
                        key={shift.index} 
                        >
                            <div className={`bg-green p-.01 flex flex-wrap items-center justify-center`}>
                                <h1 
                                className={styles.h1}
                                >
                                    {`${shift.label} Shift Open Posts`}
                                </h1>
                                <h1 className={`${styles.h1} font-bold`}>
                                    {`${new Date(cols[0].label).toDateString().slice(3,11)} - ${new Date(cols[6].label).toDateString().slice(3,11)}`}
                                </h1>
                            </div>
                            {conflict[shift.index] && 
                                <p className={`bg-clearRed text-center font-semibold p-[5px]`}
                                >
                                    {`*Conflicting signatures, contact Stacie with preference*`}
                                </p>
                            }
                        <div className={styles.postContainer}>
                            {view && view.slice(1).map(job => {
                                return (
                                <PostCategory posts={posts} job={job} shift={shift} key={job.id+shift.index}/>
                                )
                            })}
                        </div>
                        </div>
                    ))
                }
        </div>
    );
}

export default Postings;