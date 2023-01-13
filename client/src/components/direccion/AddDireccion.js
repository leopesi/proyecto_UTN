import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDireccion } from "../../slice/direccion";
import { useNavigate } from 'react-router-dom';

const AddDireccion = () => {
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
  const [direccion, setDireccion] = useState(initialDireccionState);
  const [submitted, setSubmitted] = useState(false);

  const clientId = useSelector(state => state.clientId);
  const dispatch = useDispatch();

  const navigateTo = useCallback(() => { 
    navigate("/client")
  }, [navigate]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDireccion({ ...direccion, [name]: value });
  };

  const saveDireccion = () => {
    const { provincia, ciudad, calle, numero, zipcode } = direccion;
    const {id} = clientId
    const data = {
      provincia: provincia,
      ciudad: ciudad,
      calle: calle,
      numero: numero,
      zipcode: zipcode,
    };

    dispatch(createDireccion( { id, data } ) )
      .unwrap()
      .then(data => {
        console.log(data);
        setDireccion({ 
          id: data.id,
          provincia: data.provincia,
          ciudad: data.ciudad,
          calle: data.calle,
          numero: data.numero,
          zipcode: data.zipcode,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const confirmPost = () => {
    setTimeout(function(){
      window.location.reload()
    }, 8000);
    navigateTo()
    
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div class="alert alert-success" role="alert">
          <h4>You submitted successfully!</h4>
          <script>
            {confirmPost()}          
          </script>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="provincia">Provincia</label>
            <input
              type="text"
              className="form-control"
              id="provincia"
              required
              value={direccion.provincia || ''}
              onChange={handleInputChange}
              name="provincia"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              className="form-control"
              id="ciudad"
              required 
              value={direccion.ciudad || ''}
              onChange={handleInputChange}
              name="ciudad"
            />
          </div>

          <div className="form-group">
            <label htmlFor="calle">Calle</label>
            <input
              type="text"
              className="form-control"
              id="calle"
              required
              value={direccion.calle || ''}
              onChange={handleInputChange}
              name="calle"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero">Numero</label>
            <input
              type="text"
              className="form-control"
              id="numero"
              required
              value={direccion.numero || ''}
              onChange={handleInputChange}
              name="numero"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              className="form-control"
              id="zipcode"
              required
              value={direccion.zipcode || ''}
              onChange={handleInputChange}
              name="zipcode"
            />
          </div>

          <button onClick={saveDireccion} className="btn btn-success">
            Submit
          </button>
          
        </div>
      )}
    </div>
  );
};

export default AddDireccion;
