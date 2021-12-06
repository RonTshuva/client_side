import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import errorCodes from "./ErrorCodes";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        response: "",

    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = () => {
        axios.get("http://localhost:8989/login", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data.success) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data.responseData);
                    window.location.reload();
                }
                switch(response.data.errorCode)
                {
                    case errorCodes.INCORRECT_USERNAME:
                        this.setState({response: "username is incorrect!"});
                        break;
                    case errorCodes.INCORRECT_PASSWORD:
                        this.setState({response: "password is incorrect! you tried "+ response.data.responseData + " out of 5 tries!" });
                        break;
                    case errorCodes.BLOCKED_ACCOUNT:
                        this.setState({response: "account is blocked!"});
                        break;
                    default:
                        this.setState({response: "something went wrong!"});
                }
            })
    }


    render() {
        return (
            <div>
                <b id="title">Login page</b>
                <div id="frame">
                    <br/>
                    Enter your login credentials
                    <br/>
                    <b> Username:</b>
                    <br/>
                    <input class="detailsOfClient"
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <br/>
                    <b> Password:</b>
                    <br/>
                    <input class="detailsOfClient"
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                </div>
                <br/>
                <button disabled={this.state.password.length === 0 || this.state.username.length === 0} id="button" onClick={this.login}>Login</button>
                <br/>
                <NavLink to={"/sign-up"}>
                    <br/>
                    <button id="button">Sign Up</button>
                </NavLink>
                {
                    this.state.response.length > 0 &&
                    <div style={{color: "red"}}> {this.state.response}</div>
                }
            </div>
        )
    }
}
export default LoginPage;
