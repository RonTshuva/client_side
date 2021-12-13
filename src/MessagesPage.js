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
        responseCheck: "",
        response: "",
        refresh : true
    }

    componentDidMount() {
        this.getReceivedMessages()
    }

    getReceivedMessages = () =>{
        console.log("here")
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
            }
        })
    }

    deleteMessage = (id) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/delete-message",{
            params:{
                id : id,
                token: cookies.get("logged_in")
            }
        }).then((response) => {
            if(response.data.success){
                this.setState({
                    responseCheck: "The message has been deleted!"
                })
                this.getReceivedMessages()
            }
        })
    }

    // This should be before you open the message, when you see only the headline.
    markAsSeen = (id) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/markAsSeen", {
            params: {
                id: id,
                token: cookies.get("logged_in")
            }

        }).then((response) => {
            if (response.data.success) {
                this.setState({
                    responseCheck: "Marked as read successfully!"
                })
                this.getReceivedMessages()
            }else{
                this.setState({responseCheck : "failed to get messages!"})
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
                </i><br/><br/>
                <button id={"button"} style={{backgroundColor: "darkblue"}} onClick={() => this.deleteMessage(message.id)}>
                    Delete
                </button>
            </div>
        )
    }

    mapMessagesList = () => {
        const listMessagesMapped = this.state.listMessages.map(message => {
            return (
                <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                    <i style={{fontSize: "12px"}} >
                        From: {message.from} <br/>
                        <b onClick={() => this.changeShowState(message)} > Title: {message.headline} (click to reveal message) </b> <br/>
                        {message.dateSent} <br/>
                        {
                            message.show &&
                                this.showMessage(message)
                        }
                    </i>
                    <br/>
                    <button id={"button"} style={{backgroundColor: "green"}} onClick={() => this.markAsSeen(message.id)} disabled={message.read}>
                        Seen
                    </button>
                    { !message.read && <b>unread!</b>}
                </div>
            )
        })
        return listMessagesMapped;
    }

    // we need to show only headline, and when press headline it will show the full message.
    // How do i set it so if i click once it show message and press again the message become only headline again?
    render() {
        return (
            <div>
                {

                    this.state.listMessages.length > 0 ?
                        <div>{this.mapMessagesList()}</div>
                        :
                        <div> you dont have any messages</div>

                }
                <NavLink to={"/"}>
                    <button id={"button"} style={{backgroundColor: "red"}} >
                        Back
                    </button><br/>
                </NavLink>
                {
                    this.state.responseCheck.length > 0 &&
                        <div>{this.state.responseCheck}</div>
                }
            </div>
        )
    }
}

export default MessagesPage;
