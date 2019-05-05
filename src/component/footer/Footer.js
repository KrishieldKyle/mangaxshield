import React, { Component } from 'react'
import './Footer.css'
export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Copyright © {new Date().getFullYear()}.</p>
      </footer>
    )
  }
}
