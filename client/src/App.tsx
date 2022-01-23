import { useEffect, FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import setAuthToken from 'utils/setAuthToken';
import store from 'store';
import { DevConnectorThunkDispatch } from 'store/common/types';
import { loadUser } from 'store/auth/actions';

import MainContainer from 'components/layout/MainContainer';
import Landing from 'components/layout/Landing';
import NavBar from 'components/layout/NavBar';
import PrivateRoute from 'components/routing/PrivateRoute';

// public pages
import RegisterPage from 'pages/auth/Register';
import LoginPage from 'pages/auth/Login';
import ProfilesListPage from 'pages/profiles/ProfilesListPage';
import ProfilePage from 'pages/profiles/ProfilePage';

// private pages (require auth)
import Dashboard from 'pages/Dashboard';
import CreateProfilePage from 'pages/profiles/CreateProfilePage';
import EditProfilePage from 'pages/profiles/EditProfilePage';
import AddExperiencePage from 'pages/profiles/AddExperiencePage';
import AddEducationPage from 'pages/profiles/AddEducationPage';
import PostsPage from 'pages/posts/PostsPage';
import PostPage from 'pages/posts/PostPage';

// todo css modules
import './App.css';

if (localStorage.token && typeof localStorage.token === 'string') {
  setAuthToken(localStorage.token);
}

// todo routes enum
// todo mb group profiles, :id etc.
const App: FC = () => {
  useEffect(() => {
    if (localStorage.token) {
      // can't use useDispatch coz we are outside Provider.
      void (store.dispatch as DevConnectorThunkDispatch)(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<MainContainer />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profiles" element={<ProfilesListPage />} />
            <Route path="profiles/:id" element={<ProfilePage />} />
            <Route element={<Navigate to="/" />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/create-profile" element={<PrivateRoute />}>
              <Route index element={<CreateProfilePage />} />
            </Route>
            <Route path="/edit-profile" element={<PrivateRoute />}>
              <Route index element={<EditProfilePage />} />
            </Route>
            <Route path="/add-experience" element={<PrivateRoute />}>
              <Route index element={<AddExperiencePage />} />
            </Route>
            <Route path="/add-education" element={<PrivateRoute />}>
              <Route index element={<AddEducationPage />} />
            </Route>
            <Route path="/posts" element={<PrivateRoute />}>
              <Route index element={<PostsPage />} />
            </Route>
            <Route path="/posts/:id" element={<PrivateRoute />}>
              <Route index element={<PostPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
