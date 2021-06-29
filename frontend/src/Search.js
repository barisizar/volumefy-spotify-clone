// This is the page where the user is directed after logging in.
import "./styles/home.css";
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
const jwt = require("jsonwebtoken");

const Search = () => {
  
  let history = useHistory();
  
  const [song_name, setSong_name] = useState("");
  const [result, setResult] = useState([]);

  const [source, setSource] = useState("");

  // This function is to search the tracks.
  const searchTrack = () => {
    Axios.post("http://localhost:3001/searchTrack", {
      song_name: song_name,
    }).then((response) => {
      if (response.data) {
        setResult(response.data);
      }
    });
  };

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

  const toFriend = () => {
    history.push("/Friend")
  }

  const changeSong = (param) => {
    setSource(param)
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
          {/* Search results */}
          <input className="input" type="text" onChange={(event) => {setSong_name(event.target.value);}}/>
          <button className="searchButton2" onClick={searchTrack}></button><br />
          <h4 className="songInfoLeft">Song</h4><h4 className="songInfoMiddle">Album</h4><h4 className="songInfoRight">Artist</h4>
          {result.map((val, key) => {
              return (
                <div className="tracks">
                  <button className ="track" onClick={() => setSource(val.song_src)}>{val.song_name}</button>
                  {/* <button className ="track" onClick={() => setSource(val.song_src)}>{val.album_name}</button>
                  <button className ="track" onClick={() => setSource(val.song_src)}>{val.artist_name}</button> */}
                </div>
              );
            })
          }
        </div>
        <div id = "right" className = "right">
        <button className="friendButton" onClick={toFriend}>Friends</button><br/><br/>
        </div>
        <div className ="buttom">
        <AudioPlayer
              src={source}
              onPlay={e => console.log("onPlay")}
        />
        </div>
        
    </div>
    </body>
  );
}

export default Search;