import React, {useEffect} from 'react';;
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import PostCategory from './PostCategory';

function ArchPostings(props) {
    const [{view, profile, posts}, dispatch] = useAuthState()
    const postsCall = usePostsListener(`${view[0].dept}-posts`)

    useEffect(() => {
        if (postsCall) {
            dispatch({
                type: "SET-OBJ",
                name: "posts",
                load: postsCall
            })
        }
    },[postsCall, view])

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
                    <h1 
                    className={styles.h1}
                    >
                        {`${shift.label} Shift Closed Posts`}
                    </h1>
                <div className={styles.postContainer}>
                    {view && view.slice(1).map(job => {
                        return (
                        <PostCategory posts={posts} down job={job} shift={shift} key={job.id+shift.index}/>
                        )
                    })}
                </div>
                </div>
            ))
        }
</div>
    );
}

export default ArchPostings;