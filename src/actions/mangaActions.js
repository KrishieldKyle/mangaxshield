import axios from 'axios';

import {GET_ALL_MANGA,GET_ERRORS,GET_ALL_MANGA_LOADING, CLEAR_ERRORS, GET_MANGA, CLEAR_MANGA} from './types'

// Get all manga
export const getManga = (callback) => dispatch => {
    dispatch(setMangaLoading());
    axios
      .get("https://www.mangaeden.com/api/list/0/")
      .then(res =>{
        dispatch(clearErrors());
        res.data.manga.sort(function (obj1, obj2) {
            // Ascending: first age less than the previous
            return obj2.h - obj1.h;
        });
        dispatch({
          type: GET_ALL_MANGA,
          payload: res.data
        })
        let quo = Math.floor(res.data.manga.length/48);
        if(res.data.manga.length%48>0){
            quo++;
        }
        callback(quo);
        }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
};

// Get manga by Id
export const getMangaById = (input, callback) => dispatch => {
    dispatch(setMangaLoading());
    axios
      .get(`https://www.mangaeden.com/api/manga/${input.id}`)
      .then(res =>{
        dispatch(clearErrors());
        dispatch({
          type: GET_MANGA,
          payload: res.data
        })
        let quo = Math.floor(res.data.chapters_len/50);
        if(res.data.chapters_len%50>0){
            quo++;
        }
        callback(quo);
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    );
};

// Clear Manga
export const clearManga = () => {
  return {
      type: CLEAR_MANGA
  };
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


