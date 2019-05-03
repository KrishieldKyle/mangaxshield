import { combineReducers } from "redux";
import mangaReducer from "./mangaReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    mangas: mangaReducer,
    errors: errorReducer
});