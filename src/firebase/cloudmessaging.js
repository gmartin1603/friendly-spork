// import {app} from './firebaseApp'
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);

// // messaging.getToken({vapidKey: "BLEVPsC3ksrXvqeaSAJiEOi26IY7uxqgTW3826nUuGNe7OW9LEjovnKqINf0hl25l2nNrrauPGHf5nekLNvGkeA"})

// // Get registration token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// getToken(messaging).then((currentToken) => {
//     if (currentToken) {
//     // Send the token to your server and update the UI if necessary
//     console.log(currentToken)
//     } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });

// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

