// This is the page where the user is directed after logging in.
import './styles/profile.css';
import volumefy from "./images/volumefy.png";
import { Link, useHistory } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import {useState} from "react";
const jwt = require('jsonwebtoken');

const Profile = () => {
  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);
  
  let history = useHistory();

  // On load, get the token from the local storage and get
  // the usarname from it. Then, create a h2 element with
  // that usarname.
  React.useEffect(() => {
    var response = localStorage.getItem("response");
    response = jwt.decode(response);
    response = response.username;
    let h_element = React.createElement("h1", null, "- Hello, ", response, "!");
    ReactDOM.render(h_element, document.getElementById("upper"));

    // Send a get request to the database. 
    Axios.get("http://localhost:3001/users").then((response2) => {
        setUserList(response2.data)
    })
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
        {/* Navigation buttons */}
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton">Search</button><br/><br/>
          <button className="libraryButton">Library</button>
        </div>
        {/* Profile info */}
        {userList.map((val, key) => {
          // Can't get the response from the Profile. We need to define it again.
          var response = localStorage.getItem("response");
          response = jwt.decode(response);
          response = response.username;
          // If the usarname of the user is equal to the response, show user's
          // info in the div "middle".
          if(val.username == response){
          return <div className="middle_h"> 
            <h3 className="userInfo">username: {val.username}</h3>             <button className="editButton">edit</button><br/>
            <h3 className="userInfo">email: {val.email}</h3>                   <button className="editButton">edit</button><br/>
            <h3 className="userInfo">gender: {val.gender}</h3>                 <button className="editButton">edit</button><br/>
            <h3 className="userInfo">age: {val.age}</h3>                       <button className="editButton">edit</button><br/>
            <h3 className="userInfo">country: {val.country}</h3>               <button className="editButton">edit</button><br/>
            <h3 className="userInfo">phone number: {val.phone_number}</h3>     <button className="editButton">edit</button><br/>
            <h3 className="userInfo">artist: {val.artist}</h3>                 <button className="editButton">edit</button><br/>
          </div>
        }})}
        {/* Friends */}
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
        
    </div>
    </body>
  );
}

export default Profile;