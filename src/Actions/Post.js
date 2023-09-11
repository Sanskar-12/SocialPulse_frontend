import axios from "axios";

export const likeUnlikeAction=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"likeRequest"
      })
  
      const {data}=await axios.get(`/api/v1/postlikeorunlike/${id}`)
  
      dispatch({
        type:"likeSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const commentsAction=(id,comment)=>async(dispatch)=>{
    try {
      dispatch({
        type:"commentsRequest"
      })
  
      const {data}=await axios.put(`/api/v1/addorUpdateComment/${id}`,{comment},{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"commentsSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "commentsFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const deletecommentsAction=(id,commentId)=>async(dispatch)=>{
    try {
      dispatch({
        type:"deletecommentsRequest"
      })
  
      const {data}=await axios.delete(`/api/v1/deletecomment/${id}`,{
        data:{commentId}
      })
  
      dispatch({
        type:"deletecommentsSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "deletecommentsFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const createPostAction=(caption,image)=>async(dispatch)=>{
    try {
      dispatch({
        type:"createPostRequest"
      })
  
      const {data}=await axios.post(`/api/v1/post/upload`,{
        caption,image
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"createPostSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "createPostFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const updatePostAction=(caption,id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"updatePostRequest"
      })
  
      const {data}=await axios.put(`/api/v1/updatePost/${id}`,{
        caption
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"updatePostSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "updatePostFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const deletePostAction=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"deletePostRequest"
      })
  
      const {data}=await axios.delete(`/api/v1/postremove/${id}`)
  
      dispatch({
        type:"deletePostSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const updateProfileAction=(name,email,avatar)=>async(dispatch)=>{
    try {
      dispatch({
        type:"updateProfileRequest"
      })
  
      const {data}=await axios.put(`/api/v1/updateProfile`,{
        name,email,avatar
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"updateProfileSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  }

  
  export const updatePasswordAction=(oldPassword, newPassword)=>async(dispatch)=>{
    try {
      dispatch({
        type:"updatePasswordRequest"
      })
  
      const {data}=await axios.put(`/api/v1/updatePassword`,{
        oldPassword, newPassword
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"updatePasswordSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const deleteProfileAction=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"deleteProfileRequest"
      })
  
      const {data}=await axios.delete(`/api/v1/deleteProfile`)
  
      dispatch({
        type:"deleteProfileSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const forgotPasswordAction=(email)=>async(dispatch)=>{
    try {
      dispatch({
        type:"forgotPasswordRequest"
      })
  
      const {data}=await axios.post(`/api/v1/forgot/password`,{email},{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"forgotPasswordSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "forgotPasswordFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const resetPasswordAction=(token,password)=>async(dispatch)=>{
    try {
      dispatch({
        type:"resetPasswordRequest"
      })
  
      const {data}=await axios.put(`/api/v1/password/reset/${token}`,{password},{
        headers:{
          "Content-Type":"application/json"
        }
      })
  
      dispatch({
        type:"resetPasswordSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const getUserPostAction=(userId)=>async(dispatch)=>{
    try {
      dispatch({
        type:"getUserPostsRequest"
      })
  
      const {data}=await axios.get(`/api/v1/userpost/${userId}`)
  
      dispatch({
        type:"getUserPostsSuccess",
        payload:data.posts
      })
  
    } catch (error) {
      dispatch({
        type: "getUserPostsFailure",
        payload: error.response.data.message,
      });
    }
  }

  export const FollowandUnfollowuserAction=(userId)=>async(dispatch)=>{
    try {
      dispatch({
        type:"followUserRequest"
      })
  
      const {data}=await axios.get(`/api/v1/follow/${userId}`)
  
      dispatch({
        type:"followUserSuccess",
        payload:data.message
      })
  
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  }