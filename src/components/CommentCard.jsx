import React from "react";
import "./Comment.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deletecommentsAction } from "../Actions/Post";
import { getPostOfFollowingAction, getmyPostAction } from "../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch=useDispatch()

  const deleteHandler=async()=>{
    dispatch(deletecommentsAction(postId,commentId))
    if (isAccount) {
         dispatch(getmyPostAction())
      } else {
         dispatch(getPostOfFollowingAction());
      }
  }
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt="UserImage" />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
        <Typography className="comment">{comment}</Typography>
      </Link>

      {isAccount ? (
        <Button onClick={deleteHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
