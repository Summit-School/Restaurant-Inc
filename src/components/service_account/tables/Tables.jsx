import "./Tables.css";
import { useState } from "react";
import Menu from "../menu/Menu";

const Tables = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [tables] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  return (
    <div>
      {tables
        ? tables.map((table, index) => (
            <button className="table-btn" onClick={() => setShowMenu(true)}>
              {index + 1}
            </button>
          ))
        : "<p>No tables Founds</p>"}
      <Menu show={showMenu} onHide={() => setShowMenu(false)} />
    </div>
  );
};

export default Tables;
