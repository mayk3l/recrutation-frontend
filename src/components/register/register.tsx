import React, { Component } from 'react';
import './register.css';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/navbar';
import axios from "axios";
import history from "../../routing/history";

interface AppState{
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    email: string,
    firstNameError: string,
    lastNameError: string,
    phoneError: string,
    passwordError: string,
    emailError: string,
    errors: any
}

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class Register extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            phone: "",
            email: "",
            firstNameError: " ",
            lastNameError: " ",
            phoneError: " ",
            passwordError: " ",
            emailError: " ",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
        const {name , value} = event.target;
        let uError, pError, eError;
        switch(name) {
            case 'firstName':
                uError = value.length < 2
                    ? 'First name must be 2 characters long!'
                    : '';
                this.setState({firstNameError: uError});
                break;
            case 'lastName':
                uError = value.length < 2
                    ? 'Last name must be 2 characters long!'
                    : '';
                this.setState({lastNameError: uError});
                break;
            case 'phone':
                uError = value.length < 9
                    ? 'Phone must be 9 characters long!'
                    : '';
                this.setState({phoneError: uError});
                break;
            case 'password':
                pError = value.length < 6
                    ? 'Password must be 6 characters long!'
                    : '';
                this.setState({passwordError: pError});
                break;
            case 'email':
                eError = validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                this.setState({emailError: eError});
                break;
            default:
                break;
        }
    };

    handleSubmit(event:any) {
        const { firstName, lastName, phone, password, email } = this.state;

        axios.post('https://recrutation-healfy.herokuapp.com/user/register', {
            first_name: firstName,
            last_name: lastName,
            phone,
            pwd: password,
            email,
        }).then((ret) => {
            if (ret.status == 200) {
                history.push({
                    pathname: '/',
                    state: {
                        message: "Registered successfully!"
                    }
                });
            }
        }, (error) => {
            console.log(error);
            if (error.response.status == 409) {
                this.setState({errors: "User is already registered!"});
            }
        });
        event.preventDefault();
    };


    render() {
        const { firstNameError, lastNameError, phoneError, passwordError, emailError } = this.state;
        const enabled =
            firstNameError === '' && lastNameError === '' && phoneError === '' && passwordError === '' && emailError === '';

        return (
            <div className="menuContainer">
                <Navbar/>
                <div className="loginFormContainer">
                    <p className="register-error"> {this.state.errors }</p>
                    <h3>Register</h3>
                    <form onSubmit={ this.handleSubmit } className="loginForm">
                        <input type="text"
                               placeholder="Jan"
                               name="firstName"
                               value={this.state.firstName}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.firstNameError }</p>
                        <input type="text"
                               placeholder="Kowalski"
                               name="lastName"
                               value={this.state.lastName}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.lastNameError }</p>
                        <input type="text"
                               placeholder="669939790"
                               name="phone"
                               value={this.state.phone}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.phoneError }</p>
                        <input type="password"
                               placeholder="Password"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.passwordError }</p>
                        <input type="text"
                               placeholder="michal.larysz91@gmail.com"
                               name="email"
                               value={this.state.email}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.emailError }</p>
                        <Button disabled={!enabled} variant="contained" color="primary" type="submit">Create account</Button>
                        <p className="message"> Do you have an account?
                            <Button variant="contained" color="primary" size="small" onClick={() => history.push("/Login")}>Sign In</Button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}
export default Register;