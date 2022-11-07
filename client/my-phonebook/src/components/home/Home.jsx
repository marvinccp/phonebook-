import React, { useState, useContext } from "react";
import Login from "../login/Login";
import Modal from "../modal/Modal";
import { contactContext } from "../../context/contact-context/context";
import Register from "../register/Register";
import "./Home.css";

const Home = () => {
  const { user, modal, setModal } = useContext(contactContext);
  const register = () => {
    // window.location = "/register";
    setModal(true);
  };

  return (
    <div className="home-container">
      <section className="logo-container-home">
        <div className="logo-container">
          <div className="logo-image-container">
            <img
              className="logo-image"
              src="./images/phonebook.png"
              alt="phonebook"
            />
          </div>
          <h1>MyPhoneBook</h1>
        </div>

        <section className={!user ? "components-container" : ""}>
          <div className="login-container">
            {!user && <Login />}
            {user && (
              <div className="user-buttons-message">
               <h2>Back to contacts</h2>
               <button onClick={()=> window.location = '/contacts'}>Contacts</button>
              </div>
            )}
          </div>
          {!user && (
            <>
              <button
                className="register-redirection-button"
                onClick={register}
              >
                Crear nueva cuenta
              </button>
            </>
          )}
        </section>
        {modal && (
          <Modal>
            <Register />
          </Modal>
        )}
      </section>
    </div>
  );
};

export default Home;
