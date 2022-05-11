import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';

function TopRow({shift, cols, screen}) {

    const [show,SetShow] = useState(false)
    const [cells, setCells] = useState({})

    const [{view}, dispatch] = useAuthState()
    const posts = usePostsListener(view[0].dept)



    useEffect(() => {
        setCells({})
        for (const post in posts) {
            if (post.charAt(post.length - 1) === shift.index.toString()) {
                if (posts[post].date >= cols[0].label && posts[post].date <= cols[6].label && posts[post]?.tag){
                    console.log(posts[post])
                    let cellRef = `${posts[post].tag.name}${posts[post].tag.reason}`
                    setCells((prev) => ({...prev, [cellRef]:posts[post].tag}))
                }

            } 
            
        }
    },[posts,cols])

    const styles = {
        shift:`text-white text-2xl font-semibold px-.01`,
        postTag:`border-x text-center italic`,
    }

    return screen > 500 && (
        <tr className={`border-b-2`}>
              <td className={styles.shift}>
                <h3 >
                  {`${shift.label} Shift`}
                </h3>
              </td>
              {
                cells &&
                Object.keys(cells).map((cell) => (
                    <td 
                    key={cells[cell].name+cells[cell].reason}
                    className={styles.postTag}
                    style={{backgroundColor: cells[cell].color,}}
                    >
                        <h3
                        className='' 
                        // style={{backgroundColor: cells[cell].color}}
                        >
                        {`${cells[cell].name} - ${cells[cell].reason}`}
                        </h3>
                    </td>

                ))  
              }
            </tr>
    );
}

export default TopRow;