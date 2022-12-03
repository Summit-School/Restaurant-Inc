import "./Item.css";

const AddItem = () => {
  return (
    <form className="add-item-to-inventory">
      <h3>Add Item To Inventory</h3>
      <div className="item-category">
        <select className="form-control mt-2">
          <option>Select Category</option>
          <option value="FOOD">Food</option>
          <option value="DRINKS">Drink</option>
          <option value="ALCOHOLE">Boster</option>
          <option value="WHISKEY">Citron</option>
        </select>
      </div>
      <div className="item-name">
        <input type="text" className="form-control" placeholder="Item name" />
      </div>
      <div className="item-price">
        <input
          type="number"
          className="form-control"
          placeholder="Item price"
        />
      </div>
      <div className="item-quantity">
        <input type="number" className="form-control" placeholder="Quantity" />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default AddItem;
