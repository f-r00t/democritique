importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC2_D2BhgCC_A3ip6_A7gGQEryG6LdHV4U",
  authDomain: "democritique-36d90.firebaseapp.com",
  databaseURL: "https://democritique-36d90.firebaseio.com",
  storageBucket: "democritique-36d90.appspot.com",
  messagingSenderId: "912899019184"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

