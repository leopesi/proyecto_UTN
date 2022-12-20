import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import ClientList from './components/client/ClientList'
import AddClient from './components/client/AddClient'
import Client from './components/client/Client'

import DireccionList from './components/direccion/DireccionList'
import AddDireccion from './components/direccion/AddDireccion'
import Direccion from './components/direccion/Direccion'


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
   
  const { user: currentUser } = useSelector((state) => state.auth); //Permite extrair dados do estado da Redux store, usando uma função selector.
  const dispatch = useDispatch(); //O discpatch envia uma ação, ou action, para a store.

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <header >
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                class="me-2"
                height="20"
                alt="MDB Logo"
                loading="lazy"
              />
              
              <small>
                <Link to={"/"} rel="icon"  href="%PUBLIC_URL%/code-128.png"  className="navbar-brand mt-2 mt-lg-0">Proyecto UTN</Link>
              </small>
            </a>

            
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link to={"/client/add"} className="nav-link">
                      Registrar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/client"} className="nav-link">
                      Clientes
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/direccion"} className="nav-link">
                      Direcciones
                    </Link>
                  </li>
                  
                </>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nombre}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}


          
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />

          <Route path="/client" element={<ClientList />} />  
          <Route path="/client/add" element={<AddClient />} />
          <Route path="/client/:id" element={<Client />} />

          <Route path="/direccion" element={<DireccionList />} />
          <Route path="/direccion/add" element={ <AddDireccion />} />
          <Route path="/direccion/:id" element={<Direccion />} />
          
        </Routes>
      </div>

    </header >
  );
};

export default App;