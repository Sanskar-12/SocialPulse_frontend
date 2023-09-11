import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetPasswordAction } from "../Actions/Post";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const { error, loading, message } = useSelector(
    (state) => state.likeorUnlikePost
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(params.token, newPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, message]);
  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Forgot Password
        </Typography>
        <input
          type="password"
          placeholder="New Password..."
          className="resetPasswordInputs"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to={"/forgot/password"}>
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>

        <Link to={"/"}>
          <Typography>Login Now</Typography>
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
