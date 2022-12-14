/*
This page is similar to Login Page.

For Form Validation, there are some more details:

username: required, between 3 and 20 characters
email: required, email format
password: required, between 6 and 40 characters
We’re gonna dispatch register action and show response message (successful or error).
*/

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setNombre(nombre);
  };

  const onChangeApellidoe = (e) => {
    const apellido = e.target.value;
    setApellido(apellido);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(nombre, apellido, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return(
    <div class="container-fluid col-lg-3">
    <div class="row">
      <div class="sidenav text-center">
        <div class="login-main-text  ">
            <h2>Proyecto UTN<br></br> Register </h2>
            <p>Register from here to access.</p>
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
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
              <div>
              <div className="form-group">
                <label htmlFor="username"></label>
                <Input
                  placeholder="Nombre"
                  type="text"
                  className="form-control"
                  name="Nombre"
                  value={nombre}
                  onChange={onChangeNombre}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username"></label>
                <Input
                  placeholder="Apellido"
                  type="text"
                  className="form-control"
                  name="Apellido"
                  value={apellido}
                  onChange={onChangeApellidoe}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"></label>
                <Input
                  placeholder="Email"    
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"></label>
                <Input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div class="row text-center mt-4">
                <button type="submit" class="btn btn-secondary ">Register</button>
              </div>
            </div>
          )}           
          {message && (
          <div class="form-group">
            <div class="alert alert-primary" role="alert">
              {message}
            </div>
          </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  </div>   
  );
};

export default Register;