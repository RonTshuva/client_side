import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response: ""
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = () => {
        axios.get("http://localhost:8989/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data);
                    window.location.reload();
                } else {
                    this.setState({
                        showError: true
                    })
                }
            })

    }

    render() {
        return (
            <div>
                <b id ="title">
                    Login page
                </b>
                <div id = "frame">
                    <br/>
                    Enter your login credentials
                    <br/>
                    <b> Username:</b>
                    <br/>
                    <input class = "detailsOfClient"
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <br/>
                    <b> Password:</b>
                    <br/>
                    <input class = "detailsOfClient"
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                </div>
                <br/>
                <button id = "button" onClick={this.login}>Login</button>
                <br/>
                <NavLink to={"/sign-up"}>
                    <br/>
                    <button id = "button">
                        Sign Up
                    </button>
                </NavLink>

                {
                    this.state.showError &&
                    <div>Wrong Password</div>
                }
                <div>{this.state.response}</div>
            </div>
        )
    }
}
export default LoginPage;
