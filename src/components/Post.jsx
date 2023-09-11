import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { commentsAction, deletePostAction, likeUnlikeAction, updatePostAction } from "../Actions/Post";
import {  LoadUserAction, getPostOfFollowingAction, getmyPostAction } from "../Actions/User";
import Users from "./Users";
import CommentCard from "./CommentCard";

const  Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete=false, 
  isAccount=false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesuser, setLikesUser] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likeUnlikeAction(postId));

    if (isAccount) {
      dispatch(getmyPostAction());
    } else {
      dispatch(getPostOfFollowingAction());
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  const CommentsubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(commentsAction(postId, commentValue));
    if (isAccount) {
      dispatch(getmyPostAction());
    } else {
      dispatch(getPostOfFollowingAction());
    }
  };

  const handleUpdateCaption=async(e)=>{
    e.preventDefault()
    await dispatch(updatePostAction(captionValue,postId))
    dispatch(getmyPostAction())
  }

  const handleDelete=async()=>{
    await dispatch(deletePostAction(postId))
    await dispatch(getmyPostAction())
    dispatch(LoadUserAction())
  }

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount && (
          <button onClick={()=>setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </button>
        )}
      </div>
      <img src={postImage} alt="postImage" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="ownerimage"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          margin: "1vmax 2vmax",
          outline: "none",
        }}
        onClick={() => setLikesUser(!likesuser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <Button onClick={handleDelete}>{isDelete && <DeleteOutline />}</Button>
      </div>

      <Dialog open={likesuser} onClose={() => setLikesUser(!likesuser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <Users
              key={like?._id}
              name={like?.name}
              avatar={like?.avatar?.url}
              userId={like?._id}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={CommentsubmitHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <button type="submit" variant="contained">
              Add
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                userId={comment.user._id}
                name={comment.user.name}
                avatar={comment.user.avatar.url}
                comment={comment.comment}
                commentId={comment._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={handleUpdateCaption}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <button type="submit" variant="contained">
              Update
            </button>
          </form>

        </div>
      </Dialog>
    </div>
  );
};

export default Post;
