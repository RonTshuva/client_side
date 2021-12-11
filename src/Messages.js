import './App.css';
import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import errorCodes from "./ErrorCodes";

class Messages extends React.Component{
    state = {
        listMessages: [],
        responseCheck: "",
        response : ""
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
    markAsSeen = (e)=> {
        axios.get("http://localhost:8989/markAsSeen",{
            params: {
                id : e
            }

        }).then((response) => {
            if(response.data === 1){
                this.setState({
                    responseCheck: "ble bla bla"
                })
            }
        })

    }


    render() {
        return(
            <div>

                {
                    this.state.listMessages.length > 0 &&
                        this.state.listMessages.map(message => {
                            return(
                                <div>
                                    yuval
                                    <div>{message.text}</div>
                                    <button onClick={() => this.markAsSeen(message.id)} disabled={message.read === 1}>Seen</button>
                                    {
                                        this.state.responseCheck.length >0 &&
                                        <div>
                                            {this.state.response}
                                        </div>
                                    }


                                </div>



                            )
                        })
                }
            </div>
        )
    }
}
 export default Messages;