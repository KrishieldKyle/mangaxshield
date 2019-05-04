import axios from 'axios';

import {GET_CHAPTER,GET_ERRORS, SET_PREV_AND_NEXT_CHAPTER, SET_CHAPTER_LOADING, SET_MANGA_ID, CLEAR_CHAPTERS} from './types'


// Get chapter
export const getChapter = (input,callback) => dispatch => {
    dispatch(setMangaLoading());
    const nextPrevChapt ={
        prevId: parseInt(input.index)<input.chapters.length-1 ?input.chapters[parseInt(input.index)+1][3] : null ,
        nextId: parseInt(input.index)>0 ? input.chapters[parseInt(input.index)-1][3] : null,
        prevIndex: parseInt(input.index)+1<=input.chapters.length-1 ? parseInt(input.index)+1 : null,
        nextIndex: parseInt(input.index)-1 >=0 ? parseInt(input.index)-1 : null
    }
    dispatch(setPrevAndNextChapter(nextPrevChapt));
    dispatch(setMangaId(input.id))
    axios
      .get(`https://www.mangaeden.com/api/chapter/${input.chapterId}`)
      .then(res =>{

        const output = {
            chapterId: input.chapterId,
            data: res.data.images.reverse(),
            chapterTitle: input.chapters[parseInt(input.index)][2],
            chapterNumber: input.chapters[parseInt(input.index)][0],
            chapterDate: input.chapters[parseInt(input.index)][1],
        }
        dispatch({
            type: GET_CHAPTER,
            payload: output
        })
        callback("done");
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    );
};

// Clear Chapters
export const clearChapter = () => {
    return {
        type: CLEAR_CHAPTERS
    };
};

// Set current manga id
export const setMangaId = (input) => {
    return {
        type: SET_MANGA_ID,
        payload: input
    };
};

// Set previous and next chapter
export const setPrevAndNextChapter = (input) => {
    return {
        type: SET_PREV_AND_NEXT_CHAPTER,
        payload: input
    };
};

// Set manga loading
export const setMangaLoading = () => {
    return {
        type: SET_CHAPTER_LOADING
    };
};

