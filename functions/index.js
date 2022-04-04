const functions = require("firebase-functions");
const {getAuth} = require('firebase-admin/auth');
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

//***************** TODO ************ */
// refactor updateUser to fasilitae easy password resets by admin
// admin id token authentication middleware
// separate admin & non admin functions
// function to create profile doc in firestore
// function to modify the position identifiers in rota doc
// post sorting & delivery to ee profiles
// notification for new relevent posts and segment awarded


//Express init
const app = express();
app.use('*' ,cors({origin:"https://localhost:3000/"}));

//Admin SDK init
const serviceAccount = require("./private/overtime-management-83008-firebase-adminsdk-q8kc2-1956d61a57.json");
initializeApp({
    credentials: serviceAccount
});

//******* userApp start ************** */

app.post('/updateUser', (req, res) => {
  let obj = JSON.parse(req.body);

  getAuth()
  .setCustomUserClaims(obj.uid, {[obj.role]: true, role: obj.role})
  .then(() => {
    res.status(200).json({status:"User claim updated successfully", user: obj.uid})
  })
  .catch(err => {
    res.status(err.status).send(err)
  })
})

app.post('/newUser', (req, res) => {
  // cors(req,res,() => {
    let obj = req.body;
    console.log(JSON.parse(obj));
    getAuth()
    .createUser(JSON.parse(obj))
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      res.json(userRecord);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  // })
})

//get user record by firebase uid
app.post('/getUser', (req, res) => {
        let uid = req.body;
        console.log(uid)
        getAuth()
        .getUser(uid)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(userRecord);
          res.status(200).json(userRecord)
        })
        .catch((error) => {
          res.send(error);
        }); 
});

// Set Express app to deploy in Firebse Function "app"
exports.app = functions.https.onRequest(app)
//************ userApp end **************** */

//Express init
const fsApp = express()
// fsApp.use('*' ,cors({
//   origin: "https://localhost:3000/",

// }));

//************ fsApp start **************** */
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

fsApp.get('/deleteDoc', async (req, res) => {
  let id = req.body
  await admin.firestore()
  .collection('messages')
  .doc(d).delete()
  .then(() => {
    console.log("Document Deleted!" )
    res.status(200).send("Operation Complete")
  })
  .catch((error) => {
    res.status(error?.status).send(error)
  })
})

fsApp.post('/deleteDocField', cors({origin: "https://localhost:3000"}), async (req, res) => {

  let obj = JSON.parse(req.body)

  console.log(obj)

  await admin.firestore()
  .collection(obj.coll)
  .doc(obj.doc).get()
  .then((doc) => {
    // console.log(doc.data())
    
    const data = doc.data()
    let postUpdate = {}

    for (const property in data.posts) {
      if(property === obj.field.toString()) {
        console.log("REMOVED "+data.posts[property])
      } else {
        postUpdate[property] = data.posts[property]
      }
      console.log(`${property}: ${data[property]}`)
      
    }

    let docUpdate = {}

    for (const property in data) {
      if (property !== 'posts') {
        docUpdate[property] = data[property]
      } else {
        docUpdate['posts'] = postUpdate
      }
    }

    const makeChange = async () => {
      await admin.firestore()
      .collection(obj.coll)
      .doc(obj.doc).set(docUpdate)
      .then(() => {
      })
    };
    makeChange()
    res.send(docUpdate)
  })
  .catch((error) => {
    res.send(error)
  })  
})

exports.fsApp = functions.https.onRequest(fsApp)