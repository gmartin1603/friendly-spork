import { useEffect, useState } from "react"
import { db } from "../firebase/firestore"
import { doc, onSnapshot, query } from "firebase/firestore"
import { useAuthState } from "../context/auth/AuthProvider";

const useArchiveListener = (coll, date) => {
  const [archive, setArchive] = useState(null);

  const [{ profile }, dispatch] = useAuthState();

  useEffect(() => {
    const q = query(doc(db, coll, "rota", "archive", date));
    const unsubscribe = onSnapshot(q, (qSnap) => {
      let archive = false;
      if (qSnap.exists) {
        archive = qSnap.data();
        console.log(archive);
        setArchive(archive);
      } else {
        setArchive(false);
      }
      dispatch({ type: "SET-OBJ", name: "archive", load: archive });
    });
    if (profile) {
      return () => unsubscribe();
    } else {
      return () => {};
    }
  }, [coll, date]);

  return archive;
};

export default useArchiveListener