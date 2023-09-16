import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  orderBy,
  query,
  where,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { app } from "./firebaseApp";

export const db = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 7000);
}

export const getPosts = async (col, start, end) => {
  let arr = [];
  const q = query(
    collection(db, col),
    where("date", ">=", start),
    where("date", "<=", end),
    orderBy("date")
  );
  await getDocs(q).then((snapShot) => {
    snapShot.forEach((doc) => {
      arr.push(doc.data());
    });
  });
  return arr;
};

export const getUsers = async (col, dept) => {
  const q = query(collection(db, col), where("dept", "==", dept));
  let arr = [];

  await getDocs(q).then((snapShot) => {
    snapShot.forEach((user) => {
      arr.push(user.data());
    });
  });
  return arr;
};

export const getData = async (col) => {
  try {
    let load = await getDocs(query(collection(db, col), orderBy("order")));
    let arr = [];
    load.forEach((d) => {
      arr.push(d.data());
    });
    return { arr: arr };
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getArchive = async (col, id) => {
  // console.log(col, id)
  try {
    let load = doc(db, col, "rota", "archive", id);
    let docSnap = await getDoc(load);
    if (docSnap.exists()) {
      // console.log(docSnap.data())
      return docSnap.data();
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const writeData = async (coll, data) => {
  const docRef = doc(db, coll, data.id);
  await setDoc(docRef, data, { merge: true }).then(() => {
    console.log("Doc Written");
  });
};

export const getUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  // console.log("getUser")
  try {
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      // console.log(userDoc.data())
      return userDoc.data();
    }
  } catch (err) {
    console.log(err);
  }
};
