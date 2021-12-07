import logo from './logo.svg';
import './App.css';
import * as React from "react";
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import { BrowserRouter ,Routes, Route} from 'react-router-dom';

class App extends React.Component{


  state = {

  }


  render() {
    return(
        <div>
          RRY = 'Ron - Ronen - Yuval'
          <BrowserRouter>
            {
                <div>
                  <Routes>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/sign-up"} element={<SignUp/>}/>
                  </Routes>
                </div>
            }
          </BrowserRouter>

        </div>
    )
  }
}

export default App;
