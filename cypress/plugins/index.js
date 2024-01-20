var admin = require("firebase-admin");

var serviceAccount = require("../../private/firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
