import React from 'react';

function Post({post}) {
    console.log(post)

    let bids = ["Bid 1","Bid 2","Bid 3","Bid 4","Bid 5","Bid 6",]

    const styles = {
        main:`bg-green border w-max text-left p-.02`,
        bids:`mx-10`,
    }
    return (
        <div className={styles.main}>
            <h1>Date: {new Date(post.date).toDateString()}</h1>
            <p>Down: {`${new Date(post.down).getMonth()+1}/${new Date(post.down).getDate()}`}</p>
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