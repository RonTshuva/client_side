import './App.css';
import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import errorCodes from "./ErrorCodes";

class MessagesPage extends React.Component {
    state = {
        listMessages: [],
        responseCheckDelete: "",
        response: "",
        refresh : true
    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/getReceivedMessages", {
            params: {
                token: cookies.get("logged_in")
            }
        }).then((response) => {
            if (response.data && response.data.length > 0) {
                this.setState({
                    listMessages: response.data
                })
            } else {
                this.setState({
                    response: "You don't have any messages"
                })
            }
        })

    }

    deleteMessage = (e) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/delete-message",{
            params:{
                id : e,
                token: cookies.get("logged_in")
            }
        }).then((response) => {
            if(response.data && response.data === true){
                this.setState({
                    responseCheckDelete: "The message has been deleted"
                })
            }
        })
    }

    // This should be before you open the message, when you see only the headline.
    markAsSeen = (e) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/markAsSeen", {
            params: {
                id: e,
                token: cookies.get("logged_in")
            }

        }).then((response) => {
            if (response.data === 1) {
                this.setState({
                    responseCheck: "The value has been updated to 1 "
                })
            }
        })

    }

    changeShowState = (message) => {
        message.show = !message.show;

        this.setState({refresh : true}) // we need to change the state so it will rerender the page
    }


    //when you click on headline it calls showMessage to show full message:
    showMessage = (message) => {
        return (
            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                <i style={{fontSize: "12px"}}>
                    {message.content}
                </i>
                <button style={{fontSize: "5px"}} onClick={() => this.deleteMessage(message.id)}>
                    Delete
                </button>
            </div>
        )
    }

    // we need to show only headline, and when press headline it will show the full message.
    // How do i set it so if i click once it show message and press again the message become only headline again?
    render() {
        return (
            <div>
                {
                    this.state.listMessages.map(message => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                                <i style={{fontSize: "12px"}} onClick={() => this.changeShowState(message)}>
                                   From: {message.from} <br/>
                                    Title: {message.headline} <br/>
                                    {message.dateSent} <br/>
                                    show : {message.show + ""}
                                    {
                                        message.show &&
                                            this.showMessage(message)
                                    }
                                </i>
                                <br/>
                                <button onClick={() => this.markAsSeen(message.id)} disabled={message.read === 1}>
                                    Seen
                                </button>
                            </div>
                        )
                    })
                }
                {
                    this.state.responseCheckDelete.length < 0 &&
                    <div>{this.state.responseCheckDelete}</div>
                }
            </div>
        )
    }
}

export default MessagesPage;