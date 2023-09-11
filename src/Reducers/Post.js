import {createReducer} from "@reduxjs/toolkit"

const intialState={}


export const likeUnlikeReducer=createReducer(intialState,{
    likeRequest:(state,action)=>{
        state.loading=true
    },
    likeSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    likeFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    commentsRequest:(state,action)=>{
        state.loading=true
    },
    commentsSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    commentsFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    deletecommentsRequest:(state,action)=>{
        state.loading=true
    },
    deletecommentsSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    deletecommentsFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    createPostRequest:(state,action)=>{
        state.loading=true
    },
    createPostSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    createPostFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    forgotPasswordRequest:(state,action)=>{
        state.loading=true
    },
    forgotPasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    forgotPasswordFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    resetPasswordRequest:(state,action)=>{
        state.loading=true
    },
    resetPasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    resetPasswordFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    updatePostRequest:(state,action)=>{
        state.loading=true
    },
    updatePostSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    updatePostFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    updateProfileRequest:(state,action)=>{
        state.loading=true
    },
    updateProfileSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    updateProfileFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    updatePasswordRequest:(state,action)=>{
        state.loading=true
    },
    updatePasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    updatePasswordFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    deletePostRequest:(state,action)=>{
        state.loading=true
    },
    deletePostSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    deletePostFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    deleteProfileRequest:(state,action)=>{
        state.loading=true
    },
    deleteProfileSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    deleteProfileFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    followUserRequest:(state,action)=>{
        state.loading=true
    },
    followUserSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    followUserFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    clearError:(state,action)=>{
        state.error=null
    },
    clearMessage:(state,action)=>{
        state.message=null
    },
})


export const getmyPostReducer=createReducer(intialState,{
    getmyPostsRequest:(state,action)=>{
        state.loading=true
    },
    getmyPostsSuccess:(state,action)=>{
        state.loading=false
        state.posts=action.payload
    },
    getmyPostsFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    clearError:(state,action)=>{
        state.error=null
    }

})

export const getUserPostReducer=createReducer(intialState,{
    getUserPostsRequest:(state,action)=>{
        state.loading=true
    },
    getUserPostsSuccess:(state,action)=>{
        state.loading=false
        state.posts=action.payload
    },
    getUserPostsFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },

    getUserProfileRequest:(state,action)=>{
        state.loading=true
    },
    getUserProfileSuccess:(state,action)=>{
        state.loading=false
        state.user=action.payload
    },
    getUserProfileFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    clearError:(state,action)=>{
        state.error=null
    }

})