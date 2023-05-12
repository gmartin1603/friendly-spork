const functions = require("firebase-functions");
const { getAuth } = require("firebase-admin/auth");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const URLs = { local: true, prod: "https://overtime-management-83008.web.app" };

//Admin SDK init
const serviceAccount = require("./private/overtime-management-83008-firebase-adminsdk-q8kc2-1956d61a57.json");
initializeApp({
  credentials: serviceAccount,
});

//******* userApp start ************** */
const app = express();
app.use("*", cors({ origin: URLs.prod }));

app.get("/resetPass", cors({ origin: URLs.prod }), (req, res) => {
  const email = req.body;
  getAuth()
    .generatePasswordResetLink(email)
    .then((link) => {
      return res
        .json(
          JSON.stringify({ message: "Check registered e-mail for reset link" })
        )
        .send();
    });
});

app.post("/newUser", cors({ origin: URLs.prod }), (req, res) => {
  let obj = JSON.parse(req.body);
  console.log(obj);

  getAuth()
    .createUser(obj.auth)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      obj.profile.id = userRecord.uid;
      admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set(obj.profile)
        .then(() => {
          return res
            .json(
              JSON.stringify({ message: "User profile written successfully" })
            )
            .send();
        });
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      return res
        .json(
          JSON.stringify({
            error: error,
            message: "Error creating new user profile",
          })
        )
        .send();
    });
});

app.post("/updateUser", cors({ origin: URLs.prod }), async (req, res) => {
  let obj = JSON.parse(req.body);
  console.log(obj);

  await admin
    .firestore()
    .collection("users")
    .doc(obj.id)
    .set(obj.profile, { merge: true })
    .then(async () => {
      console.log(obj.id + " Updates Successful");
      if (obj.auth) {
        await getAuth()
          .updateUser(obj.id, obj.auth)
          .then((userRecord) => {
            console.log(userRecord.uid + " Updates Successful");
            return res
              .json(
                JSON.stringify({
                  message: "User credentials updated successfully",
                })
              )
              .send();
          })
          .catch((error) => {
            return res
              .json(
                JSON.stringify({
                  error: error,
                  message: "Error updating user credentials",
                })
              )
              .send();
          });
      } else {
        return res
          .json(
            JSON.stringify({ message: "User profile updated successfully" })
          )
          .send();
      }
    })
    .catch((error) => {
      return res
        .json(
          JSON.stringify({
            error: error,
            message: "Error updating user profile",
          })
        )
        .send();
    });
});

//get user profile by firebase uid
app.post("/getUser", cors({ origin: URLs.prod }), async (req, res) => {
  let uid = req.body;
  console.log(uid);

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      let profile = doc.data();
      res.send(profile);
    });
});

app.post("/deleteUser", cors({ origin: URLs.prod }), async (req, res) => {
  //delete firestore profile doc
  const deleteProfile = () => {
    admin
      .firestore()
      .collection("users")
      .doc(req.body)
      .delete()
      .then(() => {
        // console.log(`${req.body} Deleted!`)
        res.send("Operation Complete");
      })
      .catch((error) => {
        res.status(error?.status).send(error);
      });
  };
  //delete auth account
  await getAuth()
    .deleteUser(req.body)
    .then(() => {
      console.log("Successfully deleted user auth account");
      deleteProfile();
    })
    .catch((error) => {
      // console.log('Error deleting user:', error);
      res.send(error.message);
    });
});

// Set Express app to deploy in Firebse Function "app"
exports.app = functions.https.onRequest(app);
//************ userApp end **************** */

//************ fsApp start **************** */
const fsApp = express();
const db = admin.firestore();
fsApp.use("*", cors({ origin: URLs.prod }));

// ******************** Dev Tools ************************** //

// fsApp.post('/copyToLocal', cors({origin: URLs.local}), async (req,res) => {
//   const body = JSON.parse(req.body)
//   const LIMIT = 200
//   await admin.firestore()
//   .collection(body.coll)
//   // .where("date", ">=", body.start)
//   // .where("date", "<=", body.end)
//   .limit(LIMIT)
//   .get()
//   .then((docSnap) => {
//     if (docSnap.empty) {
//       console.log("No matching documents.")
//       return res.json({message: "No matching documents."}).send()
//     } else if (docSnap.size === LIMIT) {
//       console.log("Query limit reached.")
//       return res.json({message: "Query limit reached."}).send()
//     } else {
//       docSnap.forEach((doc) => {
//         let data = doc.data()
//         fs.writeFile(`C:\/Users\/georg\/Documents\/data\/${body.coll}/${doc.id}.json`, JSON.stringify(data), (err) => {
//           if (err) {
//             console.log(err)
//           }
//         })
//       })
//     }
//   })
//   .catch((error) => {
//     console.log(error)
//     res.send(error)
//   })
//   return res.json(JSON.stringify({message:"Success"})).send()
// })

