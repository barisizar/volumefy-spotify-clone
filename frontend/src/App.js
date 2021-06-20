import './App.css';
import Home from "./Home"
import Login from "./Login"
import Main from "./Main"
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../redux/reducers/index'


const store = createStore(reducer);


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
  if (!loggedIn){
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
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path="/">
            <Main></Main>
          </Route>
      </Switch>
      </div>
      
    </Router>
  )

}

}
export default App;
