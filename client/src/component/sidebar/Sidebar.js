import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Sidebar.css'
import moment from 'moment-timezone'; 

//workers
import SidebarWorker from "../common/workers/SidebarWorker"
import WebWorker from "../common/workers/WorkerSetup";

class Sidebar extends Component {

  componentDidMount(){
    this.SidebarWorker = new WebWorker(SidebarWorker);
    this.SidebarWorker.postMessage({
      args: {mangas: this.props.mangas.mangas.manga }
    });
    this.SidebarWorker.addEventListener("message", event => {
      
    });
  }
  render() {
    return (
      <div className="sidebar">
        <div className="row">
          <div>
            
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  errors: PropTypes.object.isRequired,
  mangas: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors : state.errors,
  mangas : state.mangas
})

export default connect(mapStateToProps)(Sidebar)
