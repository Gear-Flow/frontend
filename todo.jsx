import React, { Component } from "react";

function Todo(){

    handleIncrement = () => {
        this.props.onIncrement(this.props.todo);
    }

    handleDecrement = () => {
        this.props.onDecrement(this.props.todo);
    }

    handleDelete = () => {
        this.props.onDelete(this.props.todo);
    }
    const { name, count } = this.props.todo;

    return(
        <>
        <li className="todo">
            <span className="todo">{name}</span>
            <span className="todo-count">{count}</span>
            <button className="todo-button todo-increase" onClick={this.handleIncrement}>
                <i class="fas fa-plus-square"></i>
            </button>
            <button className="todo-button todo-decrease" onClick={this.handleDecrement}>
                <i class="fas fa-minus-square"></i>
            </button>
            <button className="todo-button todo-delete" onClick={this.handleDelete}>
                <i class="fas fa-trash"></i>
            </button>
        </li>
        </>
    );
};


export default Todo;