var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
// import { loginUser } from '../../redux/actions/auth.js';
// import Spinner from '../../components/layout/Spinner.jsx';
import Spinner from 'components/layout/Spinner';
const LoginPage = () => {
    // todo maybe with reducer
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(({ auth }) => auth);
    const onInputChange = (e) => setFormData(prevFormData => (Object.assign(Object.assign({}, prevFormData), { [e.target.name]: e.target.value })));
    const onFormSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // dispatch(loginUser(email, password));
    });
    if (isAuthenticated) {
        return _jsx(Navigate, { to: "/dashboard" }, void 0);
    }
    if (loading) {
        return _jsx(Spinner, {}, void 0);
    }
    return (_jsxs(_Fragment, { children: [_jsx("h1", Object.assign({ className: "large text-primary" }, { children: "Sign In" }), void 0), _jsxs("p", Object.assign({ className: "lead" }, { children: [_jsx("i", { className: "fas fa-user" }, void 0), " Sign Into Your Account"] }), void 0), _jsxs("form", Object.assign({ className: "form", action: "create-profile.html", onSubmit: e => onFormSubmit(e) }, { children: [_jsx("div", Object.assign({ className: "form-group" }, { children: _jsx("input", { type: "email", placeholder: "Email Address", name: "email", value: email, onChange: e => onInputChange(e) }, void 0) }), void 0), _jsx("div", Object.assign({ className: "form-group" }, { children: _jsx("input", { type: "password", placeholder: "Password", name: "password", minLength: 6, value: password, onChange: e => onInputChange(e) }, void 0) }), void 0), _jsx("input", { type: "submit", className: "btn btn-primary", value: "Login" }, void 0)] }), void 0), _jsxs("p", Object.assign({ className: "my-1" }, { children: ["Don't have an account? ", _jsx(Link, Object.assign({ to: "/register" }, { children: "Sign Up" }), void 0)] }), void 0)] }, void 0));
};
export default LoginPage;
//# sourceMappingURL=index.js.map