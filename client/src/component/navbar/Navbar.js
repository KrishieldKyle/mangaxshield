import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
export default class navbar extends Component {
  render() {
    return (
      <nav>
        <Link to="/"><h1>MangaXshield</h1></Link>
        <div className="spacer"/>
        <code>todo search bar</code>
      </nav>
    )
  }
}
