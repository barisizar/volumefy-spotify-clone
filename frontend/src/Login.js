import './login.css';
import volumefy from "./volumefy.png";
// import Main from './Main'
import { useState } from "react";
import Axios from "axios";
import {
  Link
} from "react-router-dom";

// LOGI PAGE
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data)
      const status = response.data.code
    });
  };
  return (
    <div className="Login">
      {/* Name and logo */}
        <div>
            <img src={volumefy} className="logo"/>
            <h1 className="h1text"> VOLUMEFY</h1><hr/>
        </div>
        {/* Inputs */}
        <h2>Welcome back!</h2>
        <h2>User Name</h2>
        <input className="input" type="text" onChange={(event) => {
            setUsername(event.target.value);
          }} />
        <h2>Password</h2>
        <input className="input" type="password" onChange={(event) => {
            setPassword(event.target.value);
          }} /><br/><br/>
        <button onClick={logUser}><Link to="/Main">SIGN IN</Link></button>
    </div>
  );
}

export default Login;