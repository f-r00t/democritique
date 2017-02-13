
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

messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
  return messaging.getToken();
})
.then(function(token){
	console.log(token);
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

messaging.onMessage(function(payload){

	console.log(payload);
});