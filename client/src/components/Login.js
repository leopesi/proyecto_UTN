/* 
This page has a Form with username & password.
– We’re gonna verify them as required field.
– If the verification is ok, we dispatch login action, then direct user to Profile page: this.props.history.push("/profile");.

For the application state, we use Redux connect() function with mapStateToProps:
– redirect user to Profile page by checking isLoggedIn
– show response message with message
*/

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setNombre(nombre);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(nombre, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {

        });
    } else {

    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div class="container-fluid col-lg-3">
      <div class="row">
        <div class="sidenav text-center">
          <div class="login-main-text  ">
              <h2>Proyecto UTN<br></br> Login </h2>
              <p>Login from here to access.</p>
          </div>
          <img
          src="code-128.png"
          alt="profile-img"
          className="profile-img-card"
          />
        </div>
      </div>

      <div className="row">
        <div class="login-form">

          <Form onSubmit={handleLogin} ref={form}>  
            <div class="form-group">
                <label>Nombre</label>
                <Input 
                type="text"
                class="form-control"
                name="nombre"
                value={nombre}
                onChange={onChangeNombre}
                validations={[required]} 
                placeholder="Nombre">
                </Input>
            </div>
            <div class="form-group">
                <label>Password</label>
                <Input 
                type="password"
                class="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                placeholder="Password">
                  
                </Input>
            </div>
            <div className="row text-center mt-4">
              <button type="submit" class="btn btn-secondary">Login</button>
              {message && (
              <div class="form-group">
                <div class="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />

            </div>

          </Form>
        </div>
      </div>
    </div>    
      
  );
};

export default Login;