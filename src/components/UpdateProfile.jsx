import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Avatar, Button, Typography } from "@mui/material";
import { updateProfileAction } from "../Actions/Post";
import {useNavigate} from "react-router-dom"
import Loader from "./Loader"

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: profileLoading,
    error: profileError,
    message,
  } = useSelector((state) => state.likeorUnlikePost);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfileAction(name, email, avatar));
    navigate("/account")
  };

  useEffect(() => {
    if (profileError) {
      alert.error(profileError);
      dispatch({type:"clearError"})
    }
    if (message) {
      alert.success(message);
      dispatch({type:"clearMessage"})
    }
  }, [alert, message, profileError,dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, alert]);

  return (
    loading ? <Loader/>: (
      <div className="updateProfile">
        <form className="updateProfileForm" onSubmit={handleSubmit}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            SocialPulse
          </Typography>
          <Avatar
            src={avatarPrev}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />
          <input type="file" accept="image/*" onChange={handleImage} />
          <input
            className="updateProfileInputs"
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="updateProfileInputs"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button disabled={profileLoading} type="submit">
            Update Profile
          </Button>
        </form>
      </div>
    )
  );
};

export default UpdateProfile;
