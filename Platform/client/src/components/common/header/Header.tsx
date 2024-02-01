// Header.js
import './Header.css';
import React from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const token = cookies.get("TOKEN");

const Header = () => {

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/login";
  }


  return (
    <div className="header-container">
      <div className="header-button-container">
        <button className="header-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
