import "./Menu.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AddOrderToPending } from "../../../api/firebase/admin.api.ts";
import { onSnapshotFetchMenuItems } from "../../../api/firebase/menu.api.ts";

const Menu = (props) => {
  const [menuList, setMenulist] = useState([]);
  const [drinksList, setDrinksist] = useState([]);
  const [showCategory, setShowCategory] = useState(true);

  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      setMenulist(response.food);
      setDrinksist(response.drinks);
    });
  }, []);

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
      menuList[index].quantity = +menuList[index].quantity + 1;
      setMenulist([...menuList]);
    }
    if (action === "remove" && menuList[index].quantity > 0) {
      menuList[index].quantity = +menuList[index].quantity - 1;
      setMenulist([...menuList]);
    }
  };
  const actionDrinks = (action, index) => {
    if (action === "add") {
      drinksList[index].quantity = +drinksList[index].quantity + 1;
      setDrinksist([...drinksList]);
    }
    if (action === "remove" && drinksList[index].quantity > 0) {
      drinksList[index].quantity = +drinksList[index].quantity - 1;
      setDrinksist([...drinksList]);
    }
  };
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  const submitOrder = () => {
    let order = {
      table: { id: props.tablenumber },
      food: [],
      drinks: [],
    };

    let user = {
      name: "Enow Divine",
      phone: 667241296,
    };

    order.food = menuList.filter((menu) => menu.quantity > 0);
    order.drinks = drinksList.filter((drink) => drink.quantity > 0);
    console.log(order);
    try {
      const response = AddOrderToPending(order, user);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center "
      // key={remount}
    >
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="menu-wrapper"
        >
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
        </Modal.Title>
      </Modal.Header>
      <div>Table {props.tablenumber}</div>
      <Modal.Body className="change-password-body">
        <div className="menu-list-table">
          <table id="menu">
            <thead>
              <tr>
                <th>Item name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody id="menu-list">
              {showCategory
                ? menuList
                  ? menuList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{formatMoney(item.price)} FCFA</td>
                        <td>{item.quantity}</td>
                        <td>
                          <button
                            className="minus"
                            onClick={() => actionFood("remove", index)}
                          >
                            <AiOutlineMinus />
                          </button>
                          <button
                            className="plus"
                            onClick={() => actionFood("add", index)}
                          >
                            <AiOutlinePlus />
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
                      <td>
                        <button
                          className="minus"
                          onClick={() => actionDrinks("remove", index)}
                        >
                          <AiOutlineMinus />
                        </button>
                        <button
                          className="plus"
                          onClick={() => actionDrinks("add", index)}
                        >
                          <AiOutlinePlus />
                        </button>
                      </td>
                    </tr>
                  ))
                : "<p>No Menu Item</p>"}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button className="modal-btn form-control-sm" onClick={submitOrder}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Menu;
