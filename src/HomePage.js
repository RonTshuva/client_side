import * as React from "react";
import {NavLink} from "react-router-dom";

class HomePage extends React.Component{

    state = {
        links : [
            {title:"Massages", path:"/messages"}

        ]
    }


    render() {
        return(
            <div>
                {
                    this.state.links.map(link => {
                        return(
                            <NavLink to={link.path}>
                                <ol>
                                    {link.title}
                                </ol>
                            </NavLink>
                        )
                    })
                }

            </div>
        )
    }

}
export default HomePage;
