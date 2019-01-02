import React, { Component } from 'react';
import './App.css';
import Welcome from "./pages/welcome/Welcome";
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Welcome/>
    );
  }
}

export default App;
