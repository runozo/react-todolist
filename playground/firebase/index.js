import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC4Tl7IBYuUdEONX9TfJ4ZXlEtz8A_5eSk",
    authDomain: "mead-todo-app-2276e.firebaseapp.com",
    databaseURL: "https://mead-todo-app-2276e.firebaseio.com",
    projectId: "mead-todo-app-2276e",
    storageBucket: "",
    messagingSenderId: "966097486980",
    appId: "1:966097486980:web:c68c7ba2cf41840c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var firebaseRef = firebase.database().ref();

  firebaseRef.set({
      app: {
        name: 'Todo app',
        version: '1.0.0'
      },
      isRunning: true,
      user: {
        name: 'Andrew',
        age: 25
      },
      todos: { // firebase don't have arrays, instead uses objects
      '123abcdef':
        {
          // id: '123abcdef',
          text: 'Film some vids'
        }
      }
  });

  var notesRef = firebaseRef.child('notes');

  notesRef.on('child_added', (snapshot) => {
    console.log('Child added', snapshot.key, snapshot.val());
  });

  notesRef.on('child_changed', (snapshot) => {
    console.log('Child changed', snapshot.key, snapshot.val());
  });

  notesRef.on('child_removed', (snapshot) => {
    console.log('Child removed', snapshot.key, snapshot.val());
  });


  var newNoteRef = notesRef.push({
    text: 'Walk the dog!'
  });

  console.log('Todo id', newNoteRef.key);

  // Challenge: add two todos and log out the results

  var todosRef = firebaseRef.child('todos');

  todosRef.on('child_added', (snapshot) => {
    console.log('Todo added', snapshot.key, snapshot.val());
  });

  todosRef.on('child_changed', (snapshot) => {
    console.log('Todo changed', snapshot.key, snapshot.val());
  });

  todosRef.on('child_removed', (snapshot) => {
    console.log('Todo removed', snapshot.key, snapshot.val());
  });

  var newNoteRef = todosRef.push({
    text: 'Walk the dog!'
  });

  var newNoteRef = todosRef.push({
    text: 'Do math'
  });

  // firebaseRef.update({
  //   'user/name': 'Jen',
  //   'app/name': 'Todo Application'
  // });

  // firebaseRef.child('app').update({name: 'Todo Application'});
  // firebaseRef.child('user').update({name: 'Mike'});

  // // firebaseRef.child('app/name').remove();
  // firebaseRef.child('app').update({
  //   version: '2.0',
  //   name: null
  // });

  // firebaseRef.child('user/age').remove();

  // firebaseRef.child('app').update({
  //   isRunning: null
  // });

  firebaseRef.once('value').then((snapshot) => {
    console.log('Got entire database', snapshot.val())
  }, (e) => {
    console.log('Unable to fetch value', e)
  });

  // firebaseRef.child('app').once('value').then((snapshot) => {
  //   console.log('Got entire key', snapshot.key, snapshot.val())
  // }, (e) => {
  //   console.log('Unable to fetch value', e)
  // });

  // var logData = (snapshot) => {
  //   console.log('Got value', snapshot.val());
  // };

  // firebaseRef.on('value', logData);

  // firebaseRef.off(logData);

  // firebaseRef.update({isRunning: false});

  // firebaseRef.child('user').on('value', (snapshot) => {
  //   console.log('User ref changed', snapshot.val());
  // });

  // firebaseRef.child('user').update({
  //   name: 'Mike'
  // });

  // firebaseRef.child('app').update({
  //   name: 'Name updated'
  // });

  // Arrays
