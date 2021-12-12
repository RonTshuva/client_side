import logo from './logo.svg';
import './App.css';
import * as React from "react";
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import MessagesPage from "./MessagesPage";
import NewMessage from "./NewMessage";
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Cookies from "universal-cookie/lib";
import axios from "axios";
import errorCodes from "./ErrorCodes";


class App extends React.Component{


  state = {
        isLoggedIn : false
  }

  validateToken = (token) => { // this method will check if the token is valid and we are not trying to skip the login page with an invalid token!
      axios.get("http://localhost:8989/validateToken", {
          params: {
              token : token
          }
      }).then((response) => {
          this.setState({isLoggedIn: response.data.success});
      })
  }

  componentDidMount() {
      const cookies = new Cookies();
      this.validateToken(cookies.get("logged_in"));
  }

    render() {
    return(
        <div>
          <BrowserRouter>
            {
                <div>
                      {
                          this.state.isLoggedIn ?
                              <div>
                                  <Routes>
                                      <Route path={"/login"} element={<HomePage/>}/>
                                      <Route path={"/sign-up"} element={<HomePage/>}/>
                                      <Route path={"/messagesPage"} element={<MessagesPage/>}/>
                                      <Route path={"/newMessage"} element={<NewMessage/>}/>
                                  </Routes>

                              </div>
                                :
                              <div>
                                  <Routes>
                                      <Route path={"/login"} element={<LoginPage/>}/>
                                      <Route path={"/sign-up"} element={<SignUp/>}/>
                                  </Routes>

                              </div>
                      }
                </div>
            }
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
