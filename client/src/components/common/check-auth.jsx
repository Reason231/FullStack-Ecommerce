// This components will checks all the authorization related things.

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();  // gives the url path


  // Day 23 
  if(location.pathname === "/") {
    if(!isAuthenticated){
      return <Navigate to="/auth/login"></Navigate>
    }else{
 if(user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />  
    } else{
        return <Navigate to="/shop/home" />
    }
    }
  }

  // If the user is not loggedIn and tries to access other page rather than the login page then it will send to the login page
  // Example => Write (http://localhost:5173/admin) then it will navigate to the login page. 
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"}/>
  }


  // If the user is loggedIn and access to these login or register page, then it will navigate it to the respective pages according to the role.
  if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register")))  {
    if(user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />  
    } else{
        return <Navigate to="/shop/home" />
    }
  }

  // If the normal user is loggedIn and tries to access the admin,it will show you aren't authorized.
  if(isAuthenticated && user?.role !=="admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />
  }

  // If the admin user is loggedIn and tries to access the normal-shopping page,it will show you aren't authorized.
  if(isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")){
    return <Navigate to="/admin/dashboard" />
  }

    // children is the authLayout in the App.jsx
  return <>{children}</>
}

export default CheckAuth;
