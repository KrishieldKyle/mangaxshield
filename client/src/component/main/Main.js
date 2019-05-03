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
          {/* <Route exact path="/" components={Home} />
          <Route exact path="/:id" components={MangaInfo} />
          <Sidebar/> */}
          <Route exact path="/" render={props => <div className="mainContainer"><Home props={props}/><Sidebar props={props}/></div>} />
          <Route exact path="/:id" render={props => <div className="mainContainer"><MangaInfo props={props}/><Sidebar props={props}/></div>} />
        </div>
      
    )
  }
}
