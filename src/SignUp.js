import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        responseServer : "",
        passwordError: "",
        usernameError : "",
        responseColor : "black"
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

    checkUsername = () =>{
        let checkUsername = false
        const startNumber = ["050","052","053","054","055"]
        const startNumberFilter = startNumber.filter((number) => {
            return(

                this.state.username.startsWith(number)
            )
        })
        if(startNumberFilter.length > 0 && this.state.username.length === 10) {
            this.setState({usernameError : ""})
            checkUsername = true
        }
        else{
            this.setState(({
                usernameError : "Error,Please Enter username valid"
            }))
        }
        return checkUsername
    }

    strongPasswordCheck = () =>{
        // it is better to make a method here and not update the state.
        // hard to explain but when i try to update the state and check the state variable it has a delay and can cause bugs and give the user a false positive feed back (as if his password is weak although it isn't)
        const englishChar = /[a-zA-Z]/.test(this.state.password);
        const numbers = /[0-9]/.test(this.state.password);
        const strongLength = this.state.password.length >= 6;
        if(!(numbers && englishChar && strongLength)){
            this.setState({
                passwordError : "password must contain at least 6 characters, english letters and numbers!",
                responseColor: "red"
            })
        }
        else{
            this.setState({passwordError: ""}); // reset response
        }
        return numbers && englishChar && strongLength;
    }

    signUp = () => {
        const success1 = this.checkUsername()
        const success2 = this.strongPasswordCheck()
        if (success1 && success2) {
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            responseServer: "You signed up!"
                        })
                    } else {
                        this.setState({
                            responseServer: "user already exist"
                        })
                    }
                })
        }
    }

    render() {

        return (
            <div id="frame" class={"container"}>
                <b id="title">Sign-Up Page</b>
                <br/>
                <div>Please, Enter username and password</div>
                <b> Username:</b>
                <br/>
                <input class = "detailsOfClient"
                       onChange={this.onUsernameChange}
                       value={this.state.username}
                       placeholder={"Enter username"}
                />
                <br/>
                {
                    this.state.usernameError.length > 0  &&
                    <div style={{color : this.state.responseColor }}> {this.state.usernameError} </div>
                }
                <b>Password:</b>
                <br/>
                <input class = "detailsOfClient"
                       onChange={this.onPasswordChange}
                       value={this.state.password}
                       placeholder={"Enter password"}
                />
                <br/>
                {
                    this.state.passwordError.length > 0  &&
                    <div style={{color : this.state.responseColor }}> {this.state.passwordError} </div>
                }
                <br/>
                <NavLink to={"/login"}>
                    <button id="button" style={{backgroundColor: "darkblue"}}>Back</button>
                </NavLink>

                <button id ="button" style={{backgroundColor: "green"}} onClick={this.signUp}>Create</button>
                {
                    this.state.responseServer.length > 0 &&
                        <div>{this.state.responseServer}</div>
                }

            </div>
        )
    }
}


export default SignUp;
