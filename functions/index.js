const functions = require("firebase-functions");
const {getAuth} = require('firebase-admin/auth');
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const URLs = {local:true ,prod:"https://overtime-management-83008.web.app"}

//***************** TODO ************ */
// admin id token authentication middleware
// separate admin & non admin functions
// function to modify the position identifiers in rota doc
// notification for new relevent posts and segment awarded


//Express init
const app = express();
app.use('*' ,cors({origin:URLs.prod}));

//Admin SDK init
const serviceAccount = require("./private/overtime-management-83008-firebase-adminsdk-q8kc2-1956d61a57.json");
initializeApp({
    credentials: serviceAccount
});

//******* userApp start ************** */

app.get('/resetPass', cors({origin: URLs.prod}), (req, res) => {
  const email = req.body
  getAuth()
  .generatePasswordResetLink(email)
  .then((link) => {
    res.send("Check registered e-mail for reset link")
  })
})

app.post('/newUser',cors({origin: URLs.prod}), (req, res) => {
  // cors(req,res,() => {
    let obj = JSON.parse(req.body);
    console.log(obj);
    getAuth()
    .createUser(obj.auth)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid)
      obj.profile.id = userRecord.uid
      admin.firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set(obj.profile)
      .then((doc) => {
        
        res.send(`${doc.id} Written Successfully`)
        
      })
    })
    .catch((error) => {
      console.log('Error creating new user:', error)
      res.send(error)
    });
  // })
})

app.post('/updateUser', cors({origin:URLs.prod}), async (req, res) => {
  let obj = JSON.parse(req.body)
  console.log(obj)

    await admin.firestore()
      .collection("users")
      .doc(obj.id)
      .set(obj.profile,{merge:true})
      .then(async () => {
        console.log(obj.id + " Updates Successful")
        if (obj.auth) {
          await getAuth()
          .updateUser(obj.id, obj.auth)
          .then((userRecord) => {
            console.log(userRecord.uid+" Updates Successful")
            res.send("Updates Successful")
          })
          .catch((error) => {
            res.send(error.code)
          })
        } else {
          res.send("Updates Successful")
        }
      })
      .catch((error) => {
        res.send(error.code)
      })
  
})

//get user record by firebase uid
app.post('/getUser', cors({origin:URLs.prod}), async (req, res) => {
        let uid = req.body;
        let resObj = {}

        console.log(uid)
        const getUserRecord = async () => {
          
          await getAuth()
          .getUser(uid)
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(userRecord);
            return (userRecord)
          })
          .catch((error) => {
            res.send(error);
          }); 
        }
        
        await admin.firestore()
        .collection("users")
        .doc(uid).get()
        .then(doc => {
          let profile = doc.data()
          res.send(profile)
        })
        

        // resObj.userRecord = await getUserRecord()
        // resObj.profile = await getProfile()
        
        // res.send(resObj)
});

// Set Express app to deploy in Firebse Function "app"
exports.app = functions.https.onRequest(app)
//************ userApp end **************** */

//************ fsApp start **************** */

//Express init
const fsApp = express()

//cors init
// fsApp.use('*' ,cors({
//   origin: "https://localhost:3000",

// }));

fsApp.get('/', async (req,res) => {
  let load = {}
  await admin.firestore()
  .collection('messages')
  .get()
  .then((docSnap) => {
    if (docSnap) {
      docSnap.forEach((doc) => {
        load[doc.id] = doc.data()
      })
      console.log(load)
      res.json(load)
    }
  })
  .catch((error) => {
    res.status(error?.status).send(error)
  })
})

fsApp.post('/mkDoc', cors({origin: URLs.local}), async (req,res) => {
  let load = JSON.parse(req.body)

  admin.firestore()
  .collection(load.dept)
  .doc(load.id)
  .set(load)
  .then(() => {
    res.send(`Operation complete`)
  })
  .catch((error) => {
    console.log(error.message)
    res.send(error)
  })
})

fsApp.post('/updateField', cors({origin: URLs.local}), async (req,res) => {
  
  let body = JSON.parse(req.body)

  const batchWrite = () => {
    console.log(body.docs)
    for (const i in body.docs) {
      // update[body.field][body.data[i].id]=body.data[i]
      admin.firestore()
      .collection(body.coll)
      .doc(body.docs[i].id)
      .set({[body.field]: body.docs[i].quals},{merge:true})
      .catch((error) => {
        console.log(error)
        res.send(error)
      })
    }
    return (
      res.send(`Update to doc(s) complete`)
    )
  }
  
  batchWrite()
  
})

