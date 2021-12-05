import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        response: "",
        responseColor : "black"
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
                            response: "You are hara"
                        })
                    } else {
                        this.setState({
                            response: "user already exist"
                        })
                    }
                })
        }else{
            this.setState({
                response : "password must contain at least 6 characters, english letters and numbers!",
                responseColor: "red"
            })

        }
    }


    render() {

        return (
            <div>
                <div>Please, Enter username and password</div>
                <input class = "detailsOfClient"
                       onChange={this.onUsernameChange}
                       value={this.state.username}
                       placeholder={"Enter username"}
                />
                <br/>
                <input class = "detailsOfClient"
                       onChange={this.onPasswordChange}
                       value={this.state.password}
                       placeholder={"Enter password"}
                />

                <br/>
                <button id ="button" onClick={this.signUp}>Create</button>

                {
                    this.state.response.length > 0  &&
                    <div style={{color : this.state.responseColor }}> {this.state.response} </div>
                }

            </div>
        )
    }
}


export default SignUp;
