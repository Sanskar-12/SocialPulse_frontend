import axios from "axios";

export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};


export const RegisterAction = (name,email, password,avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await axios.post(
      "/api/v1/register",
      {name,email, password,avatar},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};

export const LoadUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    }); 
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPostOfFollowingAction=()=>async(dispatch)=>{
  try {
    dispatch({
      type:"getfollowingPostRequest"
    })

    const {data}=await axios.get("/api/v1/followingpost")

    dispatch({
      type:"getfollowingPostSuccess",
      payload:data.posts
    })

  } catch (error) {
    dispatch({
      type: "getfollowingPostFailure",
      payload: error.response.data.message,
    });
  }
}

export const getAllUsersAction=(name="")=>async(dispatch)=>{
  try {
    dispatch({
      type:"getAllUsersRequest"
    })

    const {data}=await axios.get(`/api/v1/getAllUsers?name=${name}`)

    dispatch({
      type:"getAllUsersSuccess",
      payload:data.users
    })

  } catch (error) {
    dispatch({
      type: "getAllUsersFailure",
      payload: error.response.data.message,
    });
  }
}

export const getmyPostAction=()=>async(dispatch)=>{
  try {
    dispatch({
      type:"getmyPostsRequest"
    })

    const {data}=await axios.get("/api/v1/mypost")

    dispatch({
      type:"getmyPostsSuccess",
      payload:data.posts
    })

  } catch (error) {
    dispatch({
      type: "getmyPostsFailure",
      payload: error.response.data.message,
    });
  }
}

export const getUserProfileAction=(userId)=>async(dispatch)=>{
  try {
    dispatch({
      type:"getUserProfileRequest"
    })

    const {data}=await axios.get(`/api/v1/getUserProfile/${userId}`)

    dispatch({
      type:"getUserProfileSuccess",
      payload:data.user
    })

  } catch (error) {
    dispatch({
      type: "getUserProfileFailure",
      payload: error.response.data.message,
    });
  }
}

export const LogoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });

    await axios.get(
      "/api/v1/logout"
    );

    dispatch({
      type: "LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};
