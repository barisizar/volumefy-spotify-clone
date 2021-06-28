// This is the page where the user is directed after logging in.
import './styles/home.css';
import './styles/MusicPlayer.css';
import volumefy from "./images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import {useState} from "react";
import Axios from "axios";

const CreateSong = () => {
  
  const[id_song, setId_song] = useState("");
  const [song_name, setSong_name] = useState("");
  const [album_name, setAlbum_name] = useState("");
  const [artist_name, setArtist_name] = useState("");
  const [id_artist, setId_artist] = useState("");
  const [song_src, setSong_src] = useState("");

  let history = useHistory();

  React.useEffect(() => {
    var album_name = localStorage.getItem("album_name");
    var artist_name = localStorage.getItem("artist_name");

    // response = jwt.decode(response);
    // response = response.id;
    // console.log(response);
    // setId_artist(response);
    setAlbum_name(album_name);
    setId_artist(id_artist)
    setArtist_name(artist_name)
  })

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

  // This method is to route to the my music page.
  const toMyMusic = () => {
    history.push("/MyMusic")
  }

  const addSong = (event) => {

    if(!song_name || !song_src){
        event.preventDefault();
    }
  
    // Add elements to the database.
    else{
      Axios.post("http://localhost:3001/createSong", {
        song_name: song_name,
        album_name: album_name,
        artist_name: artist_name,
        song_src: song_src
      }).then((response) => {
        console.log(response);
        history.push("/CreateSong")
      }
      )}
  };

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
          <button className="mymusicButton" onClick={toMyMusic}>My Music</button>
        </div>
        <div id = "middle" className = "middle">
          <h1>CREATE SONG</h1>
          <input type="text" placeholder="Enter the song name" onChange={(event) => {setSong_name(event.target.value);}}/><br /><br />
          <input type="text" placeholder="Enter the music source" onChange={(event) => {setSong_src(event.target.value);}}/><br /><br />
          <button onClick={() => {addSong();}}>{" "}Create</button><br /><br />
          <button onClick={toMyMusic}>DONE</button>
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

export default CreateSong;