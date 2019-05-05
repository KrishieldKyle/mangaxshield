import {GET_CHAPTER, SET_PREV_AND_NEXT_CHAPTER, SET_MANGA_ID ,SET_CHAPTER_LOADING, CLEAR_CHAPTERS} from '../actions/types'

const initialState = {
    chapter: {},
    mangaId: null,
    chapterId: null,
    chapterTitle: "",
    chapterDate: "",
    chapterNumber: null,
    prevChapterId: null,
    nextChapterId: null,
    prevChapterIndex: null,
    nextChapterIndex: null,
    loading: false
};


export default function(state = initialState, action) {
    switch (action.type) {
    case GET_CHAPTER:
        return {
          ...state,
          chapter: action.payload.data,
          chapterId: action.payload.chapterId,
          chapterTitle: action.payload.chapterTitle,
          chapterDate: action.payload.chapterDate,
          chapterNumber: action.payload.chapterNumber,
          loading: false
        };
    case SET_MANGA_ID:
        return {
          ...state,
          mangaId: action.payload,
        };
    case SET_PREV_AND_NEXT_CHAPTER:
        return {
          ...state,
          prevChapterId: action.payload.prevId,
          nextChapterId: action.payload.nextId,
          prevChapterIndex: action.payload.prevIndex,
          nextChapterIndex: action.payload.nextIndex
        };
    case SET_CHAPTER_LOADING:
        return {
          ...state,
          loading: true
        };
    case CLEAR_CHAPTERS:
        return {
          ...state,
          chapter: {},
            mangaId: null,
            chapterId: null,
            chapterTitle: "",
            chapterDate: "",
            chapterNumber: null,
            prevChapterId: null,
            nextChapterId: null,
            loading: false
        };
      default:
        return state;
    }
  }