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
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
