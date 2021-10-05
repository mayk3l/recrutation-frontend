import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import "./home.css";

interface Props {
    location: any
}

export default class Home extends Component<Props, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: '',
        };
    };

    componentDidMount() {
        this.setState({token: localStorage.getItem('token') } )
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="menuContainer">
                    <div className="titleApp">
                        <p>{this.state.token ? 'Zalogowany' : 'Wylogowany'}</p>
                    </div>
                </div>
            </div>
        );
    }
}