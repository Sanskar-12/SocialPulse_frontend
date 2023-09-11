import {configureStore} from "@reduxjs/toolkit"
import { getAllUsers, getfollowingPost, userReducer } from "./Reducers/User"
import { getUserPostReducer, getmyPostReducer, likeUnlikeReducer } from "./Reducers/Post"


const store=configureStore({
    reducer:{
        user:userReducer,
        posts:getfollowingPost,
        allUsers:getAllUsers,
        likeorUnlikePost:likeUnlikeReducer,
        getmypost:getmyPostReducer,
        getuserpost:getUserPostReducer,
    }
})

export default store