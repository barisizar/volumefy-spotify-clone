import './login.css';
import volumefy from "./volumefy.png";
import {
    Link
  } from "react-router-dom";
// LOGI PAGE
const Main = () => {
  return (
    <div className="Main">
      {/* Name and logo */}
        <div>
            <img src={volumefy} className="logo"/>
            <h1 className="h1text"> VOLUMEFY</h1><hr/>
        </div>
        {/* Inputs */}
        <h2>Welcome to Volumefy</h2>
        <button><Link to="/">SIGN Out</Link></button>
    </div>
  );
}

export default Main;