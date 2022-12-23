import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {retrieveDireccions, deleteAllDireccions} from "../../slice/direccion";
import { Link } from "react-router-dom";

const DireccionsList = () => {
  const [currentDireccion, setCurrentDireccion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const direccions = useSelector(state => state.direccion);
  const dispatch = useDispatch();

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveDireccions());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentDireccion(null);
    setCurrentIndex(-1);
  };

  const setActiveDireccion = (direccion, index) => {
    setCurrentDireccion(direccion);
    setCurrentIndex(index);
  };

  const removeAllDireccions = () => {
    dispatch(deleteAllDireccions())
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
            placeholder="Buscar por calle"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"

            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        

        <ul className="list-group">
          {direccions &&
            direccions.map((direccion, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveDireccion(direccion, index)}
                key={index}
              >
                {direccion.calle}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllDireccions}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentDireccion ? (
          <div>
            <div class="p-4 shadow-4 rounded-3">
              <div class="container">
              <h1 >Direccion</h1>
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
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentDireccion.published ? "Published" : "Pending"}
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
            <p>Seleccione la Direccion...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DireccionsList;