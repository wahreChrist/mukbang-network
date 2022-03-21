import { combineReducers } from "redux";
import FriendsWannabeesReducer from "./friends/slice";

const rootReducer = combineReducers({
    friends: FriendsWannabeesReducer,
});

export default rootReducer;
