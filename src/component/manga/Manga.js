import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Manga.css';

import ArrowKeysReact from 'arrow-keys-react';

import Spinner from '../common/Spinner';

// Pagination
import ChapterPagination from '../common/ChapterPagination'

//workers
import MangaOptionWorker from "../common/workers/MangaOptionWorker"
import WebWorker from "../common/workers/WorkerSetup";

import {getChapter, clearChapter} from '../../actions/chapterActions';

class Manga extends Component {
    constructor(props) {
        super(props);
        this.state = {
         loading: true,
         currentPage:1,
         pageTotal: 0,
         chapterLoading: false,
         options: "",
         optionLoading: true,
         disableArrow: false
        };
        this.mainComponent = React.createRef();
        ArrowKeysReact.config({
            left: () => {
              this.handleLeftPagination()
            },
            right: () => {
                this.handleRightPagination()
            }
          });
    }
    

    componentDidMount(){
        this.MangaOptionWorker = new WebWorker(MangaOptionWorker);
        this.mainComponent.current.focus();
        const {chapterId, index, id} = this.props.match.params;
        if (chapterId && index && id) {
            if(this.props.mangas.manga.chapters[index][3]===chapterId){
                const input ={
                    chapterId,
                    index,
                    chapters: this.props.mangas.manga.chapters,
                    id
                }
                this.props.getChapter(input, () => {
                    this.setState({loading: false, pageTotal: this.props.chapters.chapter.length-1})
                    this.getOptions();
                });
            }else{
                this.props.history.push("/");
            }
        }else{
            this.props.history.push("/");
        }
    }

    componentWillUnmount(){
        this.props.clearChapter();
    }

    getOptions = () => {
        this.MangaOptionWorker.postMessage({
            args: { chapters: this.props.mangas.manga.chapters, currentChapter: this.props.chapters.chapterId }
          });
          this.MangaOptionWorker.addEventListener("message", event => {
            this.setState({options: event.data.options, optionLoading: false})
          });
    }

    onOptionSelect = (e) => {
        const value = e.target.value.split('*');
        this.props.history.push(`/${this.props.chapters.mangaId}/${value[0]}/${value[1]}`);
        window.location.reload();
    }

    
    handleRightPagination = () => {
        this.setState({disableArrow:true})
        if(!this.state.disableArrow){
            if(this.state.currentPage<this.state.pageTotal){
                this.setState({currentPage: this.state.currentPage+1, chapterLoading: true}, ()=>{
                      setTimeout(()=>{
                      this.setState({chapterLoading: false})
                      }, 1000)
                  })
              }else{
                  if(this.props.chapters.nextChapterId!==null){
                      this.props.history.push(`/${this.props.chapters.mangaId}/${this.props.chapters.nextChapterId}/${this.props.chapters.nextChapterIndex}`);
                      window.location.reload();
                  }
                  
              }
        }
        
      }
    
      handleLeftPagination = () => {
        this.setState({disableArrow:true})
        if(!this.state.disableArrow){
            if(this.state.currentPage>1){
                this.setState({currentPage: this.state.currentPage-1, chapterLoading: true}, ()=>{
                    setTimeout(()=>{
                      this.setState({chapterLoading: false})
                    }, 1000)
                })
              }else{
                  if(this.props.chapters.prevChapterId!==null){
                      this.props.history.push(`/${this.props.chapters.mangaId}/${this.props.chapters.prevChapterId}/${this.props.chapters.prevChapterIndex}`);
                      window.location.reload();
                  }
                 
              }
        }
        
      }

  render() {
    const {currentPage, pageTotal, chapterLoading, optionLoading, options} = this.state;
    const {chapterNumber, chapterTitle, chapter} = this.props.chapters;
    let mangaContent;
    const path = 'https://cdn.mangaeden.com/mangasimg/'
    let image;
    let optionItem;
    
    
    if(!this.state.loading){
        if(optionLoading){
            optionItem = <Spinner />
        }else{
            optionItem =(<div className="mangaSelectTitle">
                 <p>Read <b>{this.props.mangas.manga.title}</b> Chapter {chapterNumber} - {chapterTitle}</p>
                 <div className="spacer"/>
                 <label htmlFor="optionSelect">
                     Select Chapter:
                 </label>
                 <select id="optionSelect"onChange={this.onOptionSelect} dangerouslySetInnerHTML={{ __html: `${options}` }}></select>
            </div>
                
            )
        }

        if(chapterLoading){
            image = <Spinner />
        }else{
            image =(<div className="containerFlex">
            <ChapterPagination pageStart={currentPage} len={pageTotal} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
            <img onLoad={()=>this.setState({disableArrow:false})} onClick={this.handleRightPagination} src={path+chapter[currentPage-1][1]} alt="" width="100%" height="100%"/>
            <ChapterPagination pageStart={currentPage} len={pageTotal} handleLeftPagination={this.handleLeftPagination} handleRightPagination={this.handleRightPagination}/>
        </div>)
        }

        mangaContent = (<div>
            <Link to={`/${this.props.chapters.mangaId}`}>Go Back to {this.props.mangas.manga.title}</Link>
                {optionItem}
                <div className="chapterMainContainer">
                    <div className="spacer"/>
                    <div className="chapterImageContainer">
                        {image}
                    </div>
                    <div className="spacer"/>
                </div>
                
            </div>
        )

    }else{
        mangaContent = <Spinner />
    }



    return (
      <div {...ArrowKeysReact.events} ref={this.mainComponent} tabIndex="1" className="mangaContainer" style={{ backgroundImage: `url(${path+this.props.mangas.manga.image})` }}>
        {mangaContent}
      </div>
    )
  }
}

Manga.propTypes = {
    getChapter : PropTypes.func.isRequired,
    clearChapter: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    chapters: PropTypes.object.isRequired,
    mangas: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    errors : state.errors,
    chapters : state.chapters,
    mangas: state.mangas
})

export default connect(mapStateToProps,{getChapter,clearChapter})(Manga)
