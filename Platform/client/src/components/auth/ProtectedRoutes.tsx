
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ProtectedRoutes() {

  const token = cookies.get("TOKEN");

  return (
      token ? <Outlet/> : <Navigate to="/login" replace={true} />
  )

}