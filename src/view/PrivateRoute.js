
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = localStorage.getItem("session");
  const maxAge = localStorage.getItem("maxAge");
  if(session && maxAge > new Date().getTime()/1000){
    return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
  }else{
    return <Redirect to={{ pathname: "/signin" }} />;
  }
};

export default PrivateRoute;