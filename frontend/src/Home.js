import "./home.css";
import volumefy from "./volumefy.png";
import React,{ useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
// import Math from "Math"

// HOME (INDEX) PAGE
const Home = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userlist, setUserList] = useState([]);

  const addUser = (event) => {
    // console.log("mhp user added")
    event.preventDefault();
    var id =  null;
    setId(id);
    // console.log(id,username,email,password)
    Axios.post("http://localhost:3001/create", {
      id: id,
      username: username,
      email: email,
      password: password,
    },{
    headers: {
      'Content-Type': 'application/json', 
  },
  withCredentials: true,
  }).then(() => {
      setUserList([
        ...userlist,
        {
          id: id,
          username: username,
          email: email,
          password: password,
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data);
    });
  };

  return (
    <div className="Home">
      {/* Name and logo */}
      <div>
        <img src={volumefy} className="logo" />
        <h1 className="h1text"> VOLUMEFY</h1>
        <hr />
      </div>
      {/* Inputs */}
      <h2>Email Address</h2>
      <input className="input" type="email" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
      <h2>User Name</h2>
      <input className="input" type="text" onChange={(event) => {
            setUsername(event.target.value);
          }}/>
      <h2>Password</h2>
      <input className="input" type="password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
      <br />
      <br />
      <button onClick={addUser}><Link to="/Main">SIGN UP</Link></button>
      {/* Direct to the login page */}
      <h2>
        <Link to="/Login">Already have an account?</Link>
      </h2>
      {/* <button>LOGIN</button> */}
      <button>
        <Link to="/Login">SIGN IN</Link>
      </button>
    </div>
  );
};

export default Home;
