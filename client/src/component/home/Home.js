import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './Home.css'
import NoImage from './no_image.png';


import Spinner from '../common/Spinner';

// Pagination
import Pagination from '../common/Pagination'

import {getManga,clearManga} from '../../actions/mangaActions';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 48,
      pageStart: 1,
      len: 0,
      bgImage: ""
    };
  }

  componentDidMount(){
    this.props.clearManga();
    this.props.getManga((len)=>{
      this.setState({len, bgImage: "https://cdn.mangaeden.com/mangasimg/"+this.props.mangas.mangas.manga[0].im})
    });
  }

  handleRightPagination = () => {
    if(this.state.pageStart<this.state.len){
      this.setState({start: this.state.start+48, end: this.state.end+48, pageStart: this.state.pageStart+1})
    }
  }

  handleLeftPagination = () => {
    if(this.state.pageStart>1){
      this.setState({start: this.state.start-48, end: this.state.end-48, pageStart: this.state.pageStart-1})
    }
  }

  render() {

    const {loading, mangas} = this.props.mangas;
    const {start, end, len,pageStart} = this.state;

    let mangaItems;

    const path = 'https://cdn.mangaeden.com/mangasimg/'

    if((Object.entries(mangas).length === 0 && mangas.constructor === Object) || loading){
      mangaItems=<Spinner />;
    }else{
      
      mangaItems = mangas.manga.slice(start, end).map(man => 
        <div key={man.i} className="column">
            {/* <h1>{man.a}</h1> */}
            {man.im===null ? 
              <Link to={`/${man.i}`}>
                <div className="mangaItem" style={{ backgroundImage: `url(${NoImage})` }}>
                  <div className="spacer"/>
                  <p>{man.t}</p>
                </div>
              </Link> : 
              <Link to={`/${man.i}`}>
                <div className="mangaItem" style={{ backgroundImage: `url(${path + man.im})` }}>
                  <div className="spacer"/>
                  <p>{man.t}</p>
                </div>
              </Link> }
        </div>
      )
    }

    let homeItems;
    if((Object.entries(mangas).length === 0 && mangas.constructor === Object) || loading){
      homeItems=<Spinner />;
    }else{
      
      homeItems = (<div>
          <Pagination start={start} end={end} pageStart={pageStart} len={len} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
          <div className="row">
            {mangaItems}
          </div>
          <Pagination start={start} end={end} pageStart={pageStart} len={len} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
          </div>)
    }

    return (
      <div className="homeContainer" style={{ backgroundImage: `url(${this.state.bgImage})` }}>
      <p>Read Manga Online!</p>
        {homeItems}
      </div>
    )
  }
}

Home.propTypes = {
  getManga : PropTypes.func.isRequired,
  clearManga : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  mangas: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors : state.errors,
  mangas : state.mangas
})

export default connect(mapStateToProps,{getManga,clearManga})(Home)