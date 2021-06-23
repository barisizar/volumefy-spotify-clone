// This is the main app handling the route switches.

import './styles/App.css';
import Signup from "./Signup"
import Login from "./Login"
import Home from "./Home"
import Search from "./Search"
import Home_artist from "./Home_artist"
import Profile from "./Profile"
import Username from "./edits/Username"
import Email from "./edits/Email"
import Gender from "./edits/Gender"
import Age from "./edits/Age"
import Artist from "./edits/Artist"
import Country from "./edits/Country"
import Phone from "./edits/Phone"
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }

  render() {
    const { loggedIn, loaded } = this.state;
      return (
        <Router>
        <div className="App">
          {/* Routes */}
          <Switch>
            <Route exact path="/">
              <Signup></Signup>
            </Route>
            <Route exact path="/Login">
              <Login></Login>
            </Route>
            <Route exact path="/Home">
              <Home></Home>
            </Route>
            <Route exact path="/Home_artist">
              <Home_artist></Home_artist>
            </Route>
            <Route exact path="/Username">
              <Username></Username>
            </Route>
            <Route exact path="/Email">
              <Email></Email>
            </Route>
            <Route exact path="/Gender">
              <Gender></Gender>
            </Route>
            <Route exact path="/Age">
              <Age></Age>
            </Route>
            <Route exact path="/Artist">
              <Artist></Artist>
            </Route>
            <Route exact path="/Country">
              <Country></Country>
            </Route>
            <Route exact path="/Phone">
              <Phone></Phone>
            </Route>
            <Route exact path="/Profile">
              <Profile></Profile>
            </Route>
            <Route exact path="/Search">
              <Search></Search>
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
}
export default App;
