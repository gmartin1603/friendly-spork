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
import { toast } from "react-toastify";

export const db = getFirestore(app);

if (process.env.REACT_APP_USE_EMULATOR === "true") {
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
      toast.success(`${id} loaded`);
      return docSnap.data();
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const writeArchive = async (dept, date, data) => {
  if (!data) {
    toast.error("No data to write");
    return;
  } else if (!date) {
    toast.error("No date to write");
    return;
  } else if (!dept) {
    toast.error("No dept to write");
    return;
  }

  const docRef = doc(db, dept, "rota", "archive", date);
  console.log(docRef);
  // await getDoc(docRef).then((docSnap) => {
  //   if (docSnap.exists()) {
  //     console.log(docSnap.data());
  //     toast.error(`${dept}/rota/${date} already exists`);
  //     return;
  //   }
  // });
  await setDoc(docRef, data, { merge: true }).then(() => {
    // console.log("Doc Written");
    toast.success(`${dept}/rota/${date} update written`);
  })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
    });
};

export const writeData = async (coll, data) => {
  const docRef = doc(db, coll, data.id);
  await setDoc(docRef, data, { merge: true }).then(() => {
    // console.log("Doc Written");
    toast.success(`${data.id} update written`);
  })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
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
