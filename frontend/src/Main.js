// This is the page where the user is directed after logging in.
import './main.css';
import volumefy from "./volumefy.png";
import { Link, useHistory } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom";
const jwt = require('jsonwebtoken');

const Main = () => {
  
  let history = useHistory();

  // On load, get the token from the local storage and get
  // the usarname from it. Then, create a h2 element with
  // that usarname.
  React.useEffect(() => {
    var response = localStorage.getItem("response");
    console.log(response);
    response = jwt.decode(response);
    response = response.username;
    let h_element = React.createElement("h1", null, "- Hello, ", response, "!");
    ReactDOM.render(h_element, document.getElementById("upper"));
  })

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <body class="bMain">
    <div className="Main" >
      {/* Name and logo */}
        <div id = "header" className = "header">
            <img src={volumefy} className="logo2"/>
            <h1 className="vol"> VOLUMEFY</h1>
            <div id = "upper" className = "upper"></div>
            <button className="logout" onClick={logOut}>SIGN Out</button>
            <hr/>
        </div>
        <div id = "left" className = "left">
          <br />
          <button className="leftButton">Profile</button><br/><br/>
          <button className="leftButton">Search</button><br/><br/>
          <button className="leftButton">Library</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>SONGS</h1>
        </div>
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
        
    </div>
    </body>
  );
}

export default Main;