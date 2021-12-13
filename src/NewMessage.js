import './App.css';
import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import errorCodes from "./ErrorCodes";

class NewMessage extends React.Component{

    state ={
        to: "",
        headline:"",
        content:"",
        usernameExists : false,
        usernameColor : "black",
        response : ""
    }

    onUsernameChange = (e) => {
        this.setState({
            to : e.target.value
        })
    }
    onHeadlineChange =(e) =>{
        this.setState({
            headline : e.target.value
        })

    }
    onContentChange = (e) => {
        this.setState({
            content : e.target.value
        })

    }

    checkUsernameExist = () => {
        axios.get("http://localhost:8989/usernameExist",{
            params:{
                username : this.state.to
            }
        }).then((response) =>{

            this.setState({
                usernameExists : response.data.success,
                usernameColor : response.data.success ? "green" : "red",
                response : response.data.success ? "" : "didn't found username!"
            })

        })
    }
    sendMessage = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/sendMessage",{
            params:{
                token : cookies.get("logged_in"),
                to : this.state.to,
                headline : this.state.headline,
                content : this.state.content
            }
        }).then((response) =>{
            if(response.data.success) {
                this.setState({
                    response : "message send!"
                })
            }

        })
    }


    render(){
        const validMessage = (this.state.content.length > 1 &&
            this.state.headline.length > 1 && this.state.usernameExists)

        return(
            <div id="frame" class={"container"}>
                <b id="title">New Message:</b>
                <br/> <br/>
                To :
                <input class={"detailsOfClient"}
                       placeholder={"Enter username"}
                       style={{color : this.state.usernameColor}}
                       onBlur={this.checkUsernameExist}
                       onChange={this.onUsernameChange}
                       value={this.to}/>
                <br/>
                Title:
                <input class={"detailsOfClient"}
                       placeholder={"Enter Title"}
                       onBlur={this.checkUsernameExist}
                       onChange={this.onHeadlineChange}
                       value={this.headline}/>
                       <div> {this.state.response.length > 0 && this.state.response}</div>

                <i>body:</i>
                <br/>
                <textarea class={"detailsOfClient"}
                          placeholder={"Enter text here"}
                          onChange={this.onContentChange}
                          onBlur={this.checkUsernameExist}
                          value={this.content}/> <br/>
                <button id ={"button"}style={{backgroundColor: "#61dafb"}}onClick={this.sendMessage}
                disabled={!validMessage}>Sent</button>
                <NavLink to={"/"}>
                    <button id={"button"} style={{backgroundColor: "red"}} >
                        Back
                    </button><br/>
                </NavLink>
            </div>
        )
    }


}


export default NewMessage;
