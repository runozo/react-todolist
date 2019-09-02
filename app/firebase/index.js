import firebase from 'firebase';

try {
    var firebaseConfig = {
        apiKey: "AIzaSyC4Tl7IBYuUdEONX9TfJ4ZXlEtz8A_5eSk",
        authDomain: "mead-todo-app-2276e.firebaseapp.com",
        databaseURL: "https://mead-todo-app-2276e.firebaseio.com",
        projectId: "mead-todo-app-2276e",
        storageBucket: "",
        messagingSenderId: "966097486980",
        appId: "1:966097486980:web:c68c7ba2cf41840c"
    };

    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e);
}
  // Initialize Firebase

  export var firebaseRef = firebase.database().ref();
  export default firebase;
