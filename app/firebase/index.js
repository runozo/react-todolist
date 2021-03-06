import firebase from 'firebase';

try {
    var firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        storageBucket: process.env.STORAGE_BUCKET
    };

    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e);
}
  // Initialize Firebase
export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
