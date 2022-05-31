import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Post({post, shift, label}) {

    const [{profile}, dispatch] = useAuthState()

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

    const styles = {
        main:`${profile.level > 2 && "cursor-pointer"} overflow-hidden select-none border-2 border-clearBlack rounded-xl m-10 w-[300px]`,
        head:`border-b bg-green rounded-t-xl text-center`,
        h1:`font-bold text-xl`,
        p:`text-center`,
        listContainer:`flex justify-around`,
        bids:`mx-10 `,
        foot:`border-t`
    }

    return (
        <div className={styles.main} onClick={() => {profile.level > -1 && handleClick()}}>
            <div className={styles.head}>
                { post.tag &&
                    <p 
                    className={`${styles.p} font-semibold italic text-clearBlack`}
                    style={{backgroundColor: post.tag.color}}
                    >
                        {`${post.tag.name}-${post.tag.reason}`}
                    </p>
                }
                <h1 className={styles.h1}>{new Date(post.date).toDateString()}</h1>
                <p className={styles.p}>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()}`}</p>
            </div>
            <div className={styles.listContainer}>
            { post.seg.one && 
                post.seg.one.name !== (post.norm || "N/F") &&  
                <ol className={styles.bids}>
                    <p>{shift.segs.one}</p>
                    { post.seg.one.bids.length > 0?
                        post.seg.one.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                        :
                        <p>No Bids Yet</p>
                    }
                </ol>
            }
            { post.seg.two &&
                post.seg.two.name !== (post.norm || "N/F") &&
                    <ol className={styles.bids}>
                    <p>{shift.segs.two}</p>
                    {
                        post.seg.two.bids.length > 0?
                        post.seg.two.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                        :
                        <p>No Bids Yet</p>
                    }
                </ol>
            }
            {post.seg.three && 
                post.seg?.three?.name !== (post.norm || "N/F") &&
                shift.index === 3 &&
                <ol className={styles.bids}>
                    <p>{shift.segs.three}</p>
                    {
                        post.seg.three.bids.length > 0?
                        post.seg.three.bids.map(bid => (
                            <li key={bid.name}>{bid.name}</li>
                        ))
                        :
                        <p>No Bids Yet</p>
                    }
                </ol>
            }
            </div>
            <div className={styles.foot}>
                <p className={styles.p}>{post.lastMod? `Last Update by: ${post.lastMod}`:`Posted By: ${post.creator}`}</p>
                {
                    post.modDate &&
                    <p className={styles.p}>
                        {`On: ${new Date(post.modDate).toDateString().slice(4,10)} @ ${new Date(post.modDate).toLocaleTimeString()}`}
                    </p>
                }
            </div>
        </div>
    );
}

export default Post;