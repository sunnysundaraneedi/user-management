import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { userActions } from "../../Store/userSlice";

const NavBar = () => {
  const clasess = useSelector((state) => state.users.classes);
  const dispatch = useDispatch();

  return (
    <div className="nav-container">
      <Link
        to="/home"
        className={clasess.home}
        onClick={() => dispatch(userActions.homeClass())}
      >
        Home
      </Link>

      <Link
        to="/users"
        className={clasess.users}
        onClick={() => dispatch(userActions.usersClass())}
      >
        Users
      </Link>
      <Outlet />
    </div>
  );
};

export default NavBar;
