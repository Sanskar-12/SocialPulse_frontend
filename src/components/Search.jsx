import React, { useState } from "react";
import "./Search.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../Actions/User";
import Users from "./Users";

const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersAction(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          SocialPulse
        </Typography>

        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((item) => (
              <Users
                key={item._id}
                name={item.name}
                avatar={item.avatar.url}
                userId={item._id}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
