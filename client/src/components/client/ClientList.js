import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {retrieveClients, findClientsByName, deleteAllClients} from "../../slice/clients";
import { Link } from "react-router-dom";

const ClientsList = () => {
  const [currentClient, setCurrentClient] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const clients = useSelector(state => state.client);
  const dispatch = useDispatch();

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveClients());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentClient(null);
    setCurrentIndex(-1);
  };

  const setActiveClient = (client, index) => {
    setCurrentClient(client);
    setCurrentIndex(index);
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

  const findByName = () => {
    refreshData();
    dispatch(findClientsByName({ nombre: searchName }));
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
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Buscar
            </button>
          </div>
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
              to={"/client/" + currentClient.id}
              className="badge badge-warning"
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
  );
};

export default ClientsList;