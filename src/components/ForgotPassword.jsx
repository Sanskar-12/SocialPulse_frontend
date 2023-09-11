import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css"
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector  } from "react-redux";
import { useAlert } from "react-alert";
import { forgotPasswordAction } from '../Actions/Post';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch=useDispatch()
    const alert=useAlert()

    const {error,loading,message}=useSelector(state=>state.likeorUnlikePost)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(forgotPasswordAction(email))
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
  },[dispatch,error,alert,message])
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Forgot Password
        </Typography>
        <input
          type="email"
          placeholder="Email..."
          className='forgotPasswordInputs'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        

        <Button disabled={loading} type="submit">Send Email</Button>

      
      </form>
    </div>
  )
}

export default ForgotPassword
