import React from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    if (Cookies.remove("authToken")) {
      toast("Logged out!", {
        position: "top-center",
      });
      navigate("/app/login");
    };
  };

  return (
    <li>
      <button
        className={` py-1 px-4 text-lg font-semibold rounded-md`}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </li>
  );
}

export default Logout;
