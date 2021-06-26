// This is the page where the user is directed after logging in.
import '../styles/home.css';
import volumefy from "../images/volumefy.png";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Axios from "axios";
import {useState} from "react";

const jwt = require('jsonwebtoken');

const Gender = () => {
  // We'll store all the users in the database inside this list.
  const [userList, setUserList] = useState([]);

  // useState for new gender.
  const [newGender, setNewGender] = useState("");

  
  let history = useHistory();

  // On load, get the token from the local storage and get
  // the id from it.
  React.useEffect(() => {
    // var response = localStorage.getItem("response");
    // response = jwt.decode(response);
    // response = response.id;
    // console.log(response);

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

  // This method is to route to the search page.
  const toSearch = () => {
    history.push("/Search")
  }

  const editGender = (id) => {
    Axios.put("http://localhost:3001/editGender", { gender: newGender, id: id })
    history.push("/Profile")
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
        {/* Navigation buttons */}
        <div id = "left" className = "left">
          <br />
          <button className="homeButton" onClick={toHome}>Home</button><br/><br/>
          <button className="profileButton" onClick={toProfile}>Profile</button><br/><br/>
          <button className="searchButton" onClick={toSearch}>Search</button><br/><br/>
          <button className="libraryButton">Library</button>
        </div>
        {userList.map((val, key) => {
          // Can't get the response from the Profile. We need to define it again.
          var response = localStorage.getItem("response");
          response = jwt.decode(response);
          response = response.id;
          // If the id of the user is equal to the response, show user's
          // info in the div "middle".
          if(val.id == response){
          return <div className="middle"> 
              <h1>Gender</h1>
              <input type="text" placeholder="Enter the gender" onChange={(event) => {setNewGender(event.target.value);}}/><br /><br />
              <button onClick={() => {editGender(val.id);}}>{" "}Update</button>
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

export default Gender;