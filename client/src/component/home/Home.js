import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Home.css'
import NoImage from './no_image.png';


import Spinner from '../common/Spinner';

import {getManga} from '../../actions/mangaActions';


class Home extends Component {

  componentDidMount(){
    this.props.getManga();
  }


  render() {

    const {loading, manga} = this.props.manga;

    let mangaItems;
    const path = 'https://cdn.mangaeden.com/mangasimg/'

    if((Object.entries(manga).length === 0 && manga.constructor === Object) || loading){
      mangaItems=<Spinner />;
    }else{
      mangaItems = manga.manga.slice(0, 48).map(man => 
        <div class="column">
            {/* <h1>{man.a}</h1> */}
            {man.im===null ? <div
              className="square"
              style={{ backgroundImage: `url(${NoImage})` }}
            ><div className="spacer"/><p>{man.t}</p></div> : <div
            className="square"
            style={{ backgroundImage: `url(${path + man.im})` }}
            ><div className="spacer"/><p>{man.t}</p></div> }
        </div>
      )
    }

    return (
      <div className="homeContainer">
        <div className="row">
          {mangaItems}
        </div>
        
      </div>
    )
  }
}

Home.propTypes = {
  getManga : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  manga: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors : state.errors,
  manga : state.manga
})

export default connect(mapStateToProps,{getManga})(Home)