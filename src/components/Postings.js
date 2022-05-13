import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Post from './Post';
import PostCategory from './PostCategory';

function Postings(props) {

    const [{view}, dispatch] = useAuthState()
    const posts = usePostsListener(view[0].dept)

    
    const styles = {
        main:`text-xl text-white flex flex-wrap`,
        container:`w-full border-4 flex flex-col m-10`,
        h1:`text-2xl`,
        postContainer:`flex flex-wrap w-.25`,
    }
    return (
        <div className={styles.main}>
                {
                    view && view[0].shifts.map(shift => (
                        <div key={shift.index} className={styles.container}>
                            <h1 className={styles.h1}>{shift.label} Shift Open Posts</h1>
                        <div className={styles.postContainer}>
                            {view && view.slice(1).map(job => (
                                <PostCategory job={job} shift={shift} key={job.id+shift.index}/>
                            ))}
                        </div>
                        </div>
                    ))
                }
        </div>
    );
}

export default Postings;