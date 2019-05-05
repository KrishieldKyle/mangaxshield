import React, { Component } from 'react'
import { Link,withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import BannerImage from '../common/BannerLogo.png'

import Autosuggest from 'react-autosuggest';
import './Navbar.css'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters


class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  
  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const {manga} = this.props.mangas.mangas;
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return manga.filter(language => regex.test(language.t));
  }
  
  getSuggestionValue = (suggestion) => {
    this.props.history.push(`/${suggestion.i}`);
    window.location.reload();
    return suggestion.t;
  }
  
  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.t}</span>
    );
  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
   
    const { value, suggestions } = this.state;
    
    const inputProps = {
      placeholder: "Search Manga",
      value,
      onChange: this.onChange
    };
    return (
      <nav>
        <Link to="/"><img src={BannerImage} alt="banner" width="100%" height="45px"/></Link>
        <div className="spacer"/>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
      </nav>
    )
  }
}

Navbar.propTypes = {
  errors: PropTypes.object.isRequired,
  mangas: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors : state.errors,
  mangas : state.mangas
})

Navbar = withRouter(Navbar)

export default connect(mapStateToProps)(Navbar)
