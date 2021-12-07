import './App.css';
import './LoginPage.css'
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
                        this.setState({response: "account '" + this.state.username +"' is blocked!"});
                        break;
                    default:
                        this.setState({response: "something went wrong!"});
                }
            })
    }


    render() {
        return (
            <div>

                <div id="frame" class={"container"}>
                    <div>
                        <b id="title">Login page</b>
                        <br/>
                        <span class={"midTitle"}>Enter your login credentials</span>
                        <br/>
                        <b> Username:</b>
                        <br/>
                        <input id={"detailsOfClient"}
                               onChange={this.onUsernameChange}
                               value={this.state.username}
                               placeholder={"Enter username"}
                        />
                        <br/>
                        <b > Password:</b>
                        <br/>
                        <input id={"detailsOfClient"}
                               onChange={this.onPasswordChange}
                               value={this.state.password}
                               placeholder={"Enter password"}
                        />
                        <br/>
                        <br/>
                    </div>
                    <button id="button" class={"buttons"} disabled={this.state.password.length === 0 || this.state.username.length === 0}  onClick={this.login}>Login</button>
                    <NavLink to={"/sign-up"} >
                        <button id={"button"} class={"buttons"} >Sign Up</button>
                    </NavLink>
                    <br/>
                    {
                        this.state.response.length > 0 &&
                        <div class={"LoginPageError"} > {this.state.response}</div>
                    }
                </div>


            </div>
        )
    }
}
export default LoginPage;
