import React, { Component } from 'react';
import './sms.css';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/navbar';
import axios from "axios";
import history from "../../routing/history";

interface AppState {
    _id: string | null,
    smsCode: string,
    codeError: string,
    errors: [],
}

class Sms extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            _id: localStorage.getItem('_id'),
            smsCode: "",
            codeError: "",
            errors: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.setState({_id: localStorage.getItem('_id') } )
    }

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
    };

    handleSubmit(event:any) {
        const { smsCode, _id } = this.state;

        axios.put(`https://recrutation-healfy.herokuapp.com/auth/sms-verify/${_id}`, {
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
        const { smsCode, _id } = this.state;
        return (
            <div className="menuContainer">
                <Navbar/>
                <div className="loginFormContainer">
                    <h3>Sms Verification</h3>
                    <p className="register-error"> {this.state.errors }</p>
                    <form onSubmit={ this.handleSubmit } className="loginForm">
                        <input type="text"
                               placeholder="1234"
                               name="smsCode"
                               onChange={this.handleChange}
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