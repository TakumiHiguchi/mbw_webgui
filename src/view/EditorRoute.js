
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = localStorage.getItem("session");
  const maxAge = localStorage.getItem("maxAge");
  const email = localStorage.getItem("email");
  const editor = localStorage.getItem("editor");
  if(session && (maxAge > new Date().getTime()/1000) && editor == "true"){
    return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
  }else{
    return <Redirect to={{ pathname: "/signin" }} />;
  }
};

export default PrivateRoute;