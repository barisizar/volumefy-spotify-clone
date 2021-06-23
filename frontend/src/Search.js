// This is the page where the user is directed after logging in.
import "./styles/home.css";
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
const jwt = require("jsonwebtoken");

const Search = () => {
  
  let history = useHistory();
  
  const [username, setUsername] = useState("");
  const [result, setResult] = useState([]);

  var data;

  // This function is to search the users.
  const searchUser = () => {
    Axios.post("http://localhost:3001/searchUser", {
      username: username,
    }).then((response) => {
      // console.log(response.data);
      if (response.data) {
        // setResult(response.data);
        // console.log(result);
        console.log("response.data")
        console.log(response.data);
        var data = response.data;
        console.log(data);
      }
    });
  };

  // On load, get the token from the local storage and get
  // the usarname from it. Then, create a h2 element with
  // that usarname.
  React.useEffect(() => {
    var response = localStorage.getItem("response");
    // console.log(response);
    response = jwt.decode(response);
    // console.log("yarrak");
    // console.log("yarrak");
    // console.log("yarrak");
    // console.log("yarrak");
    // console.log("yarrak");
    // console.log(response);
    // console.log(response.id);
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

  // This method is to route to the home page.
  const toHome = () => {
    history.push("/Home")
  }

  // This method is to route to the profile page.
  const toProfile = () => {
    history.push("/Profile")
  }

    // This method is to route to the profile page.
    const toSearch = () => {
      history.push("/Search")
    }

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
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton"  onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton">Library</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>SEARCH</h1>
          <input className="input" type="text" onChange={(event) => {setUsername(event.target.value);}}/>
          <button onClick={searchUser}>Search</button>
          {data ? (
            data.map((val, key) => {
              return (
                <div className="employee">
                  <h3>username: {val.username}</h3>
                  <h3>ID: {val.id}</h3>
                </div>
              );
            })
          ) : (
            <h1>userssssssssssssssss</h1>
          )}
        </div>
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
        
    </div>
    </body>
  );
}

export default Search;