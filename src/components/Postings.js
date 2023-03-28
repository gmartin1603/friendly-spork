import React, {useEffect, useState} from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import PostCategory from './PostCategory';

function Postings(props) {

    const [{view, profile, posts, cols, shifts}, dispatch] = useAuthState()

    const [bids, setBids] = useState([])
    const [conflicts, setConflicts] = useState([])
    const [conflict, setConflict] = useState({})
    const [banner, setBanner] = useState('')
    const [pend, setPend] = useState([])
    const [activeShifts, setActiveShifts] = useState([])

    useEffect(() => {
        // console.log(posts)
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
                if (posts[key].down > now) {
                    if (!shifts.includes(posts[key].shift)) {
                        shifts.push(posts[key].shift)
                    }
                    arr.push(posts[key])
                }
            }
        })
        // console.log(pend)
        setActiveShifts(shifts)
        setPend(arr)
    },[posts, cols])

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
                                No Active Postings Found
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
                                        {`${shift.label} Open Posts`}
                                    </h1>
                                    <h1 className={`${styles.h1} font-bold`}>
                                        {banner}
                                    </h1>
                                </div>
                                {conflict[shift.id] &&
                                    <p className={`bg-clearRed text-center font-semibold p-[5px]`}
                                    >
                                        {`*Conflicting signatures, contact Stacie with preference*`}
                                    </p>
                                }
                            <div className={styles.postContainer}>
                                { activeShifts.includes(shift.id)?
                                    view && view.slice(1).map(job => {
                                        return (
                                        <PostCategory posts={pend} job={job} shift={shift} key={job.id+shift.id}/>
                                        )
                                    })
                                    :
                                    <p
                                    className='p-.02 border-2 border-dashed'
                                    >
                                        No Active {shift.label} Postings Found
                                    </p>
                                }
                            </div>
                            </div>
                        ))
                    }
                {/* <WeekBar/> */}
            </div>
        </div>
    );
}

export default Postings;