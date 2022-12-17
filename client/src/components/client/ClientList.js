import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {retrieveClients, deleteAllClients} from "../../slice/clients";
import {findDireccionsByClienteId} from "../../slice/direccion";
import { Link } from "react-router-dom";

const ClientsList = () => {
  const initialClientState = {

    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    published: false
  };

  const [currentClient, setCurrentClient] = useState(initialClientState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [currentDireccion, setCurrentDireccion] = useState("");

  const clients = useSelector(state => state.client);

  const direccions = useSelector(state => state.direccion[0]);

  const dispatch = useDispatch();

  
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const getDireccion = useCallback((id) => { 
    dispatch(findDireccionsByClienteId( {id} ))
    console.log(`currentClient.id = ${id}`)
  }, [dispatch])

  const initFetch = useCallback(() => { 
    dispatch(retrieveClients());    
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const setDireccion = () => {
    const { id, provincia, ciudad, calle, numero, zipcode } = direccions;
    const data = {
      id: id,
      provincia: provincia,
      ciudad: ciudad,
      calle: calle,
      numero: numero,
      zipcode: zipcode,
    };
    setCurrentDireccion({ 
      id: data.id,
      provincia: data.provincia,
      ciudad: data.ciudad,
      calle: data.calle,
      numero: data.numero,
      zipcode: data.zipcode,
    });
  }

  const refreshData = () => {
    setCurrentClient(null);
    setCurrentIndex(-1);
  };
  
   
  
  const setActiveClient = (client, index) => {
    setCurrentClient(client);
    setCurrentIndex(index);
    setDireccion();
    getDireccion(client.id)
  };

  const removeAllClients = () => {
    dispatch(deleteAllClients())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={onChangeSearchName}
          />
         
        </div>
      </div>

      <div className="col-md-6">
        <ul className="list-group">
          {clients &&
            clients.map((client, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveClient(client, index)}
                key={index}
              >
                {client.nombre}
              </li>
            ))}
        </ul>
     

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllClients}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        <div className="col-md-4">
          {currentClient ? (
            <div>
              <div class="p-4 shadow-4 rounded-3">
                <div class="container">
                <h1 >CLIENTE</h1>
              </div>
            </div>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentClient.nombre} 
                
              </div>
              <div>
                <label>
                  <strong>Apellido:</strong>
                </label>{" "}
                {currentClient.apellido}
              </div>
              <div>
                <label>
                  <strong>E-mail:</strong>
                </label>{" "}
                {currentClient.email}
              </div>
              <div>
                <label>
                  <strong>Telefono:</strong>
                </label>{" "}
                {currentClient.telefono}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentClient.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/client/"  + currentClient.id}
                className="m-1 btn btn-sm btn-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Client...</p> 
            </div>
          )}
        </div>

        <div className="col-md-8">
          {currentClient ? (
            <div>
              <div class="p-4 shadow-4 rounded-3">
                <div class="container">
                <h3 >Direccion</h3>
              </div>
            </div>
              <div>
                <label>
                  <strong>Provincia:</strong>
                </label>{" "}
                {currentDireccion.provincia}
                
              </div>
              <div>
                <label>
                  <strong>Ciudad:</strong>
                </label>{" "}
                {currentDireccion.ciudad}
              </div>
              <div>
                <label>
                  <strong>Calle:</strong>
                </label>{" "}
                {currentDireccion.calle}
              </div>
              <div>
                <label>
                  <strong>Numero:</strong>
                </label>{" "}
                {currentDireccion.numero}
              </div>
              <div>
                <label>
                  <strong>Zipcode:</strong>
                </label>{" "}
                {currentDireccion.zipcode}
              </div>


              <Link
                to={"/direccion/" + currentDireccion.id}
                className="m-1 btn btn-sm btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Client...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsList;