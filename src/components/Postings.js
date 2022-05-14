import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Post from './Post';
import PostCategory from './PostCategory';

function Postings(props) {

    const [{view}, dispatch] = useAuthState()
    const posts = usePostsListener(view[0].dept)

    
    const styles = {
        main:`text-xl text-white flex flex-col`,
        container:` rounded border-2 flex flex-col m-10`,
        h1:`text-3xl bg-green p-.01`,
        postContainer:`flex flex-wrap justify-around`,
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