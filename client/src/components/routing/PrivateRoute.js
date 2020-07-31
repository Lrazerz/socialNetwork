import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated, loading} = useSelector(({auth}) => auth);

  return (
    <Route {...rest}>
      { !isAuthenticated && !loading ? (<Redirect to='/login'/>) : (<Component/>)}
    </Route>
  )
}

export default PrivateRoute;