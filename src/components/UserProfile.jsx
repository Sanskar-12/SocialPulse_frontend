import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "./Post";
import {  useParams } from "react-router-dom";
import Users from "./Users";
import { getUserProfileAction } from "../Actions/User";
import { FollowandUnfollowuserAction, getUserPostAction } from "../Actions/Post";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params=useParams()

  const { loading, posts,error:userError ,user,loading:userLoading} = useSelector((state) => state.getuserpost);
  const {loading:FollowLoading,message,error}=useSelector((state)=>state.likeorUnlikePost)
  const { user:me} = useSelector((state) => state.user);
  

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(()=>{
    if(error)
    {
        alert.error(error)
        dispatch({type:"clearError"})
    }
    if(userError)
    {
        alert.error(userError)
        dispatch({type:"clearError"})
    }
    if(message)
    {
        alert.success(message)
        dispatch({type:"clearMessage"})
    }
  },[dispatch,error,message,userError,alert])

  const handleFollow=async()=>{
    setFollowing(!following)
    await dispatch(FollowandUnfollowuserAction(params.userId))
    dispatch(getUserProfileAction(params.userId))
  }

  useEffect(() => {
    dispatch(getUserProfileAction(params.userId))
    dispatch(getUserPostAction(params.userId))
    
  }, [params.userId,dispatch]);

  useEffect(()=>{
    if(me._id===params.userId)
    {
        setMyProfile(true)
    }
    if(user)
    {

        user.followers.forEach((item)=>{
            if(item._id===me._id)
            {
                setFollowing(true)
            }
            else
            {
                setFollowing(false)
            }
        })
    }
},[user,me._id,params.userId,dispatch])

  return loading === true || userLoading===true ? (
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
              isAccount={me._id!==params.userId?false:true}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user?.avatar?.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user?.name}</Typography>

        <div>
          <button onClick={() => setFollowerToggle(!followerToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers?.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following?.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user?.posts?.length}</Typography>
        </div>

        {myProfile ? null : (
          <Button variant="contained" disabled={FollowLoading} style={{backgroundColor:following?"red":""}} onClick={handleFollow}>
            {following ? "UnFollow" : "Follow"}
          </Button>
        )}

        <Dialog
          open={followerToggle}
          onClose={() => setFollowerToggle(!followerToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user?.followers?.length > 0 ? (
              user?.followers?.map((item) => (
                <Users
                  key={item?._id}
                  name={item?.name}
                  avatar={item?.avatar?.url}
                  userId={item?._id}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no Followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user?.following?.length > 0 ? (
              user?.following?.map((item) => (
                <Users
                  key={item?._id}
                  name={item?.name}
                  avatar={item?.avatar?.url}
                  userId={item?._id}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no Following
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
