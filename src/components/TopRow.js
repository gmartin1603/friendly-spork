import React, { useEffect, useState } from 'react';

function TopRow({shift, cols, screen, dayCount, cells}) {

    const styles = {
        shift:`text-white text-2xl font-semibold px-.01`,
        postTag:`border-x text-center italic w-full`,
    }

    return (
        <tr className={`border-b-2`}>
              <td className={styles.shift}>
                <h3 >
                  {`${shift.label} Shift`}
                </h3>
              </td>
              {
                screen > 500 ?
                cols && cols.map((col) => (
                    <td className={``} key={col.label}>
                        {
                            Object.keys(cells).map(i => {
                                let tag = cells[i]
                                if (tag.date === col.label) {
                                    return (
                                    <div 
                                        key={tag.data.name+tag.data.reason}
                                        style={{backgroundColor: tag.data.color,}}
                                        className={`${styles.postTag} `}
                                    >
                                        <p
                                        >
                                        {`${tag.data.name} - ${tag.data.reason}`}
                                        </p>
                                    </div>
                                    )
                                }
                            })
                        }
                    </td>
                )) 
                :
                <td className={``}>
                    {
                        Object.keys(cells).map(i => {
                            let tag = cells[i]
                            if (tag.date === cols[dayCount].label) {
                                return (
                                <div 
                                    key={tag.data.name+tag.data.reason}
                                    style={{backgroundColor: tag.data.color,}}
                                    className={`${styles.postTag} `}
                                >
                                    <p
                                    >
                                    {`${tag.data.name} - ${tag.data.reason}`}
                                    </p>
                                </div>
                                )
                            }
                        })
                    }
                </td>
              }
              {/* {
                cells && screen > 500 &&
                Object.keys(cells).map((cell) => {
                    console.log(cols)
                    return (

                )})  
              } */}
            </tr>
    );
}

export default TopRow;