// fsApp.post('/writeToFirestore', cors({origin: URLs.local}), async (req,res) => {
//   const body = JSON.parse(req.body)
//   fs.readdir(`C:\/Users\/georg\/Documents\/data\/${body.coll}`, (err, docs) => {
//     if (err) {
//       console.log(err)
//       return res.json(JSON.stringify({message:"Error reading local folder"})).send()
//     } else {
//       docs.forEach((doc) => {
//         fs.readFile(`C:\/Users\/georg\/Documents\/data\/${body.coll}/${doc}`, async (err, data) => {
//           if (err) {
//             console.log(err)
//             return res.json(JSON.stringify({message:"Error reading local documents"})).send()
//           } else {
//             let obj = JSON.parse(data)
//             await admin.firestore()
//             .collection(body.coll)
//             .doc(obj.id)
//             .set(obj, {merge:true})
//             .catch((error) => {
//               console.log(error)
//             })
//           }
//         })
//       })
//       console.log("Success", docs.length, "documents written to Firestore")
//       return res.json(JSON.stringify({message:"Success"})).send()
//     }
//   })
// })

// fsApp.post('/updatePosts', cors({origin: URLs.local}), async (req,res) => {
//   const body = JSON.parse(req.body)
//   const LIMIT = 400
//   let updated = []
//   await admin.firestore()
//   .collection(body.coll)
//   .where("date", ">=", body.start)
//   .where("date", "<=", body.end)
//   .limit(LIMIT)
//   .get()
//   .then((docSnap) => {
//     if (docSnap.empty) {
//       return res.json(JSON.stringify({message:"No Documents Found"})).send()
//     } else if (docSnap.size === LIMIT){
//       return res.json(JSON.stringify({mesage:"Operation aborted. Too many documents to update. Please narrow the date range."})).send()
//     } else {
//       console.log("Checking " + docSnap.size + " documents...")
//       docSnap.forEach(async (doc) => {
//         let obj = new Object(doc.data())
//         switch (obj.shift) {
//           case 0:
//             if (obj.norm === "Siri") {
//               obj.shift = "11-7"
//               obj.id = `${obj.pos} ${obj.date} 11-7`
//               updated.push(obj)
//             } else {
//               obj.shift = "first"
//               obj.id = `${obj.pos} ${obj.date} first`
//               updated.push(obj)
//             }
//             break
//           case 1:
//             obj.shift = "second"
//             obj.id = `${obj.pos} ${obj.date} second`
//             updated.push(obj)
//             break
//           case 2:
//             obj.shift = "third"
//             obj.id = `${obj.pos} ${obj.date} third`
//             updated.push(obj)
//             break
//           case 3:
//             obj.shift = "night"
//             obj.id = `${obj.pos} ${obj.date} night`
//             updated.push(obj)
//             break
//           default:
//             const lastChar = parseInt(doc.id.charAt(doc.id.length-1))
//             if (Number.isInteger(lastChar) && lastChar < 6) {
//               // console.log(doc.id)
//               obj.id = `${obj.pos} ${obj.date} ${obj.shift}`
//               updated.push(obj)
//             }
//         }
//       })
//     }
//   })
//   .catch((error) => {
//     console.log(error)
//     return res.status(error?.status).send(JSON.stringify(error))
//   })

//   if (updated.length > 0) {
//     console.log("Updating " + updated.length + " documents...")
//     for (const i in updated) {
//       const post = updated[i]
//       await admin.firestore()
//       .collection(body.coll)
//       .doc(post.id)
//       .set(post, {merge: true})
//       .catch((error) => {
//         console.log(`error: ${error.status} at ${post.id}`)
//       })
//     }

//     // console.log("Success!")
//     return res.json(JSON.stringify({message:`Updated ${updated.length} postings`})).send()

//   } else {
//     return res.json(JSON.stringify({message:"No documents updated"})).send()
//   }
// })

