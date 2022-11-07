import React, { useState, useCallback, useContext } from "react";
import http from "../../utils/http";
import "./Register.css";

import { contactContext } from "../../context/contact-context/context";

const Register = () => {

const { setModal } = useContext(contactContext)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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
        const { data } = await http.post("/users", userInfo);
        console.log(data);
        window.location = "/";
      } catch (error) {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      }
    },
    [userInfo]
  );

  return (
    <section className="register-container-principal">
      {error && (
        <div className="error-container">
          <h5 className="formError">{error}</h5>
        </div>
      )}
      <form className="register-container" onSubmit={handleSubmit}>
        {/* <span className="close-modal" onClick={closeModal}>
          X
        </span> */}
        <h1>New Account</h1>
        <input
          className="register-input"
          placeholder="email"
          type="email"
          name="email"
          onChange={handleForm}
        />

        <input
          className="register-input"
          placeholder="password"
          type="password"
          name="password"
          onChange={handleForm}
        />

        <button className="register-button" type="submit">
          Crear cuenta
        </button>
        <h5 onClick={() => setModal(false)}>Close</h5>
      </form>
    </section>
  );
};

export default Register;
