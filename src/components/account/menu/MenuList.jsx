import "./MenuList.css";
import { useState } from "react";

const MenuList = () => {
  const [menuList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

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
      <input
        type="text"
        id="search-input"
        onKeyUp={() => filterFunction()}
        className="form-control mb-2"
        placeholder="Search Item"
      />
      <table id="menu">
        <thead>
          <tr>
            <th>Item name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="menu-list">
          {menuList
            ? menuList.map((item, index) => (
                <tr key={index}>
                  <td>Fried Rice</td>
                  <td>10000 FCFA</td>
                  <td>Food</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                  </td>
                </tr>
              ))
            : "<p>No Menu Item</p>"}
        </tbody>
      </table>
    </div>
  );
};

export default MenuList;
