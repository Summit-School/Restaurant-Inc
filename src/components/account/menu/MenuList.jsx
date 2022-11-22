import "./MenuList.css";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import { toast } from "react-toastify";
import {
  onSnapshotFetchMenuItems,
  changeDisableState,
} from "../../../api/firebase/menu.api.ts";

const MenuList = () => {
  const [menuList, setMenulist] = useState([]);
  const [drinksList, setDrinksist] = useState([]);

  const [showCategory, setShowCategory] = useState(true);
  const [editItem, setEditItem] = useState("");
  const [deleteItem, setDeleteItem] = useState("");

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      console.log(response);
      setMenulist(response.food);
      setDrinksist(response.drinks);
    });
  }, []);

  const disableItem = async (item) => {
    setDisable(!disable);

    try {
      const response = await changeDisableState(item.id, disable);
      if (response) {
        toast.success("Item Disabled");
      }
    } catch (error) {
      toast.error("Failed");
      console.error(error);
    }
  };

  function filterFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("menu-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="menu-list-table">
      <div className="menu-wrapper">
        <input
          type="text"
          id="search-input"
          onKeyUp={() => filterFunction()}
          className="form-control mb-2"
          placeholder="Search Item"
        />
        <div className="switch-btn">
          <button
            style={{
              backgroundColor: showCategory ? "green" : "#ccc",
              color: showCategory ? "white" : "black",
            }}
            className="food"
            onClick={() => setShowCategory(true)}
          >
            Food
          </button>
          <button
            style={{
              backgroundColor: !showCategory ? "green" : "#ccc",
              color: !showCategory ? "white" : "black",
            }}
            className="drinks"
            onClick={() => setShowCategory(false)}
          >
            Drinks
          </button>
        </div>
      </div>
      <table id="menu">
        <thead>
          <tr>
            <th>Item name</th>
            <th>Price</th>
            {showCategory ? "" : <th>Quantity</th>}
          </tr>
        </thead>
        <tbody id="menu-list">
          {showCategory
            ? menuList
              ? menuList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{formatMoney(item.price)} FCFA</td>
                    <td className="action-btns">
                      <button
                        className="edit-btn"
                        onClick={() => setEditItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="disable-btn"
                        onClick={() => disableItem(item)}
                      >
                        {item.disabled === true ? "Enable" : "Disable"}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => setDeleteItem(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : "<p>No Menu Item</p>"
            : drinksList
            ? drinksList.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{formatMoney(item.price)} FCFA</td>
                  <td>{item.quantity}</td>
                  <td className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() => setEditItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="disable-btn"
                      onClick={() => disableItem(item)}
                    >
                      {item.disabled === true ? "Enable" : "Disable"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteItem(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "<p>No Menu Item</p>"}
        </tbody>
      </table>
      <EditItem
        item={editItem}
        show={!!editItem}
        onHide={() => setEditItem(false)}
      />
      <DeleteItem
        item={deleteItem}
        show={!!deleteItem}
        onHide={() => setDeleteItem(false)}
      />
    </div>
  );
};

export default MenuList;
