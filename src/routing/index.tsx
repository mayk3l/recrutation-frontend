import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "../components/home/home";
import Login from "../components/login/login";
import history from './history';
import Register from '../components/register/register';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Register" component={Register} />
                </Switch>
            </Router>
        )
    }
}