import * as React from "react";
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class HomePage extends React.Component{

    state = {
        links : [
            {title:"Massages", path:"/messages"}

        ]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }


    render() {
        return(
            <div>
                <div>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path}>
                                    <ol>
                                        {link.title}
                                    </ol>
                                </NavLink>
                            )
                        })
                    }
                 </div>

                    <div>
                        <br/>
                        <button onClick={this.logout}>
                        Logout
                        </button>
                    </div>
            </div>
        )
    }

}
export default HomePage;
