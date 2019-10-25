import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import moment from 'moment';

export var setSearchText = searchText => ({type: 'SET_SEARCH_TEXT', searchText});
export var addTodo = todo => ({type: 'ADD_TODO', todo});
export var startAddTodo = text => ((dispatch, getState) => {
    var todo = {
        text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null
    }
    const uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

    return todoRef.then(() => {
        dispatch(addTodo({
            ...todo,
            id: todoRef.key
        }));
    })
});
export var addTodos = todos => ({type: 'ADD_TODOS', todos});
export var startAddTodos = () => ((dispatch, getState) => {
    const uid = getState().auth.uid;
    var todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
        var todos = snapshot.val() || {};
        var parsedTodos = [];
        Object.keys(todos).forEach((todoId) => {
            parsedTodos.push({
                id: todoId,
                ...todos[todoId]
            });
        });
        dispatch(addTodos(parsedTodos));
    });
});
export var toggleShowCompleted = () => ({type: 'TOGGLE_SHOW_COMPLETED'});

export var updateTodo = (id, updates) => ({type: 'UPDATE_TODO', id, updates});
export var startToggleTodo = (id, completed) => ((dispatch, getState) => {
    const uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
        completed,
        completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
       dispatch(updateTodo(id, updates));
    });

});

export const login = (uid) => ({type: 'LOGIN', uid});
export const startLogin = () => ((dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then(
        (result) => {console.log('Auth worked!', result);},
        (error) => {console.log('Unable to auth', error);}
    );
});

export const logout = () => ({type: 'LOGOUT'});
export const startLogout = () => ((dispatch, getState) => {
    return firebase.auth().signOut().then(
        () => {console.log('Logged out!');}
    );
});