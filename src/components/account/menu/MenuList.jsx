import "./MenuList.css";
import { useState } from "react";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const MenuList = () => {
  const [menuList, setMenulist] = useState([
    {
      name: "Fried Rice",
      price: 10000,
      quantity: 0,
    },
    {
      name: "Fried Rice",
      price: 10000,
      quantity: 0,
    },
    {
      name: "Fried Rice",
      price: 10000,
      quantity: 0,
    },
    {
      name: "Fried Rice",
      price: 10000,
      quantity: 0,
    },
  ]);
  const [drinksList, setDrinksist] = useState([
    {
      name: "Cantelou",
      price: 5000,
      quantity: 0,
    },
    {
      name: "Cantelou",
      price: 5000,
      quantity: 0,
    },
    {
      name: "Cantelou",
      price: 5000,
      quantity: 0,
    },
    {
      name: "Cantelou",
      price: 5000,
      quantity: 0,
    },
  ]);

  const [showCategory, setShowCategory] = useState(true);
  const [editItem, setEditItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

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

  const actionFood = (action, index) => {
    if (action === "add") {
      menuList[index].quantity += 1;
      setMenulist([...menuList]);
    }
    if (action === "remove" && menuList[index].quantity > 0) {
      menuList[index].quantity -= 1;
      setMenulist([...menuList]);
    }
  };
  const actionDrinks = (action, index) => {
    if (action === "add") {
      drinksList[index].quantity += 1;
      setDrinksist([...drinksList]);
    }
    if (action === "remove" && drinksList[index].quantity > 0) {
      drinksList[index].quantity -= 1;
      setDrinksist([...drinksList]);
    }
  };
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="menu-list">
          {showCategory
            ? menuList
              ? menuList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{formatMoney(item.price)} FCFA</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => setEditItem(true)}
                      >
                        Edit
                      </button>
                      <button className="disable-btn">Disable</button>
                      <button
                        className="delete-btn"
                        onClick={() => setDeleteItem(true)}
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
                  <td>{item.name}</td>
                  <td>{formatMoney(item.price)} FCFA</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setEditItem(true)}
                    >
                      Edit
                    </button>
                    <button className="disable-btn">Disable</button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteItem(true)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "<p>No Menu Item</p>"}
        </tbody>
      </table>
      <EditItem show={editItem} onHide={() => setEditItem(false)} />
      <DeleteItem show={deleteItem} onHide={() => setDeleteItem(false)} />
    </div>
  );
};

export default MenuList;
