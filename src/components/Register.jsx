import React, { useEffect, useState } from "react";
import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { RegisterAction } from "../Actions/User";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch=useDispatch()
  const alert =useAlert()

  const {loading,error}=useSelector(state=>state.user)

  const handleImage=(e)=>{
    const file=e.target.files[0]
    const Reader=new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload=()=>{
        if(Reader.readyState===2)
        {
            setAvatar(Reader.result)
        }
    }
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    await dispatch(RegisterAction(name,email,password,avatar))
    alert.success("Registered Successfully")
    
}

useEffect(()=>{
    if(error)
    {
        alert.error(error)
    }
        
},[dispatch,error,alert])

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          SocialPulse
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImage}/>
        <input
          className="registerInputs"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="registerInputs"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInputs"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to={"/"}>
        <Typography>Already Signed In? Login Here</Typography>
        </Link>

        <Button disabled={loading} type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Register;
