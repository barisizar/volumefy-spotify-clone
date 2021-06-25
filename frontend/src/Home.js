// This is the page where the user is directed after logging in.
import './styles/home.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import Axios from "axios";
const jwt = require('jsonwebtoken');



const Home = () => {

  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);  

  let history = useHistory();

  // On load, check if the user is an artist. If he/she is,
  // then route to the "/Home_artist".
  React.useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data)
     })

    userList.map((val, key) => {
      // Can't get the response from the Profile. We need to define it again.
      var response = localStorage.getItem("response");
      response = jwt.decode(response);
      response = response.id;
      // If the id of the user is equal to the response, show user's
      // info in the div "middle".
      if(val.id == response){
        console.log(val.id);
        if(val.artist == 1){
          history.push("/Home_artist");
        }
    }})
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

  // This method is to route to the search page.
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
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton">Library</button>
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

export default Home;