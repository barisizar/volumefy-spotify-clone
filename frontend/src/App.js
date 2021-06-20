import './App.css';
import Home from "./Home"
import Login from "./Login"
import Main from "./Main"
import React, {Component, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// MAIN APP
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
              <Home></Home>
            </Route>
            <Route exact path="/Login">
              <Login></Login>
            </Route>
            <Route exact path="/Main">
              <Main></Main>
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
}
export default App;
