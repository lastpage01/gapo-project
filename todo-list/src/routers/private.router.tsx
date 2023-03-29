import React from "react";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("token")!);
  return auth ? <> {children} </> : <Navigate to={"/login"} />;
};

export default PrivateRouter;
