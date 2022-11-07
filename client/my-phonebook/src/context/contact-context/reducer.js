export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "CLOSE_MODAL":
      return { ...state, contactModal: false, EditContactmodal: false };
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        EditContactmodal: true,
        editId: action.payload,
      };
    case "OPEN_CONTACT_MODAL":
      return {
        ...state,
        contactModal: true,
      };

    default:
      break;
  }
};
