// This is the page where the user is directed after logging in.
import "./styles/home.css";
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
const jwt = require("jsonwebtoken");

const Search_artist = () => {
  
  let history = useHistory();
  
  const [song_name, setSong_name] = useState("");
  const [result, setResult] = useState([]);

  const [source, setSource] = useState("");

  // // This function is to search the users.
  // const searchUser = () => {
  //   Axios.post("http://localhost:3001/searchUser", {
  //     username: username,
  //   }).then((response) => {
  //     // console.log(response.data);
  //     if (response.data) {
  //       setResult(response.data);
  //       console.log(result);
  //       console.log(response.data);
  //     }
  //   });
  // };

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

  // This method is to route to the my music page.
  const toMyMusic = () => {
    history.push("/MyMusic")
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
          <button className="libraryButton">Library</button><br/><br/>
          <button className="mymusicButton" onClick={toMyMusic}>My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>SEARCH</h1>
          {/* Search results */}
          <input className="input" type="text" onChange={(event) => {setSong_name(event.target.value);}}/>
          <button onClick={searchTrack}>Search</button>
          {result.map((val, key) => {
              return (
                <div className="users">
                  <button onClick={() => setSource(val.song_src)}>{val.song_name}</button>
                </div>
              );
            })
          }
        </div>
        <div id = "right" className = "right">
          <h2>Friends</h2>
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

export default Search_artist;