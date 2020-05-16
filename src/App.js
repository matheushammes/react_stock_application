import React, {Component} from 'react';
import logo from './grip_transparent.png';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Welcome from "./Welcome";
import Stocks from "./Stocks";
import Details from "./Details"


function App() {
  return (
    <HashRouter>
    <div className = "main-design">
    <header className = "spacer"> </header>
    <h1 className = "main-header"> The Grip of Death, a pessimistic stock app </h1>
    <hr/>
      <header className="App-header">
      <ul className="header">
          <li><NavLink exact to="/">Welcome</NavLink></li>
          <li><NavLink to="/Stocks">Stocks</NavLink></li>
      </ul>
        <div className="content">
          <Route exact path="/" component={Welcome}/>
          <Route path="/Stocks" component={Stocks}/>
          <Route path="/Details" component={Details}/>
        </div>
      </header>

    </div>
     </HashRouter>
  );
}

export default App;
