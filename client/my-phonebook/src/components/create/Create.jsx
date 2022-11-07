import React, { useState, useEffect } from "react";
import http from "../../utils/http";
import setAuthToken from "../../utils/setAuthToken";
import getCategories from "../../utils/getCategories";

import "./Create.css";

const Create = ({ user, closeCreateModal }) => {
  const [categories, setCategories] = useState([]);
  console.log(categories);
  const [formData, setFormData] = useState({
    contactName: "",
    phone: "",
    isFavorite: false,
    categoryId: "",
  });
  console.log(formData);

  useEffect(() => {
    const getGet = async () => {
      const category = await getCategories();
      setCategories(category);
    };

    getGet();
  }, []);

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(e.target.value);
  };

  const submit = async (e) => {
    const token = setAuthToken();
    console.log(token);
    e.preventDefault();
    const response = await http.post("/contacts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    window.location = "/contacts";
  };

  return (
    <>
      {user ? console.log(user) : ""}
      <div className="create-form-container">
        <form className="create-container" onSubmit={submit} action="">
          <span className="close-modal" onClick={closeCreateModal}>
            X
          </span>
          <input
            className="create-input"
            placeholder="name"
            onChange={handleForm}
            type="text"
            name="contactName"
            value={formData.name}
          />
          <input
            className="create-input"
            placeholder="phone"
            onChange={handleForm}
            type="text"
            name="phone"
            value={formData.phone}
          />
          <div className="checkbox-container">
            <label htmlFor="isFavorite">Is favorite?</label>
            <input
              className="checkbox-input"
              type="checkbox"
              name="isFavorite"
              id="isFavorite"
              checked={formData.isFavorite}
              onChange={handleForm}
            />
            <select
              className="select-input"
              name="categoryId"
              id="categories"
              onChange={handleForm}
            >
              <option value="choose">Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button className="create-button">Create</button>
        </form>
      </div>
    </>
  );
};

export default Create;
