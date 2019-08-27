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
                text: 'New todo'
            }
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0].text).toEqual(action.text);
        });

        it('should correctly toggle todo status if not completed', () => {
            var todos = [{
                id: 1,
                text: 'New todo',
                completed: false,
                createdAt: 789,
                completedAt: undefined
            }];

            var action = {
                type: 'TOGGLE_TODO',
                id: todos[0].id
            }
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(!todos[0].completed);
        });

        it('should correctly toggle todo status if completed', () => {
            var todos = [{
                id: 1,
                text: 'New todo',
                completed: true,
                createdAt: 456,
                completedAt: 458
            }];

            var action = {
                type: 'TOGGLE_TODO',
                id: todos[0].id
            }
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(false);
            expect(res[0].completedAt).toEqual(undefined);
        });
    });
});