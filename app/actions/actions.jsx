import firebase, {firebaseRef} from 'app/firebase/';
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
    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
        dispatch(addTodo({
            ...todo,
            id: todoRef.key
        }));
    })
});
export var addTodos = todos => ({type: 'ADD_TODOS', todos});
export var toggleShowCompleted = () => ({type: 'TOGGLE_SHOW_COMPLETED'});

export var updateTodo = (id, updates) => ({type: 'UPDATE_TODO', id, updates});
export var startToggleTodo = (id, completed) => ((dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
        completed,
        completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
       dispatch(updateTodo(id, updates)) ;
    });

});
