import React, { Component } from "react";



function Navbar(){

    return ( <div className="navbar">
                <i class="navbar-logo fas fa-list-ol"></i>
                <span>할일 목록 리스트</span>
                <span className="navbar-count">{this.props.totalCount}</span>
            </div>);
}

export default Navbar;