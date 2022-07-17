import React, {useEffect, useState} from 'react';;
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import PostCategory from './PostCategory';
import WeekBar from './WeekBar';

function ArchPostings(props) {
    const [{view, posts, cols, count, today}, dispatch] = useAuthState()
    
    usePostsListener(`${view[0].dept}-posts`)

    useEffect(() => {
        setBanner(`${new Date(cols[0].label).toDateString().slice(3,11)} - ${new Date(cols[6].label).toDateString().slice(3,11)}`)
    },[cols])
    
    const [banner, setBanner] = useState('')
    const [pend, setPend] = useState([])

    useEffect(() => {
        console.log(count)
        let keys = []
        let arr = []
        if (posts) {
            keys = Object.keys(posts)
        }
        keys.forEach(key => {
            if (posts[key].date >= cols[0].label && posts[key].date <= cols[6].label) {
                // if (posts[key].pos === job.id) {
                //     if (down) {
                        if (posts[key].down < today) {
                            // console.log(new Date(posts[key].down))
                            // if (posts[key].shift === shift.index) {
                                arr.push(posts[key])
                                
                            // }
                        }
                    // } else {
                        // if (posts[key].down > today * count) {
                        //     // console.log(new Date(posts[key].down))
                        //     if (posts[key].shift === shift.index) {
                        //         arr.push(posts[key])
                                
                        //     }
                        // }
                    // }
                // }
            }
        })
        setPend(arr)
    },[posts, cols])
    
    const styles = {
        main:`overflow-auto text-xl text-white flex flex-col cursor-default`,
        container:` rounded mt-10 border-2 flex flex-col`,
        h1:`text-3xl bg-green p-.01`,
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
                            {`${shift.label} Shift Closed Posts`}
                        </h1>
                        <h1 className={`${styles.h1} font-bold`}>
                            {banner}
                        </h1>
                    </div>
                    <div className={styles.postContainer}>
                        {view && view.slice(1).map(job => {
                            return (
                            <PostCategory posts={pend} down job={job} shift={shift} key={job.id+shift.index}/>
                            )
                        })}
                    </div>
                </div>
            ))
        }
            <WeekBar/>
        </div>
    );
}

export default ArchPostings;