import * as React from "react";
import "./SignUp.css"
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        response: "",
        usernameError : "username must be a valid phone number!",
        passwordError : ""
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

    strongPasswordCheck = () =>{
        // it is better to make a method here and not update the state.
        // hard to explain but when i try to update the state and check the state variable it has a delay and can cause bugs and give the user a false positive feed back (as if his password is weak although it isn't)
        const englishChar = /[a-zA-Z]/.test(this.state.password);
        const numbers = /[0-9]/.test(this.state.password);
        const strongLength = this.state.password.length >= 6;
        return numbers && englishChar && strongLength;
    }

    signUp = () => {
        if(this.strongPasswordCheck()) {
            this.setState({response: ""}); // reset response
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            response: "Account created successfully!"
                        })
                    } else {
                        this.setState({
                            usernameError: "user already exist"
                        })
                    }
                })
        }else{
            this.setState({
                passwordError : "password must contain at least 6 characters, english letters and numbers!"
            })
        }
    }

    render() {

        return (
            <div id={"frame"} >
                <div class={"signUpContainer"}>
                    <b id="title">Sign-Up</b>
                    <div class={"midTitle"}>Please, Enter username and password</div>
                    <br/>
                    <input  class = "detailsOfClient"
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <br/>
                    {
                        this.state.usernameError.length > 0 &&
                        <div class={"signUpUsernameError"}>{this.state.usernameError}</div>
                    }
                    <input  class = {"detailsOfClient"}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <br/>
                    {
                        this.state.passwordError.length > 0 &&
                        <div class={"signUpPasswordError"}>{this.state.passwordError}</div>
                    }

                    <br/>
                    <button class={"signUpButton"} onClick={this.signUp}>Create</button>
                    {
                        this.state.response.length > 0  &&
                        <span> {this.state.response} </span>
                    }
                </div>
            </div>
        )
    }
}


export default SignUp;
