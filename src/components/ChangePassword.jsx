import React, { useEffect, useState } from 'react'
import "./ChangePassword.css"
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updatePasswordAction } from '../Actions/Post';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

    const {error,loading,message}=useSelector(state=>state.likeorUnlikePost)


  const dispatch = useDispatch();
  const alert = useAlert();

  
  const submitHandler = async (e) => {
   e.preventDefault()
   await dispatch(updatePasswordAction(oldPassword,newPassword))
  };

  useEffect(()=>{
    if(error)
    {
        alert.error(error)
        dispatch({type:"clearError"})
    }
    if(message)
    {
        alert.success(message)
        dispatch({type:"clearMessage"})
    }
  },[dispatch,error,message,alert])
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Update Password
        </Typography>
        <input
          type="password"
          placeholder="Old Password"
          className='updatePasswordInputs'
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className='updatePasswordInputs'
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">Update Password</Button>

      
      </form>
    </div>
  )
}

export default ChangePassword
