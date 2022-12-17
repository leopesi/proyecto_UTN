import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateDireccion, deleteDireccion } from "../../slice/direccion";
import DireccionDataService from "../../services/direccion.service"

const Direccion = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();
  
  const initialDireccionState = {
    id: null,
    provincia: "",
    ciudad: "",
    calle: "",
    numero: "",
    zipcode: "",
    published: false
  };
  const [currentDireccion, setCurrentDireccion] = useState(initialDireccionState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getDireccion = id => {
    DireccionDataService.get(id)
      .then(response => {
        setCurrentDireccion(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getDireccion(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDireccion({ ...currentDireccion, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentDireccion.id,
      provincia: currentDireccion.provincia,
      ciudad: currentDireccion.ciudad,
      calle: currentDireccion.calle,
      numero: currentDireccion.numero,
      zipcode: currentDireccion.zipcode,
      published: status
    };

    dispatch(updateDireccion( { id: currentDireccion.id, data } ) )
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentDireccion({ ...currentDireccion, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateDireccion({ id: currentDireccion.id, data: currentDireccion }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The Direccion was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeDireccion = () => {
    dispatch(deleteDireccion({ id: currentDireccion.id }))
      .unwrap()
      .then(() => {
        navigate("/direccion");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDireccion ? (
        <div className="edit-form">
          <h4>EDIT</h4>
          <form>
            <div className="form-group">
              <label htmlFor="provincia">Provincia</label>
              <input
                type="text"
                className="form-control"
                id="provincia"
                name="provincia"
                value={currentDireccion.provincia}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="ciudad"
                name="ciudad"
                value={currentDireccion.ciudad}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="calle">Calle</label>
              <input
                type="text"
                className="form-control"
                id="calle"
                name="calle"
                value={currentDireccion.calle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numero">Numero</label>
              <input
                type="text"
                className="form-control"
                id="numero"
                name="numero"
                value={currentDireccion.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                name="zipcode"
                value={currentDireccion.zipcode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentDireccion.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentDireccion.published ? (
            <button
            className="m-1 btn btn-sm btn-info mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
            className="m-1 btn btn-sm btn-info mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="m-1 btn btn-sm btn-danger mr-2" onClick={removeDireccion}>
            Delete
          </button>

          <button
            type="submit"
            className="m-1 btn btn-sm btn-warning"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Direccion...</p>
        </div>
      )}
    </div>
  );
};

export default Direccion;