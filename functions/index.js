const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {getAuth} = require('firebase-admin');
const cors = require('cors')({origin: true});
const { initializeApp } = require("firebase/app");

const serviceAccount = require("./private/admin-sdk-test-2e7ea-firebase-adminsdk-2moxv-e28dae166a.json");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLsZmecJHFvSj0VFc5ab2gDZf6H2FCKuM",
    authDomain: "overtime-management-83008.firebaseapp.com",
    projectId: "overtime-management-83008",
    storageBucket: "overtime-management-83008.appspot.com",
    messagingSenderId: "1023865637379",
    appId: "1:1023865637379:web:7f24724c485f0bfc7b9c36",
    measurementId: "G-BC5X14V42F"
  };

const app = initializeApp(firebaseConfig)

admin.initializeApp({
    credentials: serviceAccount
});

// http request 1
exports.randomNum = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const number = Math.round(Math.random() * 100).toString();
        res.send(200).json(number);
    }) 
})

//get user record
exports.getUser = functions.https.onRequest((req,res) => {
    // cors((req, res) => {
        let uid = req.uid;
        console.log(uid)
        getAuth()
        .getUser(uid)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          res.json(userRecord);
        })
        .catch((error) => {
          res.status(error.status).send(error);
        }); 
    // })
})

