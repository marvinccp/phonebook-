import React, { useState, useEffect, useRef } from "react";
import "./ContactMenu.css";
// import { ReactComponent as CaretIcon } from "../../icons/caret.svg";
// import { ReactComponent as EditIcon } from "../../icons/edit.svg";
// import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";

import caret from "../../icons/caret.svg";
// import deleteIcon from "../../icons/delete.svg";
import editIcon from "../../icons/edit.svg";

const ContactMenu = () => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef()
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return ()=>{
      document.removeEventListener("mousedown", handler);
    }
  }, []);

  return (
    <div className="app">
      <div className="menu-container" ref={menuRef}>
        <div className="menu-trigger" onClick={() => setOpen(!open)}>
          <img src={caret} alt="" />
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>
            <span>Settings</span>
          </h3>
          <ul>
            <DropdownItem img={editIcon} />
            <DropdownItem img={editIcon} />
          </ul>
        </div>
      </div>
    </div>
  );
};

const DropdownItem = ({ img, text }) => {
  return (
    <li className="dropdownItem">
      <img src={img} alt="" />
      <a href="#">{text}</a>
    </li>
  );
};

export default ContactMenu;
