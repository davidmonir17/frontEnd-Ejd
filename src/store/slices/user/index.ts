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
      state.Username = action.payload.userName;
      state.Token = action.payload.token;
    },
    logout: (state, action) => {
      state.IsAuthenticated = false;
      state.Email = undefined;
      state.Roles = undefined;
      state.Username = undefined;
      state.Token = undefined;
    },
  },
});

export const { login, logout } = UserReducer.actions;

export default UserReducer.reducer;
