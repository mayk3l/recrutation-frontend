import React, {Component} from 'react';
import './login.css';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/navbar';
import history from "../../routing/history";
import axios from "axios";

interface AppState{
    email: string,
    password: any,
    loginErrors: any
}

class Login extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
    };

    handleSubmit(event:any) {
        const { email, password, loginErrors } = this.state;

        axios.post('https://recrutation-healfy.herokuapp.com/auth/login', {
            email,
            pwd: password
        }).then((ret) => {
            if (ret.status == 200) {
                history.push({
                    pathname: '/',
                    state: {
                        token: ret.data,
                        email,
                    }
                });
                console.log(ret.data);
                localStorage.setItem("token", ret.data.token);
            }
        }, (error) => {
            if (error.response.status == 401) {
                this.setState({loginErrors: "Wrong email or password"});
                console.log('UNATHORIZED USER');
            }
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <div className="menuContainer">
                    <Navbar/>
                    <div className="loginFormContainer">
                        <h2 className="login-error">{ this.state.loginErrors }</h2>
                        <form onSubmit={this.handleSubmit} className="loginForm">
                            <div>
                                <input type="text"
                                       placeholder="blabla@gmail.com"
                                       name = "email"
                                       onChange={this.handleChange}
                                       value={this.state.email}
                                />
                            </div>
                            <div>
                                <input type="password"
                                       placeholder="Password"
                                       name = "password"
                                       onChange={this.handleChange}
                                       value={this.state.password}
                                />
                            </div>
                            <Button variant="contained" color="primary" type="submit">Sign In</Button>
                            <p className="message"> You don't have an account?
                                <Button variant="contained" color="primary" size="small" onClick={() => history.push("/Register")}>Register</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;