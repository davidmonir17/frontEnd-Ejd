// third-party
import { combineReducers } from "redux";

// project imports
import userReducer from "./slices/user";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
