import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Post({post, shift, label}) {

    const [{profile}, dispatch] = useAuthState()
    const [bids, setBids] = useState({})

    const sortBids = (arr) => {
        if (arr) {
            arr.sort((a, b) => {
                if (a.startDate < b.startDate) {
                    return -1
                }
                if (a.startDate > b.startDate) {
                    return 1
                }
    
                // if (a === b)
                return 0
            })
        }
    }

    const handleClick = () => {
        let obj = {
            title:`${label} ${shift.label} Shift`,
            post: post,
            shift: shift,
        }
        console.log(obj)
        dispatch(
            {
                type: "SET-OBJ",
                name: "formObj",
                load: obj
            }
        )
        return dispatch({type: "OPEN-FORM", name: "showBid"})
    }

    useEffect(() => {
        let obj = {}
        for (const key in post.seg) {
            if (post.seg[key].bids) {
                obj[key] = sortBids(post.seg[key].bids)
            }
        }
        setBids(obj)
    },[post])


    const styles = {
        main:`${profile.level > 2 && "cursor-pointer"} select-none border-2 border-clearBlack rounded-xl m-10 w-[300px]`,
        head:`bg-green rounded-t-xl text-center`,
        h1:`font-bold text-xl p-10 pb-0`,
        p:`border-b border-white text-center`,
        listContainer:`flex justify-around`,
        bids:`mx-10 `,
    }
    return post && (
        <div className={styles.main} onClick={() => {profile.level > -1 && handleClick()}}>
            <div className={styles.head}>
                <h1 className={styles.h1}>{new Date(post.date).toDateString()}</h1>
                <p className={styles.p}>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()}`}</p>
            </div>
            <div className={styles.listContainer}>
            { post.seg.one && 
                post.seg.one.name !== (post.norm || "N/F") &&  
                <ol className={styles.bids}>
                    <p>{shift.segs.one}</p>
                    {
                        post.seg.one.bids &&
                        post.seg.one.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                    }
                </ol>
            }
            { post.seg.two &&
                post.seg.two.name !== (post.norm || "N/F") &&
                    <ol className={styles.bids}>
                    <p>{shift.segs.two}</p>
                    {
                        post.seg.two.bids &&
                        post.seg.two.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                    }
                </ol>
            }
            {post.seg.three && 
                post.seg?.three?.name !== (post.norm || "N/F") &&
                shift.index === 3 &&
                <ol className={styles.bids}>
                    <p>{shift.segs.three}</p>
                    {
                        post.seg.three.bids &&
                        post.seg.three.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                    }
                </ol>
            }
            </div>
        </div>
    );
}

export default Post;