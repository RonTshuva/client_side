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
        content:""
    }

    onUsernameChange = () => {

    }
    onHeadlineChange =() =>{

    }
    onContentChange = () => {

    }
    sendMessage = () => {

    }


    render(){
        return(
            <div id="frame" class={"container"}>
                <i id="title">New Message:</i>
                <br/> <br/>
                To :
                <input class={"detailsOfClient"}
                   placeholder={"Enter username"}
                   onChange={this.onUsernameChange}
                   value={this.to}/>
                <br/>
                Title:
                <input class={"detailsOfClient"}
                      placeholder={"Enter Title"}
                      onChange={this.onHeadlineChange}
                      value={this.headline}/>
                <br/> <br/>
                <i>body:</i>
                <br/>
                <textarea class={"detailsOfClient"}
                  placeholder={"Enter text here"}
                  onChange={this.onContentChange}
                  value={this.content}/> <br/>
                <button id ={"button"}style={{backgroundColor: "#61dafb"}}onClick={this.sendMessage}>Sent</button>

            </div>
        )
    }


}


export default NewMessage;