// fsApp.post('/deleteOldPosts', cors({origin: URLs.local}), async (req,res) => {
//   const body = JSON.parse(req.body)
//   const LIMIT = 400
//   let deleted = []
//   await admin.firestore()
//   .collection(body.coll)
//   .where("date", ">=", body.start)
//   .where("date", "<=", body.end)
//   .limit(LIMIT)
//   .get()
//   .then((docSnap) => {
//     if (docSnap.empty) {
//       console.log("No Documents Found")
//       return res.json(JSON.stringify({message:"No Documents Found"})).send()
//     } else if (docSnap.size === LIMIT){
//       console.log("Too many documents to update. Please narrow the date range.")
//       return res.json(JSON.stringify({mesage:"Operation aborted. Too many documents to update. Please narrow the date range."})).send()
//     } else {
//       console.log("filtering...", docSnap.size, "documents...")
//       docSnap.forEach((doc) => {
//         const lastChar = parseInt(doc.id.charAt(doc.id.length-1))
//         if (Number.isInteger(lastChar) && lastChar < 6) {
//           deleted.push(doc.id)
//           // console.log(doc.id)
//         }
//       })
//     }
//   })
//   .catch((error) => {
//     console.log(error)
//     return res.status(error?.status).json(JSON.stringify(error)).send()
//   })

//   if (deleted.length > 0) {
//   console.log("Deleting " + deleted.length + " documents...")
//   for (const i in deleted) {
//     // console.log(deleted[i])
//     await admin.firestore()
//     .collection(body.coll)
//     .doc(deleted[i])
//     .delete()
//     .catch((error) => {
//       console.log(`error: ${error.status} at ${deleted[i]}`)
//     })
//   }
//   } else {
//     console.log("No documents deleted")
//   }

//   // console.log("Success!")
//   return res.json(JSON.stringify({message:`Deleted ${deleted.length} postings`})).send()
// })

// *********************************************************************** //
fsApp.post("/setPost", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);
  for (i in body.data) {
    const post = body.data[i];
    admin
      .firestore()
      .collection(`${body.dept}-posts`)
      .doc(post.id)
      .set(post, { merge: true })
      .catch((error) => {
        console.log(error);
      });
  }
  if (body.pos.group === "misc" && !body.data[0].lastMod) {
    admin
      .firestore()
      .collection(body.dept)
      .doc("rota")
      .collection("archive")
      .doc(body.archive)
      .get()
      .then(async (doc) => {
        let archiveUpdate = {};
        if (doc.exists) {
          archiveUpdate = structuredClone(doc.data());
          let rowUpdate = {};
          let active = false;
          archiveUpdate[body.data[0].shift].rows.filter((row, i) => {
            if (row.id === body.pos.id) {
              active = true;
              rowUpdate = structuredClone(row);
              body.data.map((post) => {
                let day = new Date(post.date).getDay();
                if (day === 0) {
                  rowUpdate[7] = post.id;
                } else {
                  rowUpdate[day] = post.id;
                }
              });
              // console.log(rowUpdate)
              archiveUpdate[body.data[0].shift].rows[i] = rowUpdate;
            }
          });
          if (!active) {
            rowUpdate = {
              id: body.pos.id,
              label: body.pos.label,
              color: body.data[0].color,
              group: body.pos.group,
              1: "",
              2: "",
              3: "",
              4: "",
              5: "",
              6: "",
              7: "",
            };
            body.data.map((post) => {
              let day = new Date(post.date).getDay();
              if (day === 0) {
                rowUpdate[7] = post.id;
              } else {
                rowUpdate[day] = post.id;
              }
            });
            archiveUpdate[body.data[0].shift].rows.push(rowUpdate);
          }
        } else {
          // create archive doc
          return res
            .json(JSON.stringify({ message: "Archive doc not found" }))
            .send();
        }
        await admin
          .firestore()
          .collection(body.dept)
          .doc("rota")
          .collection("archive")
          .doc(body.archive)
          .set(archiveUpdate)
          .then(() => {
            return res
              .json(
                JSON.stringify({
                  message: "Operation complete, archive update",
                })
              )
              .send();
          })
          .catch((error) => {
            return res
              .json(JSON.stringify({ message: "Error", error: error }))
              .send();
          });
      })
      .catch((error) => {
        console.log(error);
        return res
          .json(
            JSON.stringify({
              message: "Error getting archive doc",
              error: error,
            })
          )
          .send();
      });
  } else {
    return res
      .json(
        JSON.stringify({ message: "Operation complete, no archive update" })
      )
      .send();
  }
  // .catch((error) => res.send(error))
});

