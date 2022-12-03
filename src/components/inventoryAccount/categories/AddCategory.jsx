import React from "react";

const AddCategory = () => {
  return (
    <form>
      <div className="category-name">
        <input
          type="text"
          className="form-control"
          placeholder="Category name"
        />
      </div>
      <button className="add-item-inventory">Submit</button>
    </form>
  );
};

export default AddCategory;
