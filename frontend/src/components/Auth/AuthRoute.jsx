import React from "react";
import { getUserFormStorage } from "../../utils/getUserFromStorage";
import { Navigate } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const user = getUserFormStorage();
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
