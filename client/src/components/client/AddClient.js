import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClient } from "../../slice/clients";
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  let navigate = useNavigate();
  
  const initialClientState = {
    id: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    published: false
  };
  const [client, setClient] = useState(initialClientState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const saveClient = () => {
    const { nombre, apellido, email, telefono } = client;

    dispatch(createClient({ nombre, apellido, email, telefono })) //FAZER slice
      .unwrap()
      .then(data => {
        console.log(data);
        setClient({ 
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          telefono: data.telefono,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          {navigate("/direccion/add")}
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={client.nombre || ''}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              required 
              value={client.apellido || ''}
              onChange={handleInputChange}
              name="apellido"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={client.email || ''}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              required
              value={client.telefono || ''}
              onChange={handleInputChange}
              name="telefono"
            />
          </div>

          <button onClick={saveClient} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddClient;
