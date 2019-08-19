var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function() {
        const {todos} = this.props;
        return (
            <div>
                {todos.map(todo => <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>)}
            </div>
        );
    }
});

module.exports = TodoList;