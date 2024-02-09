
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// How to Call the Protected Endpoint

// 1. In your component add:
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// 2. Get the token generated on login:
// const token = cookies.get("TOKEN");

// 3. Add the follwoing header to your request:
// headers: {
//   Authorization: `Bearer ${token}`,
// }


export default function ProtectedRoutes() {

  const token = cookies.get("TOKEN");

  return (
      token ? <Outlet/> : <Navigate to="/login" replace={true} />
  )

}