// This is the page where the user is directed after logging in.
import './styles/profile.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";
import AudioPlayer from "react-h5-audio-player";

const Friend_info = () => {
  // We'll store all the users in the database inside this list.
  const [user, setUser] = useState("");
  let history = useHistory();

  React.useEffect(() => {
    var user_id = localStorage.getItem("friend_id");
      if(localStorage.getItem("artist")){
        history.push("/Friend_info_artist")
      }
      Axios.post("http://localhost:3001/user", {
        user_id: user_id,
      }).then((res) => {
        // console.log("res",res);
        // console.log("res.data",res.data);
        setUser(res.data[0]);
        // console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",user.user_id);
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

  const toFriend = () => {
    history.push("/Friend")
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
        
        <div className="middle_h"> 
          <h3 className="userInfo">user ID: {user.user_id}</h3> <br /><br />     
          <h3 className="userInfo">username: {user.username}</h3><br /><br />
          <h3 className="userInfo">Liked songs: </h3>

        </div>
        {/* Friends */}
        <div id = "right" className = "right">
        <button className="friendButton" onClick={toFriend}>Friends</button><br/><br/>
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

export default Friend_info;