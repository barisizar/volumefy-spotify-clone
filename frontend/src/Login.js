// Importing the necessary libraries.
import './styles/login.css';
import volumefy from "./images/volumefy.png";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const jwt = require('jsonwebtoken');


// LOGIN PAGE
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [artist_name, setArtist_name] = useState("");

  let history = useHistory();

  React.useEffect(() => {
    if(localStorage.getItem("response")){
      history.push("/Home");
    };
  })

  // This method post a request to the /login, which will
  // activate the loginUser function inside the controller.
  // That method will return a token on success, which contains
  // a status code (200 on success) and the user info. 
  const logUser = (e) => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      // Code is the return status, id is the user id and artist indicates
      // if the user is also an artist or not.
      var code = response.data.code;
      var response = jwt.decode(response.data.accessToken)
      console.log("response",response);
      var id = response.id;
      var artist = response.artist;
      // console.log("code",code)
      // console.log("id",id);
      // console.log("artist",artist);
     
      // If the code is 200, login.
      if(code === 200){
        // If the user is an artist go to "/home_artist"
        if(artist === 1){
          // Find the artist_name using the user id. ( AMK ARTIST_NAME_INI ALAMIYORUMMMMMMMMMM)
          // Axios.post("http://localhost:3001/artist_name", {
          //   id: response.id,
          // }).then((response) => {
          //   console.log("response (artist_name)" ,response)
          //   if (response.data) {
          //     console.log("response.data[0].artist_name (artist_name)",response.data[0].artist_name)
          //     setArtist_name(response.data[0].artist_name);
          //     console.log("artist_name",artist_name)
          //     localStorage.setItem("artist_name", artist_name)
          //   }
          // });
          
          localStorage.setItem("response", response.id);
          console.log("response",response)
          history.push("/home_artist");
        }
        // If not, go to "/home"
        else{
          localStorage.setItem("response", response.id);
          console.log("response",response)
          history.push("/home");
        }
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