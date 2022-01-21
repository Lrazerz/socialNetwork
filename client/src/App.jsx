import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainContainer from './components/layout/MainContainer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.token && typeof localStorage.token === 'string') {
  setAuthToken(localStorage.token);
}

// todo mb group profiles, :id etc.
const App = () => {
  // can't use useDispatch() coz we are not inside the <Provider store={store} />

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<MainContainer />}>
            <Route exact path="register" element={<RegisterPage />} />
            <Route exact path="login" element={<LoginPage />} />
            <Route exact path="profiles" element={<Profiles />} />
            <Route exact path="profiles/:id" element={<Profile />} />
            <Route element={<Navigate to="/" />} />

            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>

            <Route path="/create-profile" element={<PrivateRoute />}>
              <Route index element={<CreateProfile />} />
            </Route>

            <Route path="/edit-profile" element={<PrivateRoute />}>
              <Route index element={<EditProfile />} />
            </Route>

            <Route path="/add-experience" element={<PrivateRoute />}>
              <Route index element={<AddExperience />} />
            </Route>

            <Route path="/add-education" element={<PrivateRoute />}>
              <Route index element={<AddEducation />} />
            </Route>

            <Route path="/posts" element={<PrivateRoute />}>
              <Route index element={<Posts />} />
            </Route>

            <Route path="/posts/:id" element={<PrivateRoute />}>
              <Route index element={<Post />} />
            </Route>
          </Route>
        </Routes>
        {/*<Fragment>*/}
        {/*    <section className="container">*/}
        {/*        <Alert/>*/}
        {/*        <Routes>*/}
        {/*            <Route exact path='/register' element={<Register/>}/>*/}
        {/*            <Route exact path='/login' element={<Login/>}/>*/}
        {/*            <Route exact path='/profile/:id' element={<Profile/>}/>*/}
        {/*            /!*<Fragment>*!/*/}
        {/*            /!*    <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/create-profile'*!/*/}
        {/*            /!*                component={CreateProfile}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/add-experience'*!/*/}
        {/*            /!*                component={AddExperience}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/add-education' component={AddEducation}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/posts' component={Posts}></PrivateRoute></Fragment>*!/*/}
        {/*            /!*<Fragment><PrivateRoute exact path='/posts/:id' component={Post}></PrivateRoute></Fragment>*!/*/}
        {/*        </Routes>*/}
        {/*    </section>*/}
        {/*</Fragment>*/}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
