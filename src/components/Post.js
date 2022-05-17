import React from 'react';

function Post({post, shift}) {

    let bids = ["Bid 1","Bid 2","Bid 3","Bid 4","Bid 5","Bid 6",]

    const styles = {
        main:` border-2 border-clearBlack rounded-xl m-10 w-[300px]`,
        head:`bg-green rounded-t-xl text-center`,
        h1:`font-bold text-xl p-10 pb-0`,
        p:`border-b border-white text-center`,
        listContainer:`flex justify-between`,
        bids:`mx-10 `,
    }
    return (
        <div className={styles.main} onClick={() => console.log(shift)}>
            <div className={styles.head}>
                <h1 className={styles.h1}>{new Date(post.date).toDateString()}</h1>
                <p className={styles.p}>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()}`}</p>
            </div>
            <div className={styles.listContainer}>
                <ol className={styles.bids}>
                    <p>{shift.segs.one}</p>
                    {
                        bids.length > 0 &&
                        bids.map(bid => (
                            <li>{bid}</li>
                        ))
                    }
                </ol>
                <ol className={styles.bids}>
                    <p>{shift.segs.two}</p>
                    {
                        bids.length > 0 &&
                        bids.map(bid => (
                            <li>{bid}</li>
                        ))
                    }
                </ol>
                {
                    shift.index === 3 &&
                <ol className={styles.bids}>
                    <p>{shift.segs.three}</p>
                    {
                        bids.length > 0 &&
                        bids.map(bid => (
                            <li>{bid}</li>
                        ))
                    }
                </ol>
                }
            </div>
        </div>
    );
}

export default Post;