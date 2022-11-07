import React, { useState, useEffect } from "react";
import getCategories from "../../utils/getCategories";
import './Edit.css'

export const Edit = ({
  name,
  phone,
  isFavorite,
  categoryId,
  confirmChanges,
  handleForm,
  closeModal,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getGet = async () => {
      const category = await getCategories();
      setCategories(category);
    };

    getGet();
  }, []);

  return (
    <div>
      <div className="create-form-container">
        <form className="create-container" onSubmit={confirmChanges} action="">
          <span className="close-modal" onClick={closeModal}>
            X
          </span>
          <input
            className="create-input"
            placeholder="name"
            type="text"
            name="contactName"
            onChange={handleForm}
            defaultValue={name}
          />
          <input
            className="create-input"
            placeholder="phone"
            type="text"
            name="phone"
            onChange={handleForm}
            defaultValue={phone}
          />
          <div className="checkbox-container">
            <label htmlFor="isFavorite">Is favorite?</label>
            <input
              className="checkbox-input"
              type="checkbox"
              name="isFavorite"
              id="isFavorite"
              defaultChecked={isFavorite}
              onChange={handleForm}
            />
            <select
              className="select-input"
              name="categoryId"
              id="categories"
              defaultValue={categoryId}
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

    

          <button className="create-button">Confirm Changes</button>
        </form>
      </div>
    </div>
  );
};