fsApp.post("/deletePost", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);
  let obj = {};
  await admin
    .firestore()
    .collection(`${body.dept}-posts`)
    .doc(body.post)
    .delete()
    .then(() => {
      console.log(`${body.post} Deleted!`);
    })
    .catch((error) => {
      res.status(error?.status).send(error);
    });
  if (body.misc) {
    await admin
      .firestore()
      .collection(body.dept)
      .doc("rota")
      .collection("archive")
      .doc(body.archive)
      .get()
      .then((doc) => {
        if (doc.exists) {
          obj = new Object(doc.data());
          obj[body.shift].rows.map((row) => {
            if (row.id === body.pos) {
              console.log(row.id, body.pos);
              let active = false;
              for (const key in row) {
                if (Number.isInteger(parseInt(key))) {
                  if (row[key] === body.post) {
                    console.log("Remove", body.post);
                    row[key] = "";
                  } else if (row[key].length > 0) {
                    active = true;
                  }
                }
              }
              if (!active) {
                console.log("Deleting Row", row.id);
                obj[body.shift].rows = obj[body.shift].rows.filter(
                  (row) => row.id !== body.pos
                );
              }
            }
          });
        } else {
          return res
            .json(JSON.stringify({ message: "No Archive Document Found" }))
            .send();
        }
      });
    await admin
      .firestore()
      .collection(body.dept)
      .doc("rota")
      .collection("archive")
      .doc(body.archive)
      .set(obj)
      .then(() => {
        console.log(`${body.archive} Updated!`);
      })
      .catch((error) => {
        console.log(error);
      });
    return res
      .json(JSON.stringify({ message: "Operation Complete, archive update" }))
      .send();
  } else {
    return res
      .json(
        JSON.stringify({ message: "Operation Complete, no archive update" })
      )
      .send();
  }
});

fsApp.post("/deleteJob", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);

  for (const i in body.posts) {
    admin
      .firestore()
      .collection(`${body.dept}-posts`)
      .doc(i)
      .delete()
      .then(() => {
        console.log(`${obj.doc} Deleted!`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  admin
    .firestore()
    .collection(body.dept)
    .doc(body.job)
    .delete()
    .then(() => {
      console.log(`${body.job} Deleted!`);
      res.send("Job Delete Complete");
    })
    .catch((error) => {
      res.status(error?.status).send(error);
    });
});

fsApp.post("/mkDoc", cors({ origin: URLs.prod }), async (req, res) => {
  let load = JSON.parse(req.body);

  admin
    .firestore()
    .collection(load.dept)
    .doc(load.id)
    .set(load, { merge: true })
    .then(() => {
      res.send(`Operation complete`);
    })
    .catch((error) => {
      console.log(error.message);
      res.send(error);
    });
});

fsApp.post("/editRota", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);

  admin
    .firestore()
    .collection(body.dept)
    .doc(body.id)
    .set(body, { merge: true })
    .then(() => {
      res.send(`Operation complete`);
    })
    .catch((error) => {
      console.log(error.message);
      res.send(error);
    });
});

fsApp.post("/updateField", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);

  const batchWrite = () => {
    console.log(body.docs);
    for (const i in body.docs) {
      // update[body.field][body.data[i].id]=body.data[i]
      admin
        .firestore()
        .collection(body.coll)
        .doc(body.docs[i].id)
        .set({ [body.field]: body.docs[i].quals }, { merge: true })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    }
    return res.send(`Update to doc(s) complete`);
  };
  batchWrite();
});

fsApp.post("/updateDoc", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);

  const batchWrite = () => {
    for (i in body.data) {
      // update[body.field][body.data[i].id]=body.data[i]
      admin
        .firestore()
        .collection(body.coll)
        .doc(body.doc)
        .set(
          { [body.field]: { [body.data[i].id]: body.data[i] } },
          { merge: true }
        )
        .catch((error) => res.send(error));
    }
  };
  batchWrite();
  res.send("update complete");
});

