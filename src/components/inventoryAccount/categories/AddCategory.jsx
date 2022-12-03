import "./Categories.css";

const AddCategory = () => {
  return (
    <form className="add-cat-form">
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
