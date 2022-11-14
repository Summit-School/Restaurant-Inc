import "./AddMenu.css";

const AddMenu = () => {
  return (
    <form className="add-menu-item">
      <input type="text" placeholder="Item name" className="form-control" />
      <input type="number" placeholder="Price" className="form-control" />
      <select class="form-control mt-2">
        <option>Select Category</option>
        <option value="food">Food</option>
        <option value="drink">Drink</option>
      </select>
      <button>Submit</button>
    </form>
  );
};

export default AddMenu;
