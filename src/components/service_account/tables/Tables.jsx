import "./Tables.css";
import { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import {
  onSnapshotFetchMenuItems,
  changeDisableState,
} from "../../../api/firebase/admin.api.ts";

const Tables = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [tableNumber, setTableNumber] = useState(0);

  const [tables, setTables] = useState([]);
  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      console.log(response);
      setTables(response);
    });
  }, []);
  return (
    <div>
      {tables
        ? tables.map((table, index) => (
            <button
              key={index}
              className="table-btn"
              onClick={() => {
                setTableNumber(table);
                setShowMenu(true);
              }}
            >
              {index + 1}
            </button>
          ))
        : "<p>No tables Founds</p>"}
      <Menu
        show={showMenu}
        tablenumber={tableNumber}
        onHide={() => setShowMenu(false)}
      />
    </div>
  );
};

export default Tables;
