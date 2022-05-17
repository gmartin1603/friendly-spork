import React from 'react';

function TransferList({inactive, active}) {

    const styles = {
        main:`flex bg-clearBlack`,
        inactive:`font-semibold`,
        active:`font-semibold`,
    }
    return (
        <div className={styles.main}>
            <div className={styles.inactive}>
                {
                    inactive.map(obj => (
                        <p>{obj.id}</p>
                    ))
                }
            </div>
            <div className={styles.active}>
                {
                    active.map(obj => (
                        <p>{obj.id}</p>
                    ))
                }
            </div>
        </div>
    );
}

export default TransferList;