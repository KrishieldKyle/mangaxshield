import React, { Component } from 'react'
import './Main.css'


// Home
import Home from '../home/Home'

// Sidebar
import Sidebar from '../sidebar/Sidebar'

export default class Main extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Home />
        <Sidebar/>
      </div>
    )
  }
}