fsApp.post("/updateBids", cors({ origin: URLs.prod }), async (req, res) => {
  let body = JSON.parse(req.body);

  const getPost = () => {
    admin
      .firestore()
      .collection(body.coll)
      .doc(body.doc)
      .get()
      .then((document) => {
        let doc = document.data();
        // console.log(doc)
        for (const key in doc.seg) {
          // if doc.seg[key].bids = undefined
          if (!doc.seg[key].bids) {
            doc.seg[key]["bids"] = [];
          }
          // if user bid on segment (segs[key])
          if (body.bids.includes(key)) {
            let arr = [];
            let mod = false;
            doc.seg[key].bids.map((obj) => {
              // if user bid exists => overwrite to update
              if (obj.name === body.user.name) {
                mod = true;
                arr.push(body.user);
              } else {
                arr.push(obj);
              }
            });
            // if no prior user bid
            if (!mod) {
              arr.push(body.user);
            }
            doc.seg[key].bids = arr;
            // segment not bid on or bid was removed
          } else {
            console.log("Removed Bid from Segment " + key);
            let arr = [];
            doc.seg[key].bids.map((obj) => {
              if (obj.name !== body.user.name) {
                arr.push(obj);
              }
            });
            doc.seg[key].bids = arr;
          }
        }
        return batchWrite(doc.seg);
      });
  };

  const batchWrite = (obj) => {
    admin
      .firestore()
      .collection(body.coll)
      .doc(body.doc)
      .set({ seg: obj }, { merge: true })
      .then(() => res.send("Update Complete"))
      .catch((error) => res.send(error));
  };
  if (body.down > new Date().getTime()) {
    getPost();
  } else {
    res.send("Posting Closed");
  }
});

fsApp.post("/deleteDoc", cors({ origin: URLs.prod }), async (req, res) => {
  let obj = JSON.parse(req.body);
  await admin
    .firestore()
    .collection(obj.coll)
    .doc(obj.doc)
    .delete()
    .then(() => {
      console.log(`${obj.doc} Deleted!`);
      res.send("Operation Complete");
    })
    .catch((error) => {
      res.status(error?.status).send(error);
    });
});

