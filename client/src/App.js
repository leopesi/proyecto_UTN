
import React, {useState} from "react"
import './App.css';
import Axios from "axios";

function App() {
  const [values, setValues] = useState(); 

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));    
  };

  const handleClickButton = () => {
    console.log(values)
    Axios.post('http://localhost:8080/auth/register', {
      nombre: values.nombre,
      apellido: values.apellido,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmpassword,
    }).then((response) => {
      console.log(response)
    });
  };

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Cadastro</h1>
        
        <input
          type="text"
          name="nombre"
          placeholder="nombre"
          className="register--input"
          onChange={handleChangeValues}>
        </input>

        <input
          type="text"
          name="apellido"
          placeholder="apellido"
          className="register--input"
          onChange={handleChangeValues}>
        </input>

        <input
          type="text"
          name="email"
          placeholder="email"
          className="register--input"
          onChange={handleChangeValues}>
        </input>

        <input
          type="text"
          name="password"
          placeholder="password"
          className="register--input"
          onChange={handleChangeValues}>
        </input>

        <input
          type="text"
          name="confirmpassword"
          placeholder="confirmpassword"
          className="register--input"
          onChange={handleChangeValues}>
        </input>
        
        <button 
          className="register--button" 
          onClick={() => handleClickButton()}
          >
            Enviar
          </button>
      </div>
      
    </div>
  );
}

export default App;
