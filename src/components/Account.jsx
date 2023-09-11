import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserAction, LogoutAction, getmyPostAction } from "../Actions/User";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "./Post";
import { Link } from "react-router-dom";
import Users from "./Users";
import { deleteProfileAction } from "../Actions/Post";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts } = useSelector((state) => state.getmypost);
  const { error: likeError, message: likeMessage,loading:deleteLoading } = useSelector(
    (state) => state.likeorUnlikePost
  );
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followerToggle,setFollowerToggle]=useState(false)
  const [followingToggle,setFollowingToggle]=useState(false)

  const logoutHandler=async()=>{
    await dispatch(LogoutAction())
    alert.success("Logged out Successfully")
  }

  useEffect(() => {
    dispatch(getmyPostAction());
    dispatch(LoadUserAction())
    dispatch({type:"clearError"})
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
    if (likeMessage) {
      alert.success(likeMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, likeError, likeMessage, dispatch]);

  const handleDeleteProfile=async()=>{
    await dispatch(deleteProfileAction())
    dispatch(LogoutAction())
  }

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
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
              isDelete={true}
              isAccount={true}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <button onClick={() => setFollowerToggle(!followerToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={()=>setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>Logout</Button>

        <Link to={"/update/profile"}>Edit Profile</Link>
        <Link to={"/change/password"}>Change Password</Link>

        <Button disabled={deleteLoading} variant="text" style={{ color: "red", margin: "2vmax" }} onClick={handleDeleteProfile}>
          Delete My Profile
        </Button>

        <Dialog
        open={followerToggle}
        onClose={() => setFollowerToggle(!followerToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Followers</Typography>

          {
            user && user?.followers?.length>0 ? (
              user?.followers?.map((item)=>(
                <Users
                key={item?._id}
                name={item?.name}
                avatar={item?.avatar?.url}
                userId={item?._id}
                />
              ))
            ):(
              <Typography style={{margin:"2vmax"}}>You have no Followers</Typography>
            ) 
          }
        </div>
      </Dialog>

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Following</Typography>

          {
            user && user?.following?.length>0 ? (
              user?.following?.map((item)=>(
                <Users
                key={item?._id}
                name={item?.name}
                avatar={item?.avatar?.url}
                userId={item?._id}
                />
              ))
            ):(
              <Typography style={{margin:"2vmax"}}>You have no Following</Typography>
            ) 
          }
        </div>
      </Dialog>
      </div>
    </div>
  );
};

export default Account;
