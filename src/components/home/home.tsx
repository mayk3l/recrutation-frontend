import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import "./home.css";

interface Props {
    location: any
}

export default class Home extends Component<Props> {
    render() {
        const token = localStorage.getItem("token");
        return (
            <div>
                <Navbar />
                <div className="menuContainer">
                    <div className="titleApp">
                        <h1>Healfy</h1>
                    </div>
                </div>
            </div>
        );
    }
}