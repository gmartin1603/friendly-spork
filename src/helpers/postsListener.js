import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const usePostsListener = (dept) => {
  const [{ cols, count, today, profile }, dispatch] = useAuthState();

  const [triggerCount, setTriggerCount] = useState([]);

  const day = 24 * 60 * 60 * 1000;

  useEffect(() => {
    setTriggerCount([]);
  }, [today, dept]);

  useEffect(() => {
    if (count % 2 !== 0) {
      setTriggerCount((prev) => [...prev, count]);
    }
  }, [count]);

  useEffect(() => {
    const start = new Date(cols[0].label).getTime() - day * 14;
    const end = new Date(cols[6].label).getTime() + day * 14;
    const q = query(
      collection(db, dept),
      where("date", ">=", start),
      where("date", "<=", end),
      orderBy("date")
    );

    const unsubscribe = onSnapshot(q, (qSnap) => {
      //   console.log("Post Listener: RUNNING");
      let obj = {};
      qSnap.forEach((post) => {
        obj[post.data().id] = post.data();
      });
      dispatch({
        type: "SET-OBJ",
        name: "posts",
        load: obj,
      });
      // console.log(`${Object.keys(obj).length} posts returned from listener.`)
    });
    if (profile) {
      return () => unsubscribe();
    } else {
      return () => {};
    }
  }, [triggerCount]);
};

export default usePostsListener;
