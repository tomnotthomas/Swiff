// Header.js
import './Header.css';
import React from 'react';
import Cookies from "universal-cookie";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";

const cookies = new Cookies();


const token = cookies.get("TOKEN");

const Header = ({loggedSteam}) => {


  // logout function
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
		cookies.remove("USER_DATA", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/login";
  }


  return (
    <div className="header-container">

      <div className="header-button-container">

        <div className="container-header">
				<div>
					{loggedSteam ? (
						/* Render this when loggedSteam is true */
						<div></div>
					) : (
						/* Render this when loggedSteam is false */
						<button className="steam-button-1">Connect to Steam</button>
					)}
				</div>
        	<div className="btn btn--1">
        		<div className="content">
        			<div className="front">
        				<div className="border"></div>
                <CgProfile className='header-icon' />
        			</div>
        			<div className="back">
        				<div className="border"></div>
        				<p>Settings</p>
        			</div>
        		</div>
        	</div>
        	<div className="btn btn--2">
        		<div className="content">
        			<div className="front">
        				<div className="border"></div>
                <HiOutlineLogout className='header-icon' />
        			</div>
        			<div className="back">
        				<div className="border"></div>
        				<p onClick={logout}>Logout</p>
        			</div>
        		</div>
        	</div>
        </div>

      </div>
    </div>
  );
};

export default Header;
