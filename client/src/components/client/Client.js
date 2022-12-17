import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateClient, deleteClient } from "../../slice/clients";
import ClientDataService from "../../services/client.service"

const Client = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();
  
  const initialClientState = {
    id: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    published: false
  };
  const [currentClient, setCurrentClient] = useState(initialClientState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getClient = id => {
    ClientDataService.get(id)
      .then(response => {
        setCurrentClient(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getClient(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentClient.id,
      nombre: currentClient.nombre,
      apellido: currentClient.apellido,
      email: currentClient.email,
      telefono: currentClient.telefono,
      published: status
    };

    dispatch(updateClient({ id: currentClient.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentClient({ ...currentClient, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateClient({ id: currentClient.id, data: currentClient }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The Client was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeClient = () => {
    dispatch(deleteClient({ id: currentClient.id }))
      .unwrap()
      .then(() => {
        navigate("/client");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentClient ? (
        <div className="edit-form">
          <h4>EDIT</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentClient.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={currentClient.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentClient.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={currentClient.telefono}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentClient.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentClient.published ? (
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

          <button className="m-1 btn btn-sm btn-danger mr-2" onClick={removeClient}>
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
          <p>Please click on a Client...</p>
        </div>
      )}
    </div>
  );
};

export default Client;