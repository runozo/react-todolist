var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function() {
        const {todos} = this.props;
        return (
            <div>
                {todos.map(todo => <Todo key={todo.id} {...todo}/>)}
            </div>
        );
    }
});

module.exports = TodoList;