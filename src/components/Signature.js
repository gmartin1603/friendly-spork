import React, {useState} from 'react';
import {BsFillInfoCircleFill} from 'react-icons/bs'

function Signature({bid, num}) {
    const [show, setShow] = useState(false)
    const styles = {
        main:`${bid.notes && "cursor-pointer"} flex items-center justify-between max-w-max`,
        iconCont:`pl-10`,
        notesBackDrop:`absolute top-0 left-0 w-full h-full bg-clearBlack`,
        notesCont:`absolute top-.25 rounded border-2 p-.01 bg-gray-dark text-white w-max max-w-full z-20`,
    }
    return (
        <div className={styles.main}
        onClick={() => setShow(!show)}
        >
            <div className={styles.nameCont}>
                <p>{num && num+"."} {bid.name}</p>
            </div>
            { bid.notes &&
                <div className={styles.iconCont}
                >
                    <BsFillInfoCircleFill/>
                </div>
            }
            { show &&
                <div className={styles.notesBackDrop}>
                    <div className={styles.notesCont}>
                        <p className={``}><i><u> {bid.name} </u></i></p>
                        <p> {bid.notes.text} </p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Signature;