import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button
      className="
          bg-red-500
          text-white
          px-5
          py-2
          rounded-lg
          font-medium
          hover:bg-red-700
          transition-all
          duration-300
          shadow
          "    
        onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;