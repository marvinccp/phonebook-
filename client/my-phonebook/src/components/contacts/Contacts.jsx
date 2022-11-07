import React, { useContext } from "react";

//components
import ContactModal from "../contact-modal/ContactModal";
import EditContactModal from "../edit-Modal/EditContactModal";
import Create from "../create/Create";
import { Edit } from "../Edit/Edit";

//context
import { contactContext } from "../../context/contact-context/context";

//styles
import "./Contacts.css";

// icons
import editIcon from "../../icons/edit-contact2.svg";
import deleteIcon from "../../icons/delete-contact.svg";

const Contacts = () => {
  const {
    deleteContact,
    closeModal,
    confirmChanges,
    handleForm,
    editContact,
    contacts,
    contactModal,
    dispatch,
    EditContactmodal,
    contactName,
    phone,
    isFavorite,
    categoryId,
    check,
  } = useContext(contactContext);

  return (
    <>
      {/* <div>
        <button onClick={getContacts}>GetContacts</button>
      </div> */}
      <section className="contacts-container">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={(e) => check(contact.id, e)}
            className={`contact-info-container`}
          >
            <h5>{contact.contactName}</h5>
            <div>
              <h4>{contact.phone}</h4>
            </div>

            <div className="modify-buttons-container">
              <button
                onClick={() => {
                  editContact({ ...contact });

                  dispatch({ type: "OPEN_EDIT_MODAL", payload: contact.id });
                }}
              >
                {" "}
                <img src={editIcon} alt="Edit Contact" />
              </button>
              <button onClick={() => deleteContact(contact.id)}>
                {" "}
                <img src={deleteIcon} alt="" />
              </button>
            </div>
          </div>
        ))}
      </section>
      {contactModal && (
        <ContactModal>
          <Create closeCreateModal={closeModal} />
        </ContactModal>
      )}
      {EditContactmodal && (
        <EditContactModal closeModal={closeModal}>
          {" "}
          <Edit
            name={contactName}
            phone={phone}
            isFavorite={isFavorite}
            categoryId={categoryId}
            confirmChanges={confirmChanges}
            handleForm={handleForm}
            closeModal={closeModal}
          />
        </EditContactModal>
      )}
      <div className="create-contact-button-container">
        <button
          onClick={() =>
            dispatch({
              type: "OPEN_CONTACT_MODAL",
            })
          }
          className="create-contact-button"
        >
          +
        </button>
      </div>
    </>
  );
};

export default Contacts;
