import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Signature from './Signature';

function Post({post, shift, label}) {

    const [{profile}, dispatch] = useAuthState()
    const [bids, setBids] = useState({})
    const [disabled, setDisabled] = useState(true)

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

    useEffect(() => {
        let obj = {}
        for (const key in post.seg) {
            if (post.seg[key].bids) {
                obj[key] = sortBids(post.seg[key].bids)
            }
        }
        setBids(obj)

        if (profile.quals.includes(post.pos) && post.down > new Date().getTime()) {
            setDisabled(false)
        }
    },[post])

    const handleClick = () => {
        if (!disabled) {
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
    }

    const styles = {
        main:`relative select-none border-2 border-clearBlack rounded-xl m-10 w-[300px] min-w-max h-max`,
        head:`${!disabled && "cursor-pointer"} border-b-4 border-clearBlack bg-green rounded-t-xl text-center`,
        h1:`font-bold text-xl`,
        p:`text-center`,
        listContainer:`flex justify-around`,
        bids:`mx-10 mb-10`,
        foot:`border-t-2`,
        userBid:`bg-todayGreen font-semibold rounded w-max px-10`,
    }

    return (
        <div className={styles.main} >
            <div className={styles.head} onClick={() => {handleClick()}}>
                { post.tag &&
                    <p 
                    className={`${styles.p} rounded-t-xl font-semibold italic text-clearBlack`}
                    style={{backgroundColor: post.tag.color}}
                    >
                        {`${post.tag.name}-${post.tag.reason}`}
                    </p>
                }
                <h1 className={styles.h1}>{new Date(post.date).toDateString()}</h1>
                <p className={styles.p}>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()} @ ${new Date(post.down).toLocaleTimeString()}`}</p>
                {/* <p className="font-semibold">{!disabled && "Click here to sign"}</p> */}
            </div>
            <div className={styles.listContainer}>
            { post.seg.one && 
                post.seg.one.name !== (post.norm || "N/F") &&  
                <ol className={styles.bids}>
                    <p>{shift.segs.one}</p>
                    {post.filled &&
                        <p className={styles.userBid}>{post.seg.one.name}</p>
                    }
                    { post.seg.one.bids?.length > 0?
                        post.seg.one.bids.map(bid => (
                            <li 
                            key={bid.name}
                            className={!post.filled && bid.name === profile.dName? styles.userBid:''}
                            >{<Signature bid={bid}/>}</li>
                        ))
                        :
                        <p className={`my-10 p-.01 border border-dotted`}>No Signatures</p>
                    }
                </ol>
            }
            { post.seg.two &&
                post.seg.two.name !== (post.norm || "N/F") &&
                    <ol className={styles.bids}>
                    <p>{shift.segs.two}</p>
                    {post.filled &&
                        <p className={styles.userBid}>{post.seg.two.name}</p>
                    }
                    {
                        post.seg.two.bids?.length > 0?
                        post.seg.two.bids.map(bid => (
                            <li 
                            className={!post.filled && bid.name === profile.dName? styles.userBid:''}
                            key={bid.name}
                            >
                                {<Signature bid={bid}/>}
                            </li>
                        ))
                        :
                        <p className={`my-10 p-.01 border border-dotted`}>No Signatures</p>
                    }
                </ol>
            }
            {post.seg.three && 
                post.seg?.three?.name !== (post.norm || "N/F") &&
                <ol className={styles.bids}>
                    <p>{shift.segs.three}</p>
                    {post.filled &&
                        <p className={styles.userBid}>{post.seg.three.name}</p>
                    }
                    {post.seg.three.bids &&
                        post.seg.three.bids.length > 0?
                        post.seg.three.bids.map(bid => (
                            <li 
                            className={!post.filled && bid.name === profile.dName? styles.userBid:''}
                            key={bid.name}
                            >
                                {<Signature bid={bid}/>}
                            </li>
                        ))
                        :
                        <p className={`my-10 p-.01 border border-dotted`}>No Signatures</p>
                    }
                </ol>
            }
            </div>
            <div className={styles.foot}>
                <p className={styles.p}>{post.lastMod? `Last Update by: ${post.lastMod}`:`Posted By: ${post.creator}`}</p>
                
                    <p className={styles.p}>
                        { post.lastMod? 
                        `On: ${new Date(post.modDate).toDateString().slice(4,10)} @ ${new Date(post.modDate).toLocaleTimeString()}`
                        :
                        `On: ${new Date(post.created).toDateString().slice(4,10)} @ ${new Date(post.created).toLocaleTimeString()}`
                        }
                    </p>
                
            </div>
        </div>
    );
}

export default Post;