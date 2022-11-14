import "./Menu.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Menu = (props) => {
  const [menuList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const [quantity, setQuantity] = useState(0);

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center "
      // key={remount}
    >
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <input
            type="text"
            id="search-input"
            onKeyUp={() => filterFunction()}
            className="form-control mb-2"
            placeholder="Search Item"
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <div className="menu-list-table">
          <table id="menu">
            <thead>
              <tr>
                <th>Item name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody id="menu-list">
              {menuList
                ? menuList.map((item, index) => (
                    <tr key={index}>
                      <td>Fried Rice</td>
                      <td>{formatMoney(10000)} FCFA</td>
                      <td>Food</td>
                      <td>
                        <input type="checkbox" className="menu-checkbox" />
                      </td>
                      <td>{quantity}</td>
                      <td>
                        <button
                          className="minus"
                          onClick={() => setQuantity(quantity - 1)}
                        >
                          <AiOutlineMinus />
                        </button>
                        <button
                          className="plus"
                          onClick={() => setQuantity(quantity + 1)}
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
        <Button className="modal-btn form-control-sm">
          {/* {loading ? <Spinner /> : "Submit"} */}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Menu;
