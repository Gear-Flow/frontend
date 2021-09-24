import React, { Component } from "react";


function TodoAddFrom(props){

    formRef = React.createRef();
    inputRef = React.createRef();

    onSubmit = event => {
        event.preventDefault();
        const name = this.inputRef.current.value;
        name && this.props.onAdd(name);
        this.formRef.current.reset();
    }

        return (
            <form ref={this.formRef} className="add-form" onSubmit={this.onSubmit}>
                <input ref={this.inputRef} type="text" className="add-input" placeholder="할 일을 적어주세요"/>
                <button className="add-button">확인</button>
            </form>
        );
   

}

export default TodoAddForm;