import React, {useEffect, useState} from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import PostCategory from './PostCategory';

function ArchPostings(props) {
    const [{view, shifts, posts, cols}, dispatch] = useAuthState()

    const [banner, setBanner] = useState('')
    const [pend, setPend] = useState([])
    const [activeShifts, setActiveShifts] = useState([])

    useEffect(() => {
        setBanner(`${new Date(cols[0].label).toDateString().slice(3,11)} - ${new Date(cols[6].label).toDateString().slice(3,11)}`)
    },[cols])


    useEffect(() => {
        let keys = []
        let arr = []
        let shifts = []
        const now = new Date().getTime()

        if (posts) {
            keys = Object.keys(posts)
        }
        keys.forEach(key => {
            if (posts[key].date >= cols[0].label && posts[key].date <= cols[6].label) {
                if (posts[key].down < now) {
                    if (!shifts.includes(posts[key].shift.id)) {
                        shifts.push(posts[key].shift.id)
                    }
                    arr.push(posts[key])
                }
            }
        })
        setActiveShifts(shifts)
        setPend(arr)
    },[posts, cols])

    const styles = {
        main:`min-h-[85vh] text-xl text-white flex flex-col cursor-default`,
        wrapper:`h-full overflow-auto`,
        container:` rounded mt-10 border-2 flex flex-col`,
        h1:`text-3xl mx-[20px]`,
        postContainer:`flex flex-wrap justify-around p-10`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
            { activeShifts.length === 0?
                <div className="h-full flex items-center justify-center">
                    <p
                    className='p-.05 text-2xl border-2 border-dashed text-center'
                    >
                        No Closed Postings Found
                        <br />
                        {banner}
                    </p>
                </div>
                :
                shifts && shifts.map(shift => (
                    <div
                    className={styles.container}
                    key={shift.id}
                    >
                        <div className={`bg-green p-.01 flex flex-wrap items-center justify-center`}>
                            <h1
                            className={styles.h1}
                            >
                                {`${shift.label} Closed Posts`}
                            </h1>
                            <h1 className={`${styles.h1} font-bold`}>
                                {banner}
                            </h1>
                        </div>
                        <div className={styles.postContainer}>
                            { view && view.slice(1).map(job => {
                                return (
                                <PostCategory posts={pend} down job={job} shift={shift} key={job.id+shift.id}/>
                                )
                            })}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default ArchPostings;