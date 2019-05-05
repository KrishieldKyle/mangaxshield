import React, { Component } from 'react'

import './ChapterPagination.css'

export default class Pagination extends Component {
  render() {
    return (
        <div className="pagination">
        <p onClick={this.props.handleLeftPagination}><i className="left"></i></p>
        <div className="spacer"/>
        <div>
        <h5>{this.props.pageStart} of {this.props.len}</h5>
        </div>
        <div className="spacer"/>
        <p onClick={this.props.handleRightPagination}><i className="right"></i></p>
    </div>
    )
  }
}
