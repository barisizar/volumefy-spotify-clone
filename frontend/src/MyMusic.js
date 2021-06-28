// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";
const jwt = require('jsonwebtoken');


const MyMusic = () => {
  
  const [albumList, setAlbumList] = useState([]);

  let history = useHistory();

  React.useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaat");
    Axios.get("http://localhost:3001/albums").then((res) => {
      setAlbumList(res.data)
      console.log(albumList)
     })
  },[])

  // This method is to delete the access token from the local storage
  // and route back to the "/".
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // This method is to route to the home page.
  const toHome = () => {
    history.push("/Home_artist")
  }

  // This method is to route to the profile page.
  const toProfile = () => {
    history.push("/Profile_artist")
  }

  // This method is to route to the search page.
  const toSearch = () => {
    history.push("/Search_artist")
  }

  const toCreateAlbumSingle = (id) => {
    history.push("/CreateAlbumSingle")
  }

  const toCreateSong = () => {
    history.push("/CreateSong")
  }

  const toMyUpload = () => {
    history.push("/MyUpload")
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
          <button className="libraryButton">Library</button><br/><br/>
          <button className="mymusicButton">My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1 className="myMusic">My Music</h1>
          <button className="createAlbum" onClick={toCreateAlbumSingle}>CREATE ALBUM</button><br /><br />

          {albumList.map((val, key) => {
          // Can't get the response from the Profile. We need to define it again.
          var response = localStorage.getItem("artist_name");
          // If the id of the user is equal to the response, show user's
          // info in the div "middle".
          if(val.artist_name == response){
            console.log(val.album_name)
          return <div className="middle_album"> 
            <img className="albumCover" src={val.img_src} alt="Italian Trulli"></img><br />
            <button className="albumButton">{val.album_name}</button>   
            <h4>{val.year}</h4>          
          </div>
          }})}
          
        </div>
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

export default MyMusic;