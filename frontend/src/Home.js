// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
const jwt = require('jsonwebtoken');

const Home = () => {

  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);  
  const [artistList, setArtistList] = useState([]);  

  let history = useHistory();

  // On load, check if the user is an artist. If he/she is,
  // then route to the "/Home_artist".
  // React.useEffect(() => {
  //   var artist_name;
  //   var response = localStorage.getItem("response");
  //   response = jwt.decode(response);
  //   var id = response.id;
  //   var artist = response.artist;
  //   console.log("id",id);
  //   console.log("artist",artist);
  //   Axios.post("http://localhost:3001/artist_name", {
  //       id: id,
  //     }).then((response) => {
  //       artist_name=response.data[0].artist_name;
  //       var code=response.data.code;
  //       console.log(code)
  //       console.log(artist_name);
  //       if(code===200){
  //         history.push("/home_artist");
  //         localStorage.setItem("artist_name",artist_name)
  //       }
  //     });
  //   },[]
  // )

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

export default Home;