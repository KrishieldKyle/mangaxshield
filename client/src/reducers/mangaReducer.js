import { GET_ALL_MANGA,GET_ALL_MANGA_LOADING, GET_MANGA, CLEAR_MANGA  } from "../actions/types";

const initialState = {
    mangas: {},
    manga: {},
    loading: false
};


export default function(state = initialState, action) {
    switch (action.type) {
    case GET_ALL_MANGA:
        return {
          ...state,
          mangas: action.payload,
          loading: false
        };
    case GET_MANGA:
        return {
          ...state,
          manga: action.payload,
          loading: false
        };
    case GET_ALL_MANGA_LOADING:
        return {
          ...state,
          loading: true
        };
      case CLEAR_MANGA:
        return {
          ...state,
          manga:{}
        };
      default:
        return state;
    }
  }