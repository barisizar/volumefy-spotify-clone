// This is the page where the user is directed after logging in.
import './styles/profile.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
const jwt = require('jsonwebtoken');

const Profile = () => {
  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);
  
  let history = useHistory();

  // Send a get request to the database on load. 
  React.useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
        setUserList(response.data)
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

  // This method is to route to the search page.
  const toSearch = () => {
    history.push("/Search")
  }

  const toGender = () => {
    history.push("/Gender")
  }

  const toAge = () => {
    history.push("/Age")
  }

  const toCountry = () => {
    history.push("/Country")
  }

  const toPhone = () => {
    history.push("/Phone")
  }

  const toArtist = () => {
    history.push("/Artist");
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
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton">Library</button>
        </div>
        {/* Profile info */}
        {userList.map((val, key) => {
          // Can't get the response from the Profile. We need to define it again.
          var response = localStorage.getItem("response");
          response = jwt.decode(response);
          response = response.id;
          // If the id of the user is equal to the response, show user's
          // info in the div "middle".
          if(val.id == response){
          return <div className="middle_h"> 
            <h3 className="userInfo">username: {val.username}</h3>       <button className="editButton">edit</button><br/>
            <h3 className="userInfo">email: {val.email}</h3>             <button className="editButton">edit</button><br/>
            <h3 className="userInfo">gender: {val.gender}</h3>           <button className="editButton" onClick={toGender}>edit</button><br/>
            <h3 className="userInfo">age: {val.age}</h3>                 <button className="editButton" onClick={toAge}>edit</button><br/>
            <h3 className="userInfo">country: {val.country}</h3>         <button className="editButton" onClick={toCountry}>edit</button><br/>
            <h3 className="userInfo">phone number: {val.phone}</h3>      <button className="editButton" onClick={toPhone}>edit</button><br/>
            <h3 className="userInfo">artist: {val.artist}</h3>           <button className="editButton" onClick={toArtist}>edit</button><br/>
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