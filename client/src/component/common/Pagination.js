import React, { Component } from 'react'

import './Pagination.css'

export default class Pagination extends Component {
  render() {
    return (
        <div className="pagination">
        <p onClick={this.props.handleLeftPagination}><i className={this.props.pageStart>1 ? "left" : "left iLeft"}></i></p>
        <div className="spacer"/>
        <div>
        <h5>{this.props.pageStart} of {this.props.len}</h5>
        </div>
        <div className="spacer"/>
        <p onClick={this.props.handleRightPagination}><i className={this.props.pageStart<this.props.len ? "right" : "right iRight"}></i></p>
    </div>
    )
  }
}
