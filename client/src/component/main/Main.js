import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './Main.css'


// Home
import Home from '../home/Home'

// Manga Info
import MangaInfo from '../manga-info/MangaInfo'

// Sidebar
import Sidebar from '../sidebar/Sidebar'

export default class Main extends Component {
  render() {
    return (
      
        <div className="mainContainer">
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={MangaInfo} />
          <Sidebar/>
        </div>
      
    )
  }
}
