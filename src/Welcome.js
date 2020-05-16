import React from 'react';
import logo from './grip_transparent.png';
import './Welcome.css';
import "./App.css";



function Welcome() {
  return ( <
    h1 className = "Welcome-header" >
    <
    a  > < img src = {
      logo
    }
    className = "App-logo"
    alt = "logo" / > < /a> <
    p >
    Welcome to The Grip of Death, the only stock app that, no matter how good the stock is, it tells you not to buy!
    <
    /p>

    <
    /h1>
  );
}

export default Welcome;
