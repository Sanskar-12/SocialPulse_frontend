import React, { useEffect } from "react";
import "./Home.css";
import Users from "./Users";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction, getPostOfFollowingAction } from "../Actions/User";
import Loader from "./Loader";
import { Typography } from "@mui/material";
import {useAlert} from "react-alert"


const Home = () => {
  const { loading, posts } = useSelector((state) => state.posts);
  const { loading: usersLoading, users } = useSelector(
    (state) => state.allUsers
  );
  const {error:likeError,message:likeMessage}=useSelector(state=>state.likeorUnlikePost)

  const dispatch = useDispatch();
  const alert=useAlert()

  useEffect(() => {
    dispatch(getPostOfFollowingAction());
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(()=>{
    if(likeError)
    {
      alert.error(likeError)
      dispatch({type:"clearError"})
    }
    if(likeMessage)
    {
      alert.success(likeMessage)
      dispatch({type:"clearMessage"})
    }

  },[alert,likeError,likeMessage,dispatch])


  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts?.map((post) => (
            <Post
              key={post?._id}
              postId={post?._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post?.likes}
              comments={post?.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post?.owner?.name}
              ownerId={post?.owner?._id}
              isDelete={false}
              isAccount={false}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users?.map((user) => (
            <Users
              key={user?._id}
                name={user?.name}
                avatar={user?.avatar?.url}
                userId={user?._id}
            />
          ))
        ) : (
          <Typography variant="h6">No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
