import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
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

    signUp = () => {
        axios.get("http://localhost:8989/create-account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        response:"You are hara"
                    })
                } else {
                    this.setState({
                        response: "user already exist"
                    })
                }
            })
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
                <h6>(The password must be at least 4 characters long! )</h6>
                <NavLink to={"/login"}>
                    <br/>
                    <button id ="button" onClick={this.signUp}>Create</button>
                </NavLink>
                {
                    this.state.response.length > 0  &&
                    <div> {this.state.response} </div>
                }


            </div>
        )
    }
}


export default SignUp;