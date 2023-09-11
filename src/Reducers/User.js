import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  isAuthenticated:false
};
export const userReducer = createReducer(intialState, {
  LoginRequest: (state, action) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated=true
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated=false
  },

  RegisterRequest: (state, action) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated=true
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated=false
  },

  LogoutRequest: (state, action) => {
    state.loading = true;
  },
  LogoutSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated=false
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated=false
  },

  LoadUserRequest: (state, action) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated=true
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated=false
  },
  clearError:(state)=>{
    state.error=null
  }
});

export const getfollowingPost=createReducer(intialState,{
  getfollowingPostRequest:(state)=>{
    state.loading=true
  },
  getfollowingPostSuccess:(state,action)=>{
    state.loading=false
    state.posts=action.payload
  },
  getfollowingPostFailure:(state,action)=>{
    state.loading=false
    state.error=action.payload
  },
  clearError:(state)=>{
    state.error=null
  }
})

export const getAllUsers=createReducer(intialState,{
  getAllUsersRequest:(state)=>{
    state.loading=true
  },
  getAllUsersSuccess:(state,action)=>{
    state.loading=false
    state.users=action.payload
  },
  getAllUsersFailure:(state,action)=>{
    state.loading=false
    state.error=action.payload
  },
  clearError:(state)=>{
    state.error=null
  }
})
