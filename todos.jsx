import React, { Component } from 'react';
import Todo from './todo';
import TodoAddForm from './todoAddForm';

function Todos(){
    console.log('todos');
    
    return (
        <div className="todos">
            <TodoAddForm onAdd={this.props.onAdd}/>
            <ul>
                {
                    this.props.todos.map(todo => (
                        <Todo key={todo.id} todo={todo}
                         onIncrement={this.props.onIncrement}
                         onDecrement={this.props.onDecrement}
                         onDelete={this.props.onDelete}
                        />
                    ))
                }
            </ul>
            <button className="todos-reset" onClick={this.props.onReset}>
                초기화
            </button>
        </div>
    )
}

export default Todos;
