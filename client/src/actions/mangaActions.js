import axios from 'axios';

import {GET_ALL_MANGA,GET_ERRORS,GET_ALL_MANGA_LOADING, CLEAR_ERRORS} from './types'

// Get all manga
export const getManga = () => dispatch => {
    dispatch(setMangaLoading());
    axios
      .get("https://www.mangaeden.com/api/list/0/")
      .then(res =>{
        dispatch(clearErrors());
        dispatch({
          type: GET_ALL_MANGA,
          payload: res.data
        })}
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

// Set manga loading
export const setMangaLoading = () => {
    return {
        type: GET_ALL_MANGA_LOADING
    };
};


