import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getMangaById} from '../../actions/mangaActions';

import Spinner from '../common/Spinner';
import bgImage from '../common/LogoRectangle.png';


// Pagination
import Pagination from '../common/Pagination'

import moment from 'moment-timezone';

import './MangaInfo.css';

class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
         loading: true,
         start: 0,
         end: 50,
         pageStart: 1,
         len: 0
        };
      }
    componentDidMount(){
        if (this.props.props.match.params.id) {
            this.props.getMangaById({id: this.props.props.match.params.id}, (len)=>{
                this.setState({loading: !this.state.loading, len})
            });
        }
    }

    handleRightPagination = () => {
        if(this.state.pageStart<this.state.len){
          this.setState({start: this.state.start+50, end: this.state.end+50, pageStart: this.state.pageStart+1})
        }
      }
    
      handleLeftPagination = () => {
        if(this.state.pageStart>1){
          this.setState({start: this.state.start-50, end: this.state.end-50, pageStart: this.state.pageStart-1})
        }
      }

  render() {
    const {loading, manga} = this.props.mangas;
    const {start, end, len, pageStart} = this.state;
    let mangaItem;
    let genre;
    let chapters;
    
    const path = 'https://cdn.mangaeden.com/mangasimg/'
    if(!this.state.loading){

        chapters = manga.chapters.slice(start,end).map((chapter,index) => 
            <div key={chapter[0]} className="columnForMangaInfo chapter">
                <Link className="chapterLink" to={`/${this.props.props.match.params.id}/${chapter[3]}/${index+start}`}>Chapter {chapter[0]} - {chapter[2]} - {moment.unix(chapter[1]).format("MMMM Do YYYY, h:mm A")}</Link>
            </div>
            )

        genre = manga.categories.map((category,index) => 
            <div key={index} className="columnForMangaInfo genre">
                {category}
            </div>)

        if((Object.entries(manga).length === 0 && manga.constructor === Object) || loading){
            mangaItem=<Spinner />;
          }else{
              mangaItem = (
                  <div>
                    <div className="row">
                        <div className="columnForMangaInfo">
                            <p className="mangaTitle">Read <b>{manga.title}</b> Manga Online!</p>
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="columnForMangaInfo _25">
                            {
                                manga.image===null 
                                ? <div className="mangaImage" style={{ backgroundImage: `url(${bgImage})` }}/>
                                : <div className="mangaImage" style={{ backgroundImage: `url(${path + manga.image})` }}/>
                            }
                        </div>
                        <div className="columnForMangaInfo _75">
                            <div className="row">
                                <div className="columnForMangaInfo">
                                    <div className="mangaHeaderDiv authorHeader">
                                        Author
                                    </div>
                                    <div className="mangaContentDiv">
                                        {manga.author}
                                    </div>
                                    <div className="mangaHeaderDiv">
                                        Genre
                                    </div>
                                    <div className="mangaContentDiv">
                                        <div className="row">
                                            {genre}
                                        </div>
                                    </div>
                                    <div className="mangaHeaderDiv">
                                        Last Chapter Update
                                    </div>
                                    <div className="mangaContentDiv">
                                        {moment.unix(manga.last_chapter_date).format("MMMM Do YYYY, h:mm A")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="columnForMangaInfo">
                            <p className="description" dangerouslySetInnerHTML={{ __html: `${manga.description}` }}></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="columnForMangaInfo chapters">
                        <Pagination start={start} end={end} pageStart={pageStart} len={len} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
                            {chapters}
                        <Pagination start={start} end={end} pageStart={pageStart} len={len} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
                        </div>
                    </div>
                  </div>
              )
          }
    }else{
        mangaItem=<Spinner />;
    }
    

    return (
      <div className="mangaInfoContainer" style={{ backgroundImage: `url(${path+this.props.mangas.manga.image})` }}>
      <Link to="/">Go Back</Link>
        {mangaItem}
      </div>
    )
  }
}

MangaInfo.propTypes = {
    getMangaById : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    mangas: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors : state.errors,
    mangas : state.mangas
})

export default connect(mapStateToProps,{getMangaById})(MangaInfo)