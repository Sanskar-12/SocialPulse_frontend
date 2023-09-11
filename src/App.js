import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserAction } from "./Actions/User";
import Home from "./components/Home";
import Account from "./components/Account";
import NewPost from "./components/NewPost";
import Register from "./components/Register";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserProfile from "./components/UserProfile";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

function App() {

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(LoadUserAction())
  },[dispatch])

  const {isAuthenticated}=useSelector(state=>state.user)
  return (
    <Router>
      {
        isAuthenticated && <Header/>
      }
      <Routes>
        <Route path="/" element={isAuthenticated?<Home/>:<Login/>}/>
        <Route path="/account" element={isAuthenticated?<Account/>:<Login/>}/>
        <Route path="/newPost" element={isAuthenticated?<NewPost/>:<Login/>}/>
        <Route path="/register" element={isAuthenticated?<Account/>:<Register/>}/>
        <Route path="/update/profile" element={isAuthenticated?<UpdateProfile/>:<Login/>}/>
        <Route path="/change/password" element={isAuthenticated?<ChangePassword/>:<Login/>}/>
        <Route path="/forgot/password" element={isAuthenticated?<ChangePassword/>:<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={isAuthenticated?<ChangePassword/>:<ResetPassword/>}/>
        <Route path="/user/:userId" element={isAuthenticated?<UserProfile/>:<Login/>}/>
        <Route path="/search" element={isAuthenticated?<Search/>:<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
