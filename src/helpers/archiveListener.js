import { useEffect, useState } from "react"
import { db } from "../firebase/firestore"
import { doc, onSnapshot, query } from "firebase/firestore"

const useArchiveListener = (coll, date) => {
    const [archive, setArchive] = useState(null)

    useEffect(() => {
        const q = query(doc(db, coll, 'rota', 'archive', date))
        const unsubscribe = onSnapshot(q, (qSnap) => {
            // console.log(qSnap.data())
            if (qSnap.exists) {
                setArchive(qSnap.data())
            } else {
                setArchive(false)
            }
        })
        return () => unsubscribe()
    },[coll, date])

    // console.log(archive)
    return archive
}

export default useArchiveListener