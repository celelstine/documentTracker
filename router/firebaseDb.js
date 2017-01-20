var firebase = require('firebase');

// Initialize Firebase
var config = {
            apiKey: "AIzaSyBQ2swuVnEBW4PHKGNXYKLs6ussitWlDTk",
            authDomain: "trackdoc-ad797.firebaseapp.com",
            databaseURL: "https://trackdoc-ad797.firebaseio.com",
            storageBucket: "trackdoc-ad797.appspot.com",
            messagingSenderId: "178755390087"
          };
          firebase.initializeApp(config);

module.exports = {firebase}; 