import { combineReducers } from "redux";
import FriendsWannabeesReducer from "./friends/slice";
import ChatReducer from "./messages/slice";

const rootReducer = combineReducers({
    friends: FriendsWannabeesReducer,
    messages: ChatReducer,
});

export default rootReducer;
