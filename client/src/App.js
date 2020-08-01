import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from "./components/layout/Alert";
// Redux
import {Provider} from 'react-redux';
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./redux/actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // can't use useDispatch() coz we are not inside the <Provider store={store} />

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Navbar/>
          <Route exact path='/'>
            <Landing/>
          </Route>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path='/register'>
                <Register/>
              </Route>
              <Route exact path='/login'>
                <Login/>
              </Route>
              <Route exact path='/profiles'>
                <Profiles/>
              </Route>
              <Route exact path='/profile/:id'>
                <Profile/>
              </Route>
              <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path='/create-profile' component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
              <PrivateRoute exact path='/add-experience' component={AddExperience}></PrivateRoute>
              <PrivateRoute exact path='/add-education' component={AddEducation}></PrivateRoute>
              <PrivateRoute exact path='/posts' component={Posts}></PrivateRoute>
              <PrivateRoute exact path='/posts/:id' component={Post}></PrivateRoute>
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
