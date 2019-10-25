var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');   // to test pure functions

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Some text'
            }
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle show completed flag', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            }
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text:'Something to do',
                    completed: false,
                    createdAt: 500
                }
            }
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should toggle todo', () => {
            var todos = [{
                id: 1,
                text: 'New todo',
                completed: true,
                createdAt: 456,
                completedAt: 458
            }];

            var updates = {
                completed: false,
                completedAt: null
            }

            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            }
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);
        });

        it('should add existing todos', () => {
            const todos = [{
                id: 111,
                text: 'anything',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            const action = {
                type: 'ADD_TODOS',
                todos
            };
            const res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });

    describe('authReducer', () => {
        it('should store uid on LOGIN', () => {
            const action = {
                type: 'LOGIN',
                uid: '123abc'
            }
            const res = reducers.authReducer(undefined, df(action));

            expect(res).toEqual({
                uid: action.uid
            });
        });

        it('should wipe auth on LOGOUT', () => {
            const authData = {
                uid: '123abc'
            }
            const action = {
                type: 'LOGOUT'
            }
            const res = reducers.authReducer(df(authData), df(action));

            expect(res).toEqual({});
        });
    });
});