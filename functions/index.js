const functions = require("firebase-functions");
const {getAuth} = require('firebase-admin/auth');
const { initializeApp } = require('firebase-admin/app');
const cors = require('cors')({origin:true});

const serviceAccount = require("./private/overtime-management-83008-firebase-adminsdk-q8kc2-1956d61a57.json");


initializeApp({
    credentials: serviceAccount
});

exports.newUser = functions.https.onRequest((req, res) => {
  cors(req,res,() => {
    let obj = req.body
    getAuth()
    .createUser({
      email: obj.email,
      emailVerified: obj.emailVerified,
      phoneNumber: obj.phoneNumber,
      password: obj.password,
      displayName: obj.displayName,
      disabled: obj.disabled,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      res.json(userRecord);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  })
})

//get user record
exports.getUser = functions.https.onRequest((req,res) => {
    cors(req, res, () => {
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
          res.status(error.status).send(error);
        }); 
    });
});

