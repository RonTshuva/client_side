import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        response: "",
        checkUsername :false
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
        const startNumber =this.state.username.startsWith("050") || this.state.username.startsWith("052") || this.state.username.startsWith("053")
                            || this.state.username.startsWith("054") ||this.state.username.startsWith("055")
        if(this.state.username.length === 10 && startNumber){
            this.setState({
                checkUsername : true,
                response :"good!"
            })
        }
        else{
            this.setState(({
                response : "Error,Please Enter username valid"
            }))
        }
        if (this.state.checkUsername === true) {
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
                <h6>(The username must to be 10 numbers)</h6>

                    <br/>
                    <button id ="button" onClick={this.signUp}>Create</button>

                {
                    this.state.response.length > 0  &&
                    <div> {this.state.response} </div>
                }


            </div>
        )
    }
}


export default SignUp;