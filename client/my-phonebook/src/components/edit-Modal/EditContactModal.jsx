import React from "react";
import ReactDOM from "react-dom";
import "../modal/Modal.css";


const EditContactModal = ({ children, closeModal}) => {


  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("editContactModal")
  );
};

export default EditContactModal;
