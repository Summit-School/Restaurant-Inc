import "./MenuList.css";
import { useState } from "react";

import Drinks from "./Drinks";
import Foods from "./Foods";

const MenuList = () => {
  const [showCategory, setShowCategory] = useState(true);

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
            {showCategory ? "" : <th>Inventory</th>}
          </tr>
        </thead>
        <tbody id="menu-list">{showCategory ? <Foods /> : <Drinks />}</tbody>
      </table>
    </div>
  );
};

export default MenuList;