fsApp.post('/updateDoc', cors({origin: URLs.local}), async (req,res) => {
  
  let body = JSON.parse(req.body)

  const batchWrite = () => {
    for (i in body.data) {
      // update[body.field][body.data[i].id]=body.data[i]
      admin.firestore()
      .collection(body.coll)
      .doc(body.doc)
      .set({[body.field]:{[body.data[i].id]:body.data[i]}},{merge:true})
      .catch((error) => res.send(error))
    }

  }
  batchWrite()
  res.send("update complete")
})

fsApp.post('/updateBids', cors({origin: URLs.local}), async (req,res) => {
  
  let body = JSON.parse(req.body)

  const getPost = () => {
    admin.firestore()
    .collection(body.coll)
    .doc(body.doc)
    .get()
    .then((document) => {
      let doc = document.data()
      // console.log(doc)
      for (const key in doc.seg) {
        // if doc.seg[key].bids = undefined
        if (!doc.seg[key].bids) {
          doc.seg[key]["bids"] = []
        }
        // if user bid on segment (segs[key])
        if (body.bids.includes(key)) {
          let mod = true
          doc.seg[key].bids.map(obj => {
            if (obj.name === body.user.name) {
              mod = false
            }
          })
          if (mod) {
            doc.seg[key].bids.push(body.user)
          }
          // segment not bid on or bid was removed
        } else {
          console.log("Removed Bid from Segment "+key)
          let arr = []
          doc.seg[key].bids.map(obj => {
            if (obj.name !== body.user.name) {
              arr.push(obj)
              }
            })
            doc.seg[key].bids = arr
        }
      }
      // console.log(doc)
      return batchWrite(doc.seg)
    })
  }

  const batchWrite = (obj) => {
    admin.firestore()
    .collection(body.coll)
    .doc(body.doc)
    .set({seg: obj},{merge:true})
    .then(() => res.send("Update Complete"))
    .catch((error) => res.send(error))
  }
  if (body.down > new Date().getTime()) {
    getPost()
  } else {
    res.send("Posting Closed")
  }
})

fsApp.post('/setPost', cors({origin: URLs.local}), async (req,res) => {
  let body = JSON.parse(req.body)
  const batchWrite = () => {
    for (i in body.data) {
      admin.firestore()
      .collection(body.coll)
      .doc(body.data[i].id)
      .set(body.data[i],{merge:true})
      .then(doc => res.send("update complete"))
      .catch((error) => res.send(error))
    }
  }
  batchWrite()
})

fsApp.post('/deleteDoc', cors({origin: URLs.local}), async (req, res) => {
  let obj = JSON.parse(req.body)
  await admin.firestore()
  .collection(obj.coll)
  .doc(obj.doc).delete()
  .then(() => {
    console.log(`${obj.doc} Deleted!`)
    res.send("Operation Complete")
  })
  .catch((error) => {
    res.status(error?.status).send(error)
  })
})

fsApp.post('/deleteDocField', cors({origin: URLs.local}), async (req, res) => {

  let obj = JSON.parse(req.body)

  console.log(obj)

  await admin.firestore()
  .collection(obj.coll)
  .doc(obj.doc).get()
  .then((doc) => {
    // console.log(doc.data())
    
    const data = doc.data()

    let objUpdate = {}

    const removeField = (map) => {
      
      for (const property in map) {
        if(property === obj.field.toString()) {
          console.log("REMOVED "+obj.field+" from "+obj.doc)
        } else {
          objUpdate[property] = map[property]
        }
      }
      
    }

    let docUpdate = {}
    
    const updateNested = () => {
      
      for (const property in data) {
        if (property !== obj.nestedObj) {
          docUpdate[property] = data[property]
        } else {
          docUpdate[obj.nestedObj] = objUpdate
        }
      }

    }

    const makeChange = async (update) => {
      await admin.firestore()
      .collection(obj.coll)
      .doc(obj.doc).set(update)
      
    };

    if (obj.nestedObj) {
      removeField(data[obj.nestedObj])
      updateNested()
      makeChange(docUpdate)
      res.send(docUpdate)
    } else {
      removeField(data)
      makeChange(objUpdate)
      res.send(objUpdate)
    }

  })
  .catch((error) => {
    res.send(error)
  })  
})

exports.fsApp = functions.https.onRequest(fsApp)