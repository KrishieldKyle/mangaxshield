import { combineReducers } from "redux";
import mangaReducer from "./mangaReducer";
import errorReducer from "./errorReducer";
import chapterReducer from "./chapterReducer";

export default combineReducers({
    mangas: mangaReducer,
    chapters: chapterReducer,
    errors: errorReducer
});