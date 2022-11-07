import React from 'react'
import ReactDOM from "react-dom";
import "./ContactModal.css";
const ContactModal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="ModalBackground ">
      {children}
      </div>,
    document.getElementById("contactModal")
  );
}

export default ContactModal