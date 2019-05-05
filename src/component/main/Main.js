import React, { Component } from 'react'
import { Route } from "react-router-dom";
import './Main.css'


// Home
import Home from '../home/Home'

// Manga Info
import MangaInfo from '../manga-info/MangaInfo'

// Manga
import Manga from '../manga/Manga'

// Sidebar
import Sidebar from '../sidebar/Sidebar'

export default class Main extends Component {
  render() {
    return (
      
        <div className="mainContainer">
          <Route exact path="/" render={props => <div className="mainContainer"><Home props={props}/><Sidebar props={props}/></div>} />
          <Route exact path="/:id" render={props => <div className="mainContainer"><MangaInfo props={props}/><Sidebar props={props}/></div>} />
          <Route exact path="/:id/:chapterId/:index" component={Manga} />
        </div>
      
    )
  }
}
