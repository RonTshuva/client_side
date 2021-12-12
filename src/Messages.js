import './App.css';
import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import errorCodes from "./ErrorCodes";

class Messages extends React.Component {
    state = {
        listMessages: [],
        responseCheck: "",
        response: ""
    }

    componentDidMount() {
        this.getReceivedMessages()
    }

    getReceivedMessages = () => {
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

    // This should be before you open the message, when you see only the headline.
    markAsSeen = (e) => {
        axios.get("http://localhost:8989/markAsSeen", {
            params: {
                id: e
            }

        }).then((response) => {
            if (response.data === 1) {
                this.setState({
                    responseCheck: "ble bla bla"
                })
            }
        })

    }
    //when you click on headline it calls showMessage to show full message:
    showMessage = (message) => {
        return (
            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                <i style={{fontSize: "12px"}}>
                    {message.getFrom}
                </i>
                <i style={{fontSize: "12px"}}>
                    {message.getDateSent}
                </i>
                <p style={{fontSize: "8px"}}>
                    {message.getHeadline}
                </p>
                <p style={{fontSize: "8px"}}>
                    {message.getContent}
                </p>
                //if you want to mark as seen instead of opening the full message
                <button style={{fontSize: "5px"}} onClick={() => this.deleteMessage(message.id)}>
                    Delete
                </button>
            </div>
    }

    // we need to show only headline, and when press headline it will show the full message.
    // How do i set it so if i click once it show message and press again the message become only headline again?
    render() {
        return (
            <div>
                {
                    this.state.listMessages.map(message => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}
                                 onClick={() => this.showMessage(this.message)}>
                                <i style={{fontSize: "12px"}}>
                                    {message.getFrom}
                                </i>
                                <i style={{fontSize: "12px"}} onClick={() => this.showMessage(this.message)}>
                                    {message.getHeadline}
                                </i>
                                <button onClick={() => this.markAsSeen(message.getId)}>
                                    Mark as seen V
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Messages;