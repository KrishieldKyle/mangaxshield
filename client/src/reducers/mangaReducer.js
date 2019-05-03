import { GET_ALL_MANGA,GET_ALL_MANGA_LOADING  } from "../actions/types";

const initialState = {
    manga: {},
    loading: false
};


export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_MANGA:
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
      default:
        return state;
    }
  }