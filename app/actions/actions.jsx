export var setSearchText = searchText => ({type: 'SET_SEARCH_TEXT', searchText});
export var addTodo = text => ({type: 'ADD_TODO', text});
export var addTodos = todos => ({type: 'ADD_TODOS', todos});
export var toggleShowCompleted = () => ({type: 'TOGGLE_SHOW_COMPLETED'});
export var toggleTodo = id => ({type: 'TOGGLE_TODO', id});
