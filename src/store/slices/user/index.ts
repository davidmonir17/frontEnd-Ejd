import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "./interfaces";

// project imports

//initial state
const initialState: UserInterface = {
  IsAuthenticated: false,
};

// ==============================|| SLICE - SaleType ||============================== //

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.IsAuthenticated = true;
      state.Email = action.payload.email;
      state.Roles = action.payload.roles;
      state.username = action.payload.username;
      state.Token = action.payload.token;
      state.empiId= action.payload.empiId;
      state.depId= action.payload.depId;

    },
    logout: (state, action) => {
      state.IsAuthenticated = false;
      state.Email = undefined;
      state.Roles = undefined;
      state.username = undefined;
      state.Token = undefined;
      state.empiId= undefined;
      state.depId= undefined;
    },
  },
});

export const { login, logout } = UserReducer.actions;

export default UserReducer.reducer;
