import React, { useState, useCallback, useContext, useEffect } from "react";
import http from "../../utils/http";
// import  { contactContext } from '../../context/contact-context/context'

import "./Login.css";

const Login = () => {
  // const { user } = useContext(contactContext);


  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  });


  // let navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await http.post("/auth/login", userInfo);
        localStorage.setItem("token", data.user.token);
        window.location = "/contacts";
        // navigate("/contacts");
      } catch (error) {

        setError('incorrect credentials')
    
      }
    },

    [userInfo]
  );

  return (
    <div className="form-login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="login-error">{error ? error : ""}</div>
        <input
          className="login-input"
          placeholder="email"
          type="email"
          name="email"
          onChange={handleForm}
        />
        <input
          className="login-input"
          placeholder="password"
          type="password"
          name="password"
          onChange={handleForm}
        />
        <button className="login-button" type="submit">
          Iniciar Sesión
        </button>
        <h5 className="recuperación-contaseña">¿Olvidaste tu contraseña?</h5>
      </form>
    </div>
  );
};

export default Login;
