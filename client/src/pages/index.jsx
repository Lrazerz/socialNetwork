import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";
import Landing from "../components/layout/Landing";
import MainContainer from "../components/layout/MainContainer";
import Profiles from "../components/profiles/Profiles";
import Profile from "../components/profile/Profile";
import Register from "../components/auth/Register";
import Redirect from "../components/Red";
import React from "react";

const Pages = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path='/' element={<MainContainer/>}>
                    <Route exact path='register' element={<Register/>}/>
                    <Route exact path='login' element={<Login/>}/>
                    <Route exact path='profiles' element={<Profiles/>}/>
                    <Route exact path='profile/:id' element={<Profile/>}/>
                    <Route path='*' element={<Redirect/>}/>
                </Route>
                {/*<Fragment>*/}
                {/*    <section className="container">*/}
                {/*        <Alert/>*/}
                {/*        <Route exact path='profiles' element={<Profiles/>}/>*/}
                {/*        <Route exact path='profile/:id' element={<Profile/>}/>*/}
                {/*        <Route exact path='register' element={<Register/>}/>*/}
                {/*        <Route exact path='login' element={<Login/>}/>*/}
                {/*    </section>*/}
                {/*</Fragment>*/}
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
    )
}

export default Pages;
