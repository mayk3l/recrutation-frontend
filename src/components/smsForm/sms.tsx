import React, { Component } from 'react';
import './sms.css';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/navbar';
import axios from "axios";
import history from "../../routing/history";

interface AppState{
    smsCode: string,
    codeError: string,
    errors: [],
}

class Sms extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            smsCode: "",
            codeError: "",
            errors: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event:any) {
        const { smsCode } = this.state;

        axios.post('https://recrutation-healfy.herokuapp.com/auth/sms-verify', {
            smsCode,
        }).then((ret) => {
            if (ret.status == 200) {
                history.push({
                    pathname: '/',
                });
            }
        }, (error) => {
            if (error.response.status == 400) {
                this.setState({codeError: "Wrong code!"});
            }
        });
        event.preventDefault();
    };


    render() {
        const { smsCode } = this.state;
        return (
            <div className="menuContainer">
                <Navbar/>
                <div className="loginFormContainer">
                    <p className="register-error"> {this.state.errors }</p>
                    <form onSubmit={ this.handleSubmit } className="loginForm">
                        <input type="text"
                               placeholder="1234"
                               name="smsCode"
                               value={this.state.smsCode}
                        />
                        <p className="register-error">{ this.state.codeError }</p>
                        <Button variant="contained" color="primary" type="submit">Check code</Button>
                    </form>
                </div>
            </div>
        );
    }

}
export default Sms;