// Importing the necessary libraries.
import './styles/login.css';
import volumefy from "./images/volumefy.png";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

// LOGIN PAGE
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  React.useEffect(() => {
    if(localStorage.getItem("response")){
      history.push("/Home");
    };
  })

  // This method post a request to the /login, which will
  // activate the loginUser function inside the controller.
  // That method will return a code and on success, it'll be 200.
  // In that case, it'll be directed to the "/main".
  const logUser = (e) => {
    var status;
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      status = response.data.code;
      localStorage.setItem("response", response.data.accessToken);
      if(status === 200){
        history.push("/home");
      }
    });
  };

  return (
    <div id="test" className="Login">
      {/* Name and logo */}
        <div>
            <img src={volumefy} className="logo"/>
            <h1 className="h1text"> VOLUMEFY</h1><hr/>
        </div>
        {/* Inputs */}
        <h2>Welcome back!</h2>
        {/* Get the username */}
        <h2>User Name</h2>
        <input className="input" type="text" onChange={(event) => {
            setUsername(event.target.value);
        }}/>
        {/* Get the password */}
        <h2>Password</h2>
        <input className="input" type="password" onChange={(event) => {
            setPassword(event.target.value);
        }} /><br/><br/>
        {/* Login */}
        <button onClick={logUser}>SIGN IN</button>
    </div>
  );
}

export default Login;