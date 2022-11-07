import React, { useReducer, useState, useCallback } from "react";

//context
import { contactContext } from "./context";
import { reducer } from "./reducer";

//Api + token
import http from "../../utils/http";
import setAuthToken from "../../utils/setAuthToken";

const ContactContext = ({ children, user }) => {
  const [modal, setModal] = useState(false);
  const initialState = {
    contacts: [],
    contactModal: false,
    EditContactmodal: false,
    editId: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //no reducer
  const [editForm, setEditForm] = useState({
    contactName: "",
    phone: "",
    isFavorite: "",
    categoryId: "",
  });

  React.useEffect(() => {
    user && getContacts();
  }, []);

  //functions get, delete, and patch

  const getContacts = useCallback(async () => {
    const token = setAuthToken();
    const response = await http.get("/contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sortContacts = response.data.sort((a, b) => a.id - b.id);
    console.log(sortContacts);
    dispatch({ type: "GET_CONTACTS", payload: sortContacts });
  }, []);

  //   const getContacts = async () => {
  //     const token = setAuthToken();
  //     const response = await http.get("/contacts", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const sortContacts = response.data.sort((a, b) => a.id - b.id);

  //     console.log(sortContacts);

  //     dispatch({ type: "GET_CONTACTS", payload: sortContacts });
  //   };

  const deleteContact = async (id) => {
    const token = setAuthToken();
    const response = await http.delete(`contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    console.log(id);
    window.location = "/contacts";
  };

  //get default values
  const editContact = async (contact) => {
    setEditForm({
      contactName: contact.contactName,
      phone: contact.phone,
      isFavorite: contact.isFavorite,
      categoryId: contact.categoryId,
    });
  };

  const confirmChanges = async (e) => {
    const token = setAuthToken();
    console.log(token);
    console.log(e);
    e.preventDefault();
    const response = await http.patch(`contacts/${state.editId}`, editForm, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    // console.log(id);
    window.location = "/contacts";
  };

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(e.target.value);
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <contactContext.Provider
      value={{
        deleteContact,
        closeModal,
        confirmChanges,
        handleForm,
        editContact,
        dispatch,
        contacts: state.contacts,
        contactModal: state.contactModal,
        EditContactmodal: state.EditContactmodal,
        contactName: editForm.contactName,
        phone: editForm.phone,
        isFavorite: editForm.isFavorite,
        categoryId: editForm.categoryId,
        user,
        modal,
        setModal,
      }}
    >
      {children}
    </contactContext.Provider>
  );
};

export default ContactContext;
