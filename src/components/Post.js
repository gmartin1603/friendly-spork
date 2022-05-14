import React from 'react';

function Post({post}) {
    console.log(post)

    let bids = ["Bid 1","Bid 2","Bid 3","Bid 4","Bid 5","Bid 6",]

    const styles = {
        main:` border-2 border-clearBlack rounded-xl text-left m-10 w-max`,
        head:`bg-green rounded-t-xl`,
        h1:`font-bold text-xl p-10 pb-0`,
        p:`border-b border-white text-center`,
        bids:`mx-10`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <h1 className={styles.h1}>{new Date(post.date).toDateString()}</h1>
                <p className={styles.p}>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()}`}</p>
            </div>
            <ol className={styles.bids}>
                {
                    bids.length > 0 &&
                    bids.map(bid => (
                        <li>{bid}</li>
                    ))
                }
            </ol>
        </div>
    );
}

export default Post;