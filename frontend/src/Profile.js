// This is the page where the user is directed after logging in.
import './styles/profile.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
import AudioPlayer from "react-h5-audio-player";
const jwt = require('jsonwebtoken');

const Profile = () => {
  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);
  
  let history = useHistory();

  React.useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data)
     })

     console.log("userList",userList);
    
    // Map around the database and find the user with the relevant id.
    userList.map((val, key) => {
      var response = localStorage.getItem("response");
      // response = jwt.decode(response);
      response = response.id;
      // If the id of the user is equal to the response, show user's
      // info in the div "middle".
      if(val.id == response){
        console.log(val.id);
        if(val.artist == 1){
          history.push("/Profile_artist");
        }
    }})
  },[])

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
          console.log("response",response);
          // response = response.id;
          // console.log("profile'dayım response.id:", response)
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
            <h3 className="userInfo">Want to be an artist?</h3>          <button className="artistButton" onClick={toArtist}>BECOME ONE!</button><br/>
          </div>
        }})}
        {/* Friends */}
        <div id = "right" className = "right">
          <h2>Friends</h2>
        </div>
        <div className ="buttom">
        <AudioPlayer
              // src="https://drive.google.com/file/d/1-6TgFFkkBkja4-ucvHadrTucep4_UfKC/view?usp=sharing"
              src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
              // src="../public/Used.mp3"
              // src={music}
              onPlay={e => console.log("onPlay")}
              // other props here
        />
        </div>
        
    </div>
    </body>
  );
}

export default Profile;