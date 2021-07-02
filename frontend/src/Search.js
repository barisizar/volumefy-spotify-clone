import "./styles/home.css";
import volumefy from "./images/volumefy.png";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
const jwt = require("jsonwebtoken");

const Search = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = () => {
    Axios.post("http://localhost:3001/searchUser", {
      username: username,
    }).then((response) => {
      // console.log(response.data);
      if (response.data) {
        console.log(response.data);
        // const data = JSON.stringify(response.data);
        // console.log(data);
        setResult(response.data);
        console.log(result);
      }
    });
  };
  // const searchUser = (e) => {
  //   Axios.get("http://localhost:3001/users", {}).then((response) => {
  //     // console.log(response.data);
  //     if (response.data) {
  //       // console.log(response.data);
  //       // const data = JSON.stringify(response.data);
  //       // console.log(data);
  //       setResult(response.data);
  //       console.log(result);
  //     }
  //   });
  // };
  return (
    <body class="bMain">
      <div className="Main">
        {/* Name and logo */}
        <div id="header" className="header">
          <img src={volumefy} className="logo2" />
          <h1 className="vol"> VOLUMEFY</h1>
          <div id="upper" className="upper"></div>
          <hr />
        </div>
        <div id="left" className="left">
          <br />
          <button className="homeButton">Home</button>
          <br />
          <br />
          <button className="profileButton">Profile</button>
          <br />
          <br />
          <button className="searchButton">Search</button>
          <br />
          <br />
          <button className="libraryButton">Library</button>
          <br />
          <br />
          <button className="mymusicButton">My Music</button>
        </div>
        <div id="middle" className="middle">
          <h1>Search</h1>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={searchUser}>Search</button>
          {result.length ? (
            result.map((val, key) => {
              return (
                <div className="employee">
                  <h3>username: {val.username}</h3>
                  <h3>ID: {val.id}</h3>
                </div>
              );
            })
          ) : (
            <h1>userssssssssssssssss</h1>
          )}
        </div>
        <div id="right" className="right">
          <h2>Friends</h2>
        </div>
      </div>
    </body>
  );
};

export default Search;