fsApp.post("/deleteDocField", cors({ origin: URLs.prod }), async (req, res) => {
  let obj = JSON.parse(req.body);
  console.log(obj);

  await admin
    .firestore()
    .collection(obj.coll)
    .doc(obj.doc)
    .get()
    .then((doc) => {
      const data = doc.data();

      let objUpdate = {};
      const removeField = (map) => {
        for (const property in map) {
          if (property === obj.field.toString()) {
            console.log("REMOVED " + obj.field + " from " + obj.doc);
          } else {
            objUpdate[property] = map[property];
          }
        }
      };

      let docUpdate = {};
      const updateNested = () => {
        for (const property in data) {
          if (property !== obj.nestedObj) {
            docUpdate[property] = data[property];
          } else {
            docUpdate[obj.nestedObj] = objUpdate;
          }
        }
      };

      const makeChange = async (update) => {
        await admin.firestore().collection(obj.coll).doc(obj.doc).set(update);
      };

      if (obj.nestedObj) {
        removeField(data[obj.nestedObj]);
        updateNested();
        makeChange(docUpdate);
        res.send(docUpdate);
      } else {
        removeField(data);
        makeChange(objUpdate);
        res.send(objUpdate);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

exports.fsApp = functions.https.onRequest(fsApp);
//***************** End FsApp ************* */

//***************** Start Pub/Sub ************* */

// exports.pubSub = functions.pubsub.topic("init").onPublish((context) => {
//   console.log('pubSub Triggered');
//   return true;
// })

exports.pubSub = functions.https.onRequest(async (req, res) => {
  const body = JSON.parse(req.body);
  let rota = {};
  let rows = [];
  let dept = body.dept;
  const today = new Date(body.start);
  today.setHours(7);
  console.log(`Today => ${today}`);

  const findMon = (today) => {
    //Daylight Savings check
    const jan = new Date(today.getFullYear(), 0, 1);
    // console.log(`Daylight Savings => ${today.getTimezoneOffset() < jan.getTimezoneOffset()}`)
    let day = 24 * 60 * 60 * 1000;
    //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset
    let time =
      today -
      (today.getHours() * 60 * 60 * 1000 +
        today.getMinutes() * 60 * 1000 +
        today.getSeconds() * 1000 +
        today.getMilliseconds()) +
      (today.getTimezoneOffset() < jan.getTimezoneOffset()
        ? 60 * 60 * 1000
        : 0);
    let d = today.getDay();
    if (d === 0) {
      d = 7;
    }
    //monday = time - (day of the week * ms in a day) + 1 day in ms
    let mon = time - d * day + day;

    return new Date(mon);
  };

  const monday = findMon(today);

  const findWeek = (today, start, rotaLength) => {
    let timeSinceStart = today.getTime() - start;
    let weeksSince = timeSinceStart / (24 * 60 * 60 * 1000 * 7);
    let weekNumber = Math.ceil(weeksSince % rotaLength);

    return weekNumber;
  };

  const sort = (arr) => {
    arr.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      // if (a === b)
      return 0;
    });
  };

  const sortShifts = (shiftObj) => {
    const keys = Object.keys(shiftObj);
    let shiftArr = [];
    for (const prop in keys) {
      shiftArr.push(shiftObj[keys[prop]]);
    }
    sort(shiftArr);
    return shiftArr;
  };

  const buildRows = (shift, posts, week) => {
    // const mon = cols[0].label
    // const sun = cols[6].label
    let arr = [];
    let rowPosts = {};
    rows.length > 0 &&
      // loop through all rows
      rows.map((row, i) => {
        let archiveRow = structuredClone(row);
        // if shift is true in row
        if (row[shift.id]) {
          let show = true;
          // set color
          let color = shift.color[row.group][0];
          const prevRow = arr[arr.length - 1];
          // if previous row exists
          if (arr.length > 0) {
            if (prevRow.group === row.group) {
              if (prevRow.color === shift.color[row.group][0]) {
                color = shift.color[row.group][1];
              } else {
                color = shift.color[row.group][0];
              }
            }
          }
          archiveRow.data = {
            group: row.group,
            label: row.label,
            color: color,
            id: row.id,
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
          }; //mon to sun
          // if not "misc"
          if (row.data) {
            // for each day in the row
            for (const day in row.data) {
              // if the row has rotation data for the shift
              if (row.data[day][shift.id]) {
                // for each week in the rotation
                for (const key in row.data[day][shift.id]) {
                  if (key === week.toString()) {
                    // set the archiveRow.data to the rotation data for the week
                    archiveRow.data[day] =
                      rota.fields[shift.id][row.group][
                        row.data[day][shift.id][key]
                      ];
                  }
                }
              }
            }
          } else {
            show = false;
            for (const key in posts) {
              const post = posts[key];
              // console.log(post)
              if (post.shift === shift.id) {
                if (post.pos === row.id) {
                  // rowPosts[post.date] = post
                  show = true;
                  let date = new Date(post.date);
                  switch (date.getDay()) {
                    case 0:
                      archiveRow.data[7] = post.id;
                      break;
                    default:
                      archiveRow.data[date.getDay()] = post.id;
                  }
                }
              }
            }
          }

          if (show) {
            arr.push(archiveRow.data);
          }
          rowPosts = {};
        }
      });
    return arr;
  };
  // Get posts for the week to determine if "misc" row should be shown
  const posts = await db
    .collection(`${dept}-posts`)
    .where("date", ">=", monday.getTime())
    .where("date", "<=", monday.getTime() + 7 * (24 * 60 * 60 * 1000))
    .get()
    .then((snapshot) => {
      let obj = {};
      snapshot.forEach((doc) => {
        obj[doc.id] = doc.data();
        admin
          .firestore()
          .collection(`${dept}-posts`)
          .doc(doc.id)
          .set({ locked: true }, { merge: true })
          .catch((error) => {
            console.log(`Error locking post ${doc.id}`, error);
          });
      });
      return obj;
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  await db
    .collection(dept)
    .orderBy("order")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().id === "rota") {
          rota = doc.data();
        } else {
          rows.push(doc.data());
        }
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  let obj = {};

  const week = findWeek(today, rota.start, rota.length);
  const shifts = sortShifts(rota.shifts);

  shifts.map((shift) => {
    let rows = buildRows(shift, posts, week);
    obj[shift.id] = { shift: shift, rows: rows };
  });

  await db
    .collection(dept)
    .doc("rota")
    .collection("archive")
    .doc(`${today.toDateString()}`)
    .set(obj)
    .then(() => {
      console.log(
        `Doc written to ${dept}/rota/archive/${today.toDateString()}`
      );
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  res.send(`${monday} Successfully archived`);
});

//***************** End Pub/Sub ************* */